import saudeService from '../services/saude.service.js';
import { CODIGOS_MUNICIPIOS_MA } from '../utils/ibgeCodes.js';
import { logger } from '../utils/logger.js';
import crypto from 'crypto';

// Constantes para códigos de erro
const ERRO_VALIDACAO = 'ERRO_VALIDACAO';
const ERRO_INTERNO = 'ERRO_INTERNO';
const API_INDISPONIVEL = 'API_INDISPONIVEL';
const NAO_ENCONTRADO = 'NAO_ENCONTRADO';
const ATUALIZACAO_FALHOU = 'ATUALIZACAO_FALHOU';
const GEOLOCALIZACAO_INVALIDA = 'GEOLOCALIZACAO_INVALIDA';

/**
 * Lista estabelecimentos de saúde com filtros
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const listarEstabelecimentosSaude = async (req, res) => {
  const startTime = process.hrtime();
  const requestId = req.id || crypto.randomUUID();

  try {
    // 1. Validação dos parâmetros
    const { pagina = 1, tipo, municipio } = req.query;
    const paginaNum = Math.max(1, parseInt(pagina)) || 1;

    if (!municipio) {
      return responderErro(res, 400, {
        codigo: ERRO_VALIDACAO,
        mensagem: 'Parâmetro municipio é obrigatório',
        detalhes: {
          municipios_validos: Object.keys(CODIGOS_MUNICIPIOS_MA).slice(0, 5),
          sugestao: 'Exemplo: SAO LUIS, IMPERATRIZ, CAXIAS'
        },
        requestId
      });
    }

    // 2. Buscar dados usando o serviço unificado
    const resultado = await saudeService.buscarHierarquico({
      pagina: paginaNum,
      tipo,
      municipio,
      requestId
    });

    // 3. Tratar resposta do serviço
    if (!resultado.dados || resultado.dados.length === 0) {
      return responderErro(res, 404, {
        codigo: NAO_ENCONTRADO,
        mensagem: 'Nenhum estabelecimento encontrado',
        detalhes: {
          sugestao: municipio.includes('São') 
            ? 'Tente usar "SAO" sem acento no nome do município' 
            : 'Verifique a ortografia ou tente municípios próximos',
          parametros_usados: { municipio, tipo, pagina }
        },
        requestId
      });
    }

    // 4. Formatar resposta final
    return responderSucesso(res, {
      dados: resultado.dados,
      metadados: {
        ...resultado.metadados,
        tempoProcessamento: calcularTempoProcessamento(startTime),
        requestId,
        paginacao: resultado.metadados.paginacao || {
          pagina: paginaNum,
          itensPorPagina: resultado.dados.length,
          totalItens: resultado.dados.length,
          totalPaginas: 1
        }
      }
    });

  } catch (error) {
    logger.error(`[${requestId}] Erro no controller de saúde:`, {
      error: error.message,
      stack: error.stack,
      query: req.query
    });

    return tratarErro(res, error, requestId);
  }
};

/**
 * Busca estabelecimentos próximos a uma localização
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const listarProximos = async (req, res) => {
  const startTime = process.hrtime();
  const requestId = req.id || crypto.randomUUID();

  try {
    const { lat, long, raio = 5000, tipo } = req.query;

    // 1. Validação dos parâmetros
    if (!lat || !long) {
      return responderErro(res, 400, {
        codigo: GEOLOCALIZACAO_INVALIDA,
        mensagem: 'Parâmetros de latitude e longitude são obrigatórios',
        detalhes: {
          parametros_requeridos: ['lat', 'long'],
          parametros_opcionais: ['raio', 'tipo']
        },
        requestId
      });
    }

    // 2. Converter e validar coordenadas
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);
    const raioMetros = parseInt(raio);

    if (isNaN(latitude) || latitude < -90 || latitude > 90 ||
        isNaN(longitude) || longitude < -180 || longitude > 180) {
      return responderErro(res, 400, {
        codigo: GEOLOCALIZACAO_INVALIDA,
        mensagem: 'Coordenadas geográficas inválidas',
        requestId
      });
    }

    // 3. Buscar dados
    const resultados = await saudeService.buscarPorProximidade({
      latitude,
      longitude,
      raio: raioMetros,
      tipo,
      requestId
    });

    // 4. Formatar resposta
    return responderSucesso(res, {
      dados: resultados,
      metadados: {
        requestId,
        tempoProcessamento: calcularTempoProcessamento(startTime),
        total: resultados.length,
        raioMetros,
        coordenadas: [latitude, longitude],
        tipoEstabelecimento: tipo || 'Todos'
      }
    });

  } catch (error) {
    logger.error(`[${requestId}] Erro na busca por proximidade:`, error);
    return tratarErro(res, error, requestId);
  }
};

/**
 * Atualiza dados dos estabelecimentos de saúde
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const atualizarDadosSaude = async (req, res) => {
  const startTime = process.hrtime();
  const requestId = req.id || crypto.randomUUID();
  
  try {
    logger.info(`[${requestId}] Iniciando atualização de dados de saúde`);

    const [resultadoHospitais, resultadoUBS] = await Promise.all([
      executarComTimeout(
        () => saudeService.atualizarHospitais({ requestId }),
        30000,
        'Timeout ao atualizar hospitais'
      ),
      executarComTimeout(
        () => saudeService.atualizarUBS({ requestId }),
        30000,
        'Timeout ao atualizar UBS'
      )
    ]);

    const totalAtualizado = resultadoHospitais.total + resultadoUBS.total;
    
    logger.info(`[${requestId}] Dados atualizados: ${totalAtualizado} registros`);

    return responderSucesso(res, {
      dados: {
        hospitais: resultadoHospitais,
        ubs: resultadoUBS,
        total: totalAtualizado
      },
      metadados: {
        requestId,
        fonte: 'apis_governamentais',
        tempoProcessamento: calcularTempoProcessamento(startTime),
        atualizadoEm: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error(`[${requestId}] Falha na atualização:`, error);
    return tratarErro(res, error, requestId, ATUALIZACAO_FALHOU);
  }
};

/**
 * Lista os tipos de estabelecimentos disponíveis
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const listarTiposEstabelecimentos = async (req, res) => {
  const startTime = process.hrtime();
  const requestId = req.id || crypto.randomUUID();

  try {
    const tipos = await saudeService.obterTiposEstabelecimentos();
    
    return responderSucesso(res, {
      dados: tipos,
      metadados: {
        requestId,
        total: tipos.length,
        tempoProcessamento: calcularTempoProcessamento(startTime)
      }
    });
  } catch (error) {
    logger.error(`[${requestId}] Falha ao listar tipos:`, error);
    return tratarErro(res, error, requestId);
  }
};

// ===== FUNÇÕES AUXILIARES =====

function responderSucesso(res, { dados, metadados }) {
  return res.json({
    sucesso: true,
    dados,
    metadados: {
      ...metadados,
      versaoApi: process.env.npm_package_version || '1.0.0'
    }
  });
}

function responderErro(res, status, { codigo, mensagem, detalhes, requestId }) {
  return res.status(status).json({
    sucesso: false,
    erro: {
      codigo,
      mensagem,
      ...(detalhes && { detalhes }),
      ...(requestId && { requestId })
    }
  });
}

function tratarErro(res, error, requestId, codigoErro = ERRO_INTERNO) {
  // Tratamento específico para erros de API externa
  if (error.response) {
    return responderErro(res, 503, {
      codigo: API_INDISPONIVEL,
      mensagem: 'Serviço temporariamente indisponível',
      detalhes: {
        status: error.response.status,
        api: error.config?.url,
        ...(process.env.NODE_ENV === 'development' && {
          mensagemOriginal: error.message
        })
      },
      requestId
    });
  }

  // Erro genérico
  return responderErro(res, 500, {
    codigo: codigoErro,
    mensagem: 'Falha ao processar requisição',
    ...(process.env.NODE_ENV !== 'production' && {
      detalhes: {
        mensagem: error.message,
        tipo: error.name
      }
    }),
    requestId
  });
}

function calcularTempoProcessamento(startTime) {
  const diff = process.hrtime(startTime);
  return `${(diff[0] * 1000 + diff[1] / 1e6).toFixed(2)}ms`;
}

async function executarComTimeout(fn, timeoutMs, errorMsg) {
  let timeout;
  
  const timeoutPromise = new Promise((_, reject) => {
    timeout = setTimeout(() => {
      reject(new Error(errorMsg));
    }, timeoutMs);
  });

  try {
    return await Promise.race([fn(), timeoutPromise]);
  } finally {
    clearTimeout(timeout);
  }
}