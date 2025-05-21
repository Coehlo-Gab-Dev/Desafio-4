import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { logger } from '../utils/logger.js';
import { CODIGOS_MUNICIPIOS_MA, CODIGO_UF_MA } from '../utils/ibgeCodes.js';
import redis from '../config/redis.js';

const prisma = new PrismaClient();
const redisClient = redis;

// Configurações
const CACHE_TTL = process.env.CACHE_TTL || 3600; // 1 hora padrão
const LIMITE_POR_PAGINA = 20;
const MUNICIPIO_PADRAO_MA = 'SAO LUIS';
const CODIGO_MUNICIPIO_PADRAO = 2111300;
const RAIO_MAXIMO = 50000; // 50km em metros

// Configurações das APIs
const APIs = {
  CNES: {
    url: 'https://apidadosabertos.saude.gov.br/cnes/estabelecimentos?codigo_uf=21&limit=100&offset=100',
    key: process.env.CNES_API_KEY,
    timeout: 15000
  },
  HOSPITAIS: {
    url: 'https://apidadosabertos.saude.gov.br/assistencia-a-saude/hospitais-e-leitos?uf=ma&limit=100&offset=0',
    key: process.env.SAUDE_API_KEY,
    timeout: 20000
  },
  UBS: {
    url: 'https://apidadosabertos.saude.gov.br/assistencia-a-saude/unidade-basicas-de-saude?limit=100&offset=0',
    key: process.env.SAUDE_API_KEY,
    timeout: 20000
  }
};

export default {
  // ========== MÉTODOS PRINCIPAIS ==========
  
  /**
   * Busca hierárquica de estabelecimentos
   * @param {Object} params - Parâmetros de busca
   */
  async buscarHierarquico({ pagina = 1, tipo, municipio, requestId }) {
    const cacheKey = `saude:${municipio}:${tipo || 'all'}:${pagina}`;
    
    try {
      logger.info(`[${requestId}] Busca hierárquica iniciada`, { 
        pagina, tipo, municipio 
      });

      // 1. Verificar cache
      const cachedData = await this._verificarCache(cacheKey);
      if (cachedData) {
        logger.debug(`[${requestId}] Cache hit para ${cacheKey}`);
        return cachedData;
      }

      // 2. Normalizar parâmetros
      const { nomeNormalizado, codigoIBGE } = this._normalizarMunicipioMA(municipio);
      const tipoNormalizado = this._normalizarTipoMA(tipo);
      const paginaNum = Math.max(1, parseInt(pagina));

      // 3. Estratégia de busca hierárquica
      const resultado = await this._executarEstrategiaBusca({
        pagina: paginaNum,
        tipo: tipoNormalizado,
        nomeNormalizado,
        codigoIBGE,
        requestId
      });

      // 4. Armazenar em cache se veio de fonte externa
      if (resultado.metadados.fonte !== 'mongodb') {
        await this._armazenarCache(cacheKey, resultado);
      }

      return resultado;

    } catch (error) {
      logger.error(`[${requestId}] Falha na busca hierárquica`, error);
      throw error;
    }
  },

  /**
   * Busca estabelecimentos por proximidade geográfica
   * @param {Object} params - Parâmetros de busca
   */
  async buscarPorProximidade({ latitude, longitude, raio = 5000, tipo, requestId }) {
    const cacheKey = `proximos:${latitude}:${longitude}:${raio}:${tipo || 'all'}`;
    
    try {
      logger.info(`[${requestId}] Busca por proximidade iniciada`, {
        coordinates: [longitude, latitude],
        raio,
        tipo
      });

      // 1. Validação do raio
      const raioMetros = Math.min(parseInt(raio), RAIO_MAXIMO);

      // 2. Verificar cache
      const cached = await this._verificarCache(cacheKey);
      if (cached) return cached;

      // 3. Consulta ao banco de dados
      const resultados = await prisma.estabelecimentoSaude.findMany({
        where: {
          localizacao: {
            coordinates: {
              $nearSphere: {
                $geometry: {
                  type: "Point",
                  coordinates: [longitude, latitude]
                },
                $maxDistance: raioMetros
              }
            }
          },
          ...(tipo && { tipo })
        },
        take: 100
      });

      // 4. Calcular distâncias e formatar resultados
      const dadosFormatados = resultados.map(item => {
        const distancia = this._calcularDistancia(
          latitude,
          longitude,
          item.localizacao.coordinates[1],
          item.localizacao.coordinates[0]
        );
        
        return {
          ...item,
          distancia,
          distanciaFormatada: `${distancia.toFixed(0)}m`
        };
      }).sort((a, b) => a.distancia - b.distancia);

      // 5. Armazenar em cache
      await this._armazenarCache(cacheKey, dadosFormatados);

      return dadosFormatados;
    } catch (error) {
      logger.error(`[${requestId}] Falha na busca por proximidade`, error);
      throw error;
    }
  },

  /**
   * Atualiza dados de hospitais
   * @param {Object} params - Parâmetros de atualização
   */
  async atualizarHospitais({ requestId }) {
    try {
      logger.info(`[${requestId}] Iniciando atualização de hospitais`);
      
      const dados = await this._buscarHospitaisAPI({ requestId });
      const processados = this._processarDadosAPI(dados);
      
      await this._upsertEmMassa(processados, requestId);
      
      return {
        total: processados.length,
        atualizadoEm: new Date().toISOString()
      };
    } catch (error) {
      logger.error(`[${requestId}] Falha ao atualizar hospitais`, error);
      throw error;
    }
  },

  /**
   * Atualiza dados de UBS
   * @param {Object} params - Parâmetros de atualização
   */
  async atualizarUBS({ requestId }) {
    try {
      logger.info(`[${requestId}] Iniciando atualização de UBS`);
      
      const dados = await this._buscarUBSAPI({ requestId });
      const processados = this._processarDadosAPI(dados);
      
      await this._upsertEmMassa(processados, requestId);
      
      return {
        total: processados.length,
        atualizadoEm: new Date().toISOString()
      };
    } catch (error) {
      logger.error(`[${requestId}] Falha ao atualizar UBS`, error);
      throw error;
    }
  },

  /**
   * Lista tipos de estabelecimentos disponíveis
   */
  async obterTiposEstabelecimentos() {
    const tipos = {
      'HOSPITAL': { label: 'Hospital Geral', icone: 'hospital' },
      'UPA': { label: 'Unidade de Pronto Atendimento', icone: 'emergency' },
      'UBS': { label: 'Unidade Básica de Saúde', icone: 'healthcare' },
      'PS': { label: 'Posto de Saúde', icone: 'medical-bag' },
      'CENTRO_SAUDE': { label: 'Centro de Saúde', icone: 'medical-center' },
      'FARMACIA_POPULAR': { label: 'Farmácia Popular', icone: 'pharmacy' }
    };
    
    return Object.entries(tipos).map(([valor, { label, icone }]) => ({ 
      valor, 
      label,
      icone
    }));
  },

  // ========== MÉTODOS AUXILIARES ==========

  async _executarEstrategiaBusca({ pagina, tipo, nomeNormalizado, codigoIBGE, requestId }) {
    // 1. Tentar APIs Governamentais
    try {
      const [dadosHospitais, dadosUBS, dadosCNES] = await Promise.allSettled([
        this._buscarHospitaisAPI({ codigoIBGE, requestId }),
        this._buscarUBSAPI({ codigoIBGE, requestId }),
        this._buscarAPIGovernamental({
          pagina,
          tipo,
          municipio: nomeNormalizado,
          codigoMunicipio: codigoIBGE,
          requestId
        })
      ]);

      const dadosValidos = [dadosHospitais, dadosUBS, dadosCNES]
        .filter(p => p.status === 'fulfilled')
        .flatMap(p => p.value);

      if (dadosValidos.length > 0) {
        const dadosProcessados = this._processarDadosAPI(dadosValidos);
        await this._upsertEmMassa(dadosProcessados, requestId);

        return {
          dados: dadosProcessados,
          metadados: this._gerarMetadados({
            fonte: 'apis_governamentais',
            total: dadosProcessados.length,
            pagina,
            requestId,
            municipio: nomeNormalizado
          })
        };
      }
    } catch (error) {
      logger.warn(`[${requestId}] Falha nas APIs governamentais`, error);
    }

    // 2. Fallback para MongoDB
    const dadosMongoDB = await this._buscarNoMongoDB({
      pagina,
      tipo,
      codigoIBGE,
      requestId
    });

    if (dadosMongoDB?.length > 0) {
      return {
        dados: dadosMongoDB,
        metadados: this._gerarMetadados({
          fonte: 'mongodb',
          total: dadosMongoDB.length,
          pagina,
          requestId,
          municipio: nomeNormalizado,
          aviso: 'Dados podem estar desatualizados'
        })
      };
    }

    // 3. Fallback para mock data
    return this._gerarDadosMockados({
      tipo,
      municipio: nomeNormalizado,
      codigoMunicipio: codigoIBGE,
      requestId
    });
  },

  async _upsertEmMassa(dados, requestId) {
    const operacoes = dados.map(item => ({
      updateOne: {
        filter: { idCnes: item.idCnes },
        update: { 
          $set: item,
          $currentDate: { dataAtualizacao: true }
        },
        upsert: true
      }
    }));

    try {
      const resultado = await prisma.$runCommandRaw({
        update: 'EstabelecimentoSaude',
        updates: operacoes,
        ordered: false
      });
      
      logger.info(`[${requestId}] MongoDB - ${resultado.nModified} atualizados, ${resultado.nUpserted} inseridos`);
      return resultado;
    } catch (error) {
      logger.error(`[${requestId}] Erro no upsert em massa`, error);
      throw error;
    }
  },

  async _buscarNoMongoDB({ pagina, tipo, codigoIBGE, requestId }) {
    const filtro = {
      'localizacao.municipio': codigoIBGE ? 
        this._obterNomeMunicipioMA(codigoIBGE) : 
        { $exists: true }
    };

    if (tipo) {
      filtro.tipo = tipo;
    }

    try {
      const [dados, total] = await Promise.all([
        prisma.estabelecimentoSaude.findMany({
          where: filtro,
          skip: (pagina - 1) * LIMITE_POR_PAGINA,
          take: LIMITE_POR_PAGINA,
          orderBy: { dataAtualizacao: 'desc' }
        }),
        prisma.estabelecimentoSaude.count({ where: filtro })
      ]);

      return dados.map(item => ({
        ...item,
        localizacao: {
          ...item.localizacao,
          coordenadas: item.localizacao.coordinates || []
        }
      }));
    } catch (error) {
      logger.error(`[${requestId}] Erro ao buscar no MongoDB`, error);
      return [];
    }
  },

  // ========== MÉTODOS DE FORMATAÇÃO ==========

  _processarDadosAPI(dados) {
    return [...new Map(dados.map(item => [item.idCnes, item])).values()]
      .filter(item => item.idCnes && item.nome && item.localizacao?.coordinates)
      .map(item => this._formatarParaMongoDB(item));
  },

  _formatarParaMongoDB(dados) {
    return {
      idCnes: dados.idCnes || dados.id,
      nome: dados.nome,
      tipo: dados.tipo,
      localizacao: {
        type: 'Point',
        coordinates: dados.localizacao.coordenadas || [
          parseFloat(dados.localizacao.longitude),
          parseFloat(dados.localizacao.latitude)
        ],
        municipio: dados.localizacao.municipio,
        uf: dados.localizacao.uf || 'MA',
        enderecoCompleto: dados.localizacao.enderecoCompleto,
        cep: dados.localizacao.cep
      },
      contato: dados.contato || {},
      servicos: dados.servicos || [],
      leitos: dados.leitos || undefined,
      fonteDados: dados.fonteDados || 'API',
      dataAtualizacao: new Date()
    };
  },

  _gerarMetadados({ fonte, total, pagina, requestId, municipio, aviso }) {
    return {
      fonte,
      total,
      requestId,
      municipio: municipio || MUNICIPIO_PADRAO_MA,
      uf: 'MA',
      paginacao: {
        pagina: Number(pagina),
        itensPorPagina: LIMITE_POR_PAGINA,
        totalItens: total,
        totalPaginas: Math.ceil(total / LIMITE_POR_PAGINA)
      },
      ...(aviso && { aviso })
    };
  },

  // ========== MÉTODOS GEOESPACIAIS ==========

  _calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Raio da Terra em metros
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distância em metros
  },

  // ========== MÉTODOS DE CACHE ==========

  async _verificarCache(chave) {
    try {
      const dados = await redisClient.get(chave);
      return dados ? JSON.parse(dados) : null;
    } catch (error) {
      logger.warn('Erro ao verificar cache', error);
      return null;
    }
  },

  async _armazenarCache(chave, dados) {
    try {
      await redisClient.setEx(
        chave,
        CACHE_TTL,
        JSON.stringify(dados)
      );
    } catch (error) {
      logger.warn('Erro ao armazenar cache', error);
    }
  },

  async _invalidarCache(pattern) {
    try {
      const keys = await redisClient.keys(pattern);
      if (keys.length) {
        await redisClient.del(keys);
      }
    } catch (error) {
      logger.warn('Erro ao invalidar cache', error);
    }
  },

  // ========== MÉTODOS DE API EXTERNA ==========

  async _buscarHospitaisAPI({ codigoIBGE, requestId }) {
    try {
      const response = await axios.get(APIs.HOSPITAIS.url, {
        params: { codigoIBGE },
        headers: this._getHeaders(APIs.HOSPITAIS.key),
        timeout: APIs.HOSPITAIS.timeout
      });
      
      return response.data.dados || [];
    } catch (error) {
      logger.error(`[${requestId}] Falha ao buscar hospitais`, error);
      throw error;
    }
  },

  async _buscarUBSAPI({ codigoIBGE, requestId }) {
    try {
      const response = await axios.get(APIs.UBS.url, {
        params: { codigoIBGE },
        headers: this._getHeaders(APIs.UBS.key),
        timeout: APIs.UBS.timeout
      });
      
      return response.data.dados || [];
    } catch (error) {
      logger.error(`[${requestId}] Falha ao buscar UBS`, error);
      throw error;
    }
  },

  async _buscarAPIGovernamental({ pagina, tipo, municipio, codigoMunicipio, requestId }) {
    try {
      const response = await axios.get(APIs.CNES.url, {
        params: {
          pagina,
          tipo: this._mapearTipoCNES_MA(tipo),
          municipio,
          codigoMunicipio
        },
        headers: this._getHeaders(APIs.CNES.key),
        timeout: APIs.CNES.timeout
      });
      
      return response.data;
    } catch (error) {
      logger.error(`[${requestId}] Falha ao buscar API governamental`, error);
      throw error;
    }
  },

  // ========== MÉTODOS DE APOIO ==========

  _getHeaders(apiKey) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Accept-Encoding': 'gzip,deflate,compress'
    };
  },

  _normalizarMunicipioMA(municipio) {
    // Implementação existente
  },

  _obterNomeMunicipioMA(codigoIBGE) {
    // Implementação existente
  },

  _normalizarTipoMA(tipo) {
    // Implementação existente
  },

  _mapearTipoCNES_MA(tipo) {
    // Implementação existente
  },

  _gerarDadosMockados(params) {
    // Implementação existente
  }
};