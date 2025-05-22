// src/controllers/saude.controller.js
import saudeService from '../services/saude.service.js';
// CORREÇÃO: Adicionar getNomeMunicipioMAPorCodigo à importação
import { getCodigoIbgePorNomeMA, getNomeMunicipioMAPorCodigo, CODIGO_UF_MA } from '../utils/ibgeCodes.js'; 
import { logger } from '../utils/logger.js';
import crypto from 'crypto';

// Códigos de Erro Padronizados
const ERRO_VALIDACAO = 'ERRO_VALIDACAO';
const ERRO_INTERNO = 'ERRO_INTERNO';
const API_INDISPONIVEL = 'API_INDISPONIVEL';
const NAO_ENCONTRADO = 'NAO_ENCONTRADO';
const ATUALIZACAO_FALHOU = 'ATUALIZACAO_FALHOU';
const GEOLOCALIZACAO_INVALIDA = 'GEOLOCALIZACAO_INVALIDA';
const MUNICIPIO_NAO_ENCONTRADO = 'MUNICIPIO_NAO_ENCONTRADO';

// ===== FUNÇÕES AUXILIARES DE RESPOSTA E TRATAMENTO DE ERRO =====
function responderSucesso(res, { dados, mensagem, metadados }) {
    return res.json({
        sucesso: true,
        ...(mensagem && { mensagem }),
        ...(dados !== undefined && { dados }), // Inclui 'dados' mesmo se for array vazio ou null, mas não se for undefined
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

function calcularTempoProcessamento(startTime) {
    const diff = process.hrtime(startTime);
    return `${(diff[0] * 1000 + diff[1] / 1e6).toFixed(2)}ms`;
}

function tratarErro(res, error, requestId, codigoErroPadrao = ERRO_INTERNO) {
    const errObj = error || {}; 
    const errorMessage = (errObj instanceof Error && errObj.message) 
        ? errObj.message 
        : (typeof errObj === 'string' ? errObj : 'Ocorreu um erro desconhecido.');

    logger.error(`[${requestId}] Erro no controller: ${errorMessage}`, {
        stack: errObj.stack?.substring(0, 1000),
        details: errObj.details,
        code: errObj.code,
        status: errObj.status,
    });

    const responseStatus = errObj.status || 500;
    const responseCode = errObj.code || codigoErroPadrao;
    let responseMessage = errorMessage;

    // Para erros já formatados pelo _erroServico
    if (errObj.isOperational) { // Erros "esperados" ou do cliente
        responseMessage = errorMessage; // Usa a mensagem original do erro operacional
    } else if (responseStatus >= 500 && process.env.NODE_ENV === 'production') { // Erros internos em produção
        responseMessage = 'Falha interna ao processar requisição.';
    }
    // Para erros de API externa, se o _erroServico já formatou bem, esta parte pode ser redundante
    // mas mantemos como uma forma de refinar a mensagem se necessário.
    if (responseCode === API_INDISPONIVEL && errObj.details?.api) {
         responseMessage = `Serviço externo (${errObj.details.api}) indisponível ou falhou.`;
    }

    return responderErro(res, responseStatus, {
        codigo: responseCode,
        mensagem: responseMessage,
        // Detalhes em ambiente de não produção ou se for erro operacional
        ...(((process.env.NODE_ENV !== 'production' || errObj.isOperational) && errObj.details) && { detalhes: errObj.details }),
        // Em produção, para erros internos genéricos, podemos querer omitir detalhes técnicos
        ...(process.env.NODE_ENV === 'production' && responseStatus >= 500 && responseCode === ERRO_INTERNO && !errObj.isOperational && {detalhes: {mensagemOriginal: "Erro interno."}}),
        requestId
    });
}
// ===== FIM FUNÇÕES AUXILIARES =====


export const listarEstabelecimentosSaude = async (req, res) => {
    const startTime = process.hrtime();
    const requestId = req.id || crypto.randomUUID(); // req.id viria de um middleware de requestId, se existir
    logger.info(`[${requestId}] Controller: listarEstabelecimentosSaude - Path: ${JSON.stringify(req.params)}, Query: ${JSON.stringify(req.query)}`);

    try {
        const { tipo, pagina, user_lat, user_long } = req.query; 
        let codigoIbgeParaServico = null;
        let codigoUfParaServico = null; 
        let nomeMunicipioReferencia = `Estado do Maranhão (UF ${CODIGO_UF_MA})`; // Default

        // Prioriza código IBGE vindo do path (ex: /saude/codigo/2111300)
        if (req.params.codigo_ibge) {
            const codigoIbgeNumerico = parseInt(req.params.codigo_ibge, 10);
            if (isNaN(codigoIbgeNumerico)) {
                return responderErro(res, 400, { codigo: ERRO_VALIDACAO, mensagem: "Código IBGE fornecido no path é inválido.", requestId});
            }
            codigoIbgeParaServico = codigoIbgeNumerico; 
            nomeMunicipioReferencia = getNomeMunicipioMAPorCodigo(codigoIbgeParaServico) || `Município IBGE ${codigoIbgeParaServico}`;
            logger.info(`[${requestId}] Buscando por código IBGE específico do path: ${codigoIbgeParaServico} (${nomeMunicipioReferencia})`);
        } else if (req.query.municipio_nome) { // Depois tenta nome do município via query param
            const nomeMunicipioQuery = String(req.query.municipio_nome); 
            logger.info(`[${requestId}] Buscando por nome de município via query: ${nomeMunicipioQuery}`);
            
            const codigoEncontrado = getCodigoIbgePorNomeMA(nomeMunicipioQuery); 
            if (!codigoEncontrado) {
                logger.warn(`[${requestId}] Município '${nomeMunicipioQuery}' não encontrado no mapeamento local.`);
                // Se não encontrar pelo nome, pode optar por buscar no estado todo ou retornar erro.
                // Para o beta, retornar erro se o nome do município não for encontrado é mais seguro.
                return responderErro(res, 404, {
                    codigo: MUNICIPIO_NAO_ENCONTRADO,
                    mensagem: `Município '${nomeMunicipioQuery}' não encontrado. Verifique o nome ou use um código IBGE válido. Para buscar em todo o estado, não especifique município.`,
                    requestId
                });
            }
            codigoIbgeParaServico = codigoEncontrado;
            nomeMunicipioReferencia = getNomeMunicipioMAPorCodigo(codigoEncontrado) || nomeMunicipioQuery; // Atualiza referência
            logger.info(`[${requestId}] Código IBGE ${codigoIbgeParaServico} encontrado para ${nomeMunicipioQuery}`);
        } else { // Se nenhum dos acima, busca pelo estado padrão (MA)
            codigoUfParaServico = CODIGO_UF_MA; // CODIGO_UF_MA é o número 21
            logger.info(`[${requestId}] Nenhum município específico fornecido. Buscando para UF ${codigoUfParaServico}.`);
        }

        const resultadoServico = await saudeService.buscarEstabelecimentos({
            codigoIbge: codigoIbgeParaServico,
            codigoUf: codigoUfParaServico, 
            tipo, 
            pagina: pagina ? parseInt(pagina, 10) : 1,
            userLat: user_lat ? parseFloat(user_lat) : null,
            userLong: user_long ? parseFloat(user_long) : null,
            requestId
        });

        if (!resultadoServico || !resultadoServico.dados || resultadoServico.dados.length === 0) {
            logger.info(`[${requestId}] Nenhum estabelecimento encontrado no serviço para os critérios.`);
            return responderErro(res, 404, {
                codigo: NAO_ENCONTRADO,
                mensagem: 'Nenhum estabelecimento de saúde encontrado para os critérios fornecidos.',
                detalhes: { 
                    filtrosUtilizados: { 
                        ...(codigoIbgeParaServico && { codigoIbge: codigoIbgeParaServico }),
                        ...(codigoUfParaServico && !codigoIbgeParaServico && { codigoUf: codigoUfParaServico }),
                        municipioReferencia: nomeMunicipioReferencia,
                        tipo: tipo || 'Todos',
                        pagina: pagina ? parseInt(pagina, 10) : 1,
                        ...(user_lat && { user_lat }),
                        ...(user_long && { user_long })
                    },
                    // Adiciona o aviso da fonte se existir no resultado do serviço
                    ...(resultadoServico?.metadados?.avisoConsulta && { avisoDaFonte: resultadoServico.metadados.avisoConsulta})
                },
                requestId
            });
        }

        return responderSucesso(res, {
            dados: resultadoServico.dados,
            metadados: {
                ...(resultadoServico.metadados || {}),
                tempoProcessamento: calcularTempoProcessamento(startTime),
                requestId,
                // Mantém os filtros aplicados para clareza na resposta
                filtrosAplicadosNaConsulta: {
                    ...(codigoIbgeParaServico && { codigoIbgeConsultado: codigoIbgeParaServico }),
                    ...(codigoUfParaServico && !codigoIbgeParaServico && { codigoUfConsultado: codigoUfParaServico }),
                    referenciaGeografica: nomeMunicipioReferencia,
                    tipo: tipo || 'Todos',
                    paginaConsultada: pagina ? parseInt(pagina, 10) : 1,
                    ...(user_lat && { latitudeUsuario: user_lat }),
                    ...(user_long && { longitudeUsuario: user_long })
                }
            }
        });

    } catch (error) {
        return tratarErro(res, error, requestId);
    }
};

export const listarProximos = async (req, res) => {
    const startTime = process.hrtime();
    const requestId = req.id || crypto.randomUUID();
    const { lat, long, raio, tipo } = req.query;
    logger.info(`[${requestId}] Controller: listarProximos - Query: ${JSON.stringify(req.query)}`);

    // Validação básica de latitude e longitude
    if (lat === undefined || long === undefined || isNaN(parseFloat(lat)) || isNaN(parseFloat(long))) {
        return responderErro(res, 400, {
            codigo: ERRO_VALIDACAO,
            mensagem: "Latitude (lat) e Longitude (long) são obrigatórias e devem ser números.",
            requestId
        });
    }

    try {
        const raioMetrosDefault = 5000; // 5km como default
        const resultados = await saudeService.buscarPorProximidade({
            latitude: parseFloat(lat), 
            longitude: parseFloat(long), 
            raio: raio ? parseInt(raio, 10) : raioMetrosDefault, 
            tipo, 
            requestId
        });

        if (!resultados || resultados.length === 0) {
            return responderErro(res, 404, {
                codigo: NAO_ENCONTRADO,
                mensagem: 'Nenhum estabelecimento próximo encontrado para os critérios fornecidos.',
                detalhes: { coordenadas: [lat, long], raio: raio ? parseInt(raio, 10) : raioMetrosDefault, tipo: tipo || 'Todos'},
                requestId
            });
        }
        return responderSucesso(res, { 
            dados: resultados, 
            metadados: { 
                requestId, 
                tempoProcessamento: calcularTempoProcessamento(startTime),
                totalEncontrado: resultados.length,
                parametrosBusca: { coordenadas: [lat,long], raioMetros: raio ? parseInt(raio, 10) : raioMetrosDefault, tipoEstabelecimento: tipo || 'Todos'}
            }
        });
    } catch (error) {
        // Tratar erro específico de geolocalização se o serviço o lançar
        return tratarErro(res, error, requestId, GEOLOCALIZACAO_INVALIDA);
    }
};

export const atualizarDadosSaude = async (req, res) => {
    const startTime = process.hrtime();
    const requestId = req.id || crypto.randomUUID();
    logger.info(`[${requestId}] Controller: atualizarDadosSaude - Disparando processos de sincronização.`);
    
    // Não aguardar a conclusão aqui para responder rapidamente ao cliente
    saudeService.sincronizarEstabelecimentosCNESdoMA({ requestId: `${requestId}-SYNC_CNES_MA` })
        .then(resultadoSinc => { logger.info(`[${requestId}-SYNC_CNES_MA] Sincronização CNES MA concluída em background.`, resultadoSinc); })
        .catch(errSinc => { logger.error(`[${requestId}-SYNC_CNES_MA] Erro na sincronização CNES MA em background.`, { message: errSinc.message, stack: errSinc.stack?.substring(0,1000) }); });

    saudeService.atualizarHospitais({ requestId: `${requestId}-SYNC_HOSP` })
        .then(resultadoHosp => { logger.info(`[${requestId}-SYNC_HOSP] Atualização Hospitais concluída em background.`, resultadoHosp); })
        .catch(errHosp => { logger.error(`[${requestId}-SYNC_HOSP] Erro na atualização Hospitais em background.`, { message: errHosp.message, stack: errHosp.stack?.substring(0,1000) }); });

    saudeService.atualizarUBS({ requestId: `${requestId}-SYNC_UBS` })
        .then(resultadoUBS => { logger.info(`[${requestId}-SYNC_UBS] Atualização UBS concluída em background.`, resultadoUBS); })
        .catch(errUBS => { logger.error(`[${requestId}-SYNC_UBS] Erro na atualização UBS em background.`, { message: errUBS.message, stack: errUBS.stack?.substring(0,1000) }); });

    return responderSucesso(res, {
        mensagem: "Processos de sincronização e atualização de dados de saúde foram iniciados em background. Monitore os logs do servidor para o status.",
        metadados: { requestId, timestamp: new Date().toISOString(), tempoDisparo: calcularTempoProcessamento(startTime) }
    });
};

export const listarTiposEstabelecimentos = async (req, res) => {
    const startTime = process.hrtime();
    const requestId = req.id || crypto.randomUUID();
    logger.info(`[${requestId}] Controller: listarTiposEstabelecimentos`);
    try {
        const tipos = await saudeService.obterTiposEstabelecimentos({ requestId });
        if (!tipos || tipos.length === 0) {
            return responderErro(res, 404, { codigo: NAO_ENCONTRADO, mensagem: 'Nenhum tipo de estabelecimento configurado.', requestId });
        }
        return responderSucesso(res, { dados: tipos, metadados: { requestId, total: tipos.length, tempoProcessamento: calcularTempoProcessamento(startTime) } });
    } catch (error) {
        return tratarErro(res, error, requestId);
    }
};