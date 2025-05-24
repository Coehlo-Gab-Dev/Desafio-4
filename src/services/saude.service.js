// src/services/saude.service.js
import { PrismaClient, TipoEstabelecimentoSaude, FonteDados } from '@prisma/client';
import { logger } from '../utils/logger.js';
import { CODIGOS_MUNICIPIOS_MA, CODIGO_UF_MA, getNomeMunicipioMAPorCodigo } from '../utils/ibgeCodes.js'; // Importa o real
import redis from '../config/redis.js'; // Se for usar cache com DB

const prisma = new PrismaClient();
const redisClient = redis; // Se for usar cache

const CACHE_TTL = parseInt(process.env.CACHE_TTL, 10) || 3600;
const LIMITE_POR_PAGINA_NOSSA_API = 25;   
const MUNICIPIO_PADRAO_NOME = 'SAO LUIS';
const TIPOS_SAUDE_VALIDOS_ENUM = Object.values(TipoEstabelecimentoSaude);


const saudeService = {
    // --- FUNÇÕES DE MAPEAMENTO E NORMALIZAÇÃO (Internas ao serviço) ---
    _normalizarTipoInterno(tipoFrontend) {
        logger.debug(`[SERVICE _normalizarTipoInterno] Recebido para normalizar: ${tipoFrontend}`);
        if (!tipoFrontend || typeof tipoFrontend !== 'string') {
            logger.debug('[SERVICE _normalizarTipoInterno] Retornando null (input inválido)');
            return null;
        }
        const tipoUpper = tipoFrontend.trim().toUpperCase().replace(/-/g, '_').replace(/ /g, '_');
        if (TIPOS_SAUDE_VALIDOS_ENUM.includes(tipoUpper)) {
            logger.debug(`[SERVICE _normalizarTipoInterno] Retornando tipoUpper: ${tipoUpper}`);
            return tipoUpper; 
        }
        switch (tipoUpper) {
            case 'CENTRO_DE_SAUDE': 
                logger.debug('[SERVICE _normalizarTipoInterno] Mapeado para CENTRO_SAUDE');
                return TipoEstabelecimentoSaude.CENTRO_SAUDE;
            case 'POSTO_DE_SAUDE':
                logger.debug('[SERVICE _normalizarTipoInterno] Mapeado para PS');
                return TipoEstabelecimentoSaude.PS;
            default:
                logger.warn(`[SERVICE _normalizarTipoInterno] Tipo '${tipoFrontend}' não normalizado.`);
                return null;
        }
    },

    // --- BUSCA NO PRISMA DB 
    async _buscarNoPrisma({ pagina, tipo, codigoIBGE, codigoUF, requestId, takeOverride = null }) {
        const whereClause = {};
        let nomeMunicipioParaFiltro = null;

        logger.debug(`[${requestId}] Service _buscarNoPrisma: Parâmetros recebidos:`, { pagina, tipo, codigoIBGE, codigoUF });

        if (codigoIBGE) {
            nomeMunicipioParaFiltro = getNomeMunicipioMAPorCodigo(codigoIBGE); // Usa a função importada
            if (nomeMunicipioParaFiltro) {
                // Assumindo que 'Localizacao' é um tipo composto no schema
                whereClause.localizacao = { is: { municipio: nomeMunicipioParaFiltro } }; 
            } else {
                logger.warn(`[${requestId}] _buscarNoPrisma: Nome do município não encontrado para código IBGE ${codigoIBGE}. Retornando vazio.`);
                return { dados: [], metadados: { totalItens: 0, fonte: FonteDados.MANUAL } };
            }
        } else if (codigoUF) {
            // No seu caso, codigoUF será 21 (CODIGO_UF_MA)
            const siglaUf = String(codigoUF) === String(CODIGO_UF_MA) ? 'MA' : String(codigoUF).toUpperCase();
            whereClause.localizacao = { is: { ...(whereClause.localizacao?.is || {}), uf: siglaUf } };
        }

        if (tipo && TIPOS_SAUDE_VALIDOS_ENUM.includes(tipo)) { // tipo já é o valor do Enum
            whereClause.tipo = tipo;
        }
        
        const take = takeOverride !== null ? takeOverride : LIMITE_POR_PAGINA_NOSSA_API;
        const skip = takeOverride !== null ? 0 : (Math.max(1, pagina) - 1) * LIMITE_POR_PAGINA_NOSSA_API;

        logger.debug(`[${requestId}] Service _buscarNoPrisma: Cláusula WHERE montada:`, JSON.stringify(whereClause));
        logger.debug(`[${requestId}] Service _buscarNoPrisma: Skip: ${skip}, Take: ${take}`);

        try {
            const [dados, total] = await Promise.all([
                prisma.estabelecimentoSaude.findMany({
                    where: whereClause,
                    skip: skip,
                    take: take,
                    orderBy: { nome: 'asc' } // ou outra ordenação
                }),
                prisma.estabelecimentoSaude.count({ where: whereClause })
            ]);
            logger.debug(`[${requestId}] Service _buscarNoPrisma: Encontrados ${dados.length} registros. Total (count): ${total}.`);
            return { dados, metadados: { totalItens: total, fonte: FonteDados.MANUAL } }; // Adiciona fonte aos metadados
        } catch (error) {
            logger.error(`[${requestId}] Erro ao buscar no Prisma DB (service _buscarNoPrisma)`, { message: error.message, where: whereClause, stack: error.stack?.substring(0,500) });
            throw this._erroServico('Falha ao buscar dados no banco local.', 'DB_QUERY_FALHOU', 500, { details: error.message });
        }
    },

    // --- GERADOR DE METADADOS 
    _gerarMetadados({ fonte, total, pagina, itensPorPagina = LIMITE_POR_PAGINA_NOSSA_API, requestId, municipio, aviso }) {
        const paginaNum = Number(pagina) || 1;
        const totalItensNum = Number(total) || 0;
        const itensPorPaginaFinal = Number(itensPorPagina) || LIMITE_POR_PAGINA_NOSSA_API;
        return {
            fonte: Object.values(FonteDados).includes(fonte) ? fonte : FonteDados.MANUAL,
            requestId,
            municipioConsultado: municipio || MUNICIPIO_PADRAO_NOME,
            uf: 'MA',
            paginacao: {
                paginaAtual: paginaNum,
                itensPorPagina: itensPorPaginaFinal,
                totalItens: totalItensNum,
                totalPaginas: Math.ceil(totalItensNum / itensPorPaginaFinal) || 0
            },
            ...(aviso && { avisoConsulta: aviso }),
            timestamp: new Date().toISOString()
        };
    },
    
    // --- Cache (se for usar com DB local) ---
    async _verificarCache(chave) { try { const dados = await redisClient.get(chave); return dados ? JSON.parse(dados) : null; } catch (error) { logger.warn('Erro ao verificar cache', error); return null; } },
    async _armazenarCache(chave, dados) { try { await redisClient.setEx(chave, CACHE_TTL, JSON.stringify(dados)); } catch (error) { logger.warn('Erro ao armazenar cache', error); } },


    // --- MÉTODO PRINCIPAL MODIFICADO PARA USAR APENAS O BANCO LOCAL ---
    async buscarEstabelecimentos({ codigoIbge, codigoUf, tipo, pagina = 1, userLat, userLong, requestId }) {
        const identificadorGeo = codigoIbge ? `IBGE_${codigoIbge}` : `UF_${codigoUf || CODIGO_UF_MA}`;
        let nomeReferencia = codigoIbge 
            ? (getNomeMunicipioMAPorCodigo(codigoIbge) || identificadorGeo) 
            : `Estado do Maranhão (UF ${codigoUf || CODIGO_UF_MA})`;
        
        const cacheKey = `saude_estab_db_v1:${identificadorGeo}:${tipo || 'todos'}:${pagina}:${userLat || 'noLat'}:${userLong || 'noLong'}`;
        logger.info(`[${requestId}] Service (DB Local): buscarEstabelecimentos iniciado`, { identificadorGeo, nomeReferencia, tipo, pagina });
        logger.debug(`[${requestId}] Service (DB Local): ENTRANDO em buscarEstabelecimentos`);

        try {
            const cachedData = await this._verificarCache(cacheKey);
            if (cachedData) { logger.debug(`[${requestId}] Cache hit para ${cacheKey}`); return cachedData; }
            logger.debug(`[${requestId}] Cache miss para ${cacheKey}`);

            const paginaNum = Math.max(1, parseInt(pagina, 10));
            const tipoNormalizado = this._normalizarTipoInterno(tipo);
            logger.debug(`[${requestId}] Service (DB Local): tipoNormalizado para '${tipo}' é '${tipoNormalizado}'`);

            // Chama diretamente _buscarNoPrisma
            const resultadoDoBanco = await this._buscarNoPrisma({
                pagina: paginaNum,
                tipo: tipoNormalizado,
                codigoIBGE: codigoIbge,
                codigoUF: codigoUf || CODIGO_UF_MA, // Passa UF se não houver codigoIbge
                requestId,
            });
            
            let dadosParaRetorno = resultadoDoBanco.dados;

            // Se houver coordenadas do usuário, calcula distância e ordena
            if (userLat != null && userLong != null && dadosParaRetorno.length > 0) {
                logger.debug(`[${requestId}] Service (DB Local): Calculando e ordenando por distância.`);
                dadosParaRetorno = dadosParaRetorno.map(est => {
                    const coords = est.localizacao?.coordenadas?.coordinates;
                    if (coords && coords.length === 2) {
                        const [estLongitude, estLatitude] = coords;
                        const distancia = this._calcularDistancia(parseFloat(userLat), parseFloat(userLong), estLatitude, estLongitude);
                        return { ...est, distancia }; // Adiciona a distância para ordenação
                    }
                    return { ...est, distancia: Infinity };
                }).sort((a, b) => a.distancia - b.distancia);
                // Remover a propriedade 'distancia' se não quiser enviá-la ao frontend
                // dadosParaRetorno = dadosParaRetorno.map(d => { const { distancia, ...resto } = d; return resto; });
            }


            const metadadosCompletos = this._gerarMetadados({
                fonte: FonteDados.MANUAL, // Sempre MANUAL pois estamos lendo do DB
                total: resultadoDoBanco.metadados.totalItens,
                pagina: paginaNum,
                requestId,
                municipio: nomeReferencia,
                aviso: "Dados consultados do banco de dados local."
            });

            const resultadoFinal = {
                dados: dadosParaRetorno,
                metadados: metadadosCompletos
            };

            if (resultadoFinal.dados && resultadoFinal.dados.length > 0) { // Cache apenas se houver dados
                await this._armazenarCache(cacheKey, resultadoFinal);
            }
            return resultadoFinal;

        } catch (error) {
            const errorMessage = (error instanceof Error && error.message) ? error.message : 'Erro desconhecido em buscarEstabelecimentos (DB Local)';
            logger.error(`[${requestId}] Falha em buscarEstabelecimentos (DB Local - service)`, { identificadorGeo, tipo, pagina, message: errorMessage, stack: error.stack?.substring(0, 500) });
            throw this._erroServico(errorMessage, error.code || 'BUSCA_DB_LOCAL_FALHOU', error.status || 500, error.details);
        }
    },

    // --- Outras funções do serviço (stubs por enquanto) ---
    async sincronizarEstabelecimentosCNESdoMA({requestId}) { logger.warn(`[${requestId}] Sincronização CNES MA não ativa no modo DB local.`); return {mensagem: "Sincronização não ativa"}; },
    // async buscarPorProximidade({requestId}) { logger.warn(`[${requestId}] Buscar por proximidade (DB Local) - ADAPTAR _buscarNoPrisma com query geoespacial.`); return []; },
    async atualizarHospitais({requestId}) { logger.warn(`[${requestId}] Atualizar Hospitais não ativa no modo DB local.`); return {mensagem: "Não ativa"}; },
    async atualizarUBS({requestId}) { logger.warn(`[${requestId}] Atualizar UBS não ativa no modo DB local.`); return {mensagem: "Não ativa"}; },
    // async obterTiposEstabelecimentos({requestId}) { /* ... como antes ... */ }, // Pode manter esta

    _erroServico(mensagem, codigo, status = 500, detalhes = null) {
        const erro = new Error(mensagem);
        erro.status = status;
        erro.code = codigo;
        erro.details = detalhes;
        return erro;
    },
    // Funções que _buscarPorProximidade e _executarEstrategiaBuscaV2 usavam e que agora podem ser necessárias aqui ou em ibgeCodes
    _calcularDistancia(lat1, lon1, lat2, lon2) {
        if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return Infinity;
        const R = 6371e3; // Raio da Terra em metros
        const φ1 = lat1 * Math.PI / 180; // φ, λ em radianos
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // em metros
    },
};

export default saudeService;