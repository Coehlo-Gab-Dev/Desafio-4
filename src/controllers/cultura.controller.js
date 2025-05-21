import { buscarPontosCultura } from '../services/cultura.service.js';
import { logger } from '../utils/logger.js';
import crypto from 'crypto';

export const listarPontosCultura = async (req, res) => {
  const startTime = Date.now();
  const requestId = req.id || crypto.randomUUID();

  try {
    logger.info(`[${requestId}] Nova requisição para pontos culturais`, { 
      query: req.query,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    // Validação e normalização de parâmetros
    const { pagina = 1, cidade, tipo } = req.query;
    const paginaNum = Math.max(1, parseInt(pagina)) || 1;
    const cidadeNormalizada = cidade?.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();

    // Busca dos dados (agora com múltiplas fontes)
    const resultado = await buscarPontosCultura({ 
      pagina: paginaNum,
      cidade: cidadeNormalizada,
      tipo: tipo?.trim()
    });

    // Determina o status HTTP apropriado
    let statusCode = 200;
    if (resultado.metadados.fonte === 'mock') {
      statusCode = 206; // Partial Content para dados simulados
    } else if (resultado.dados.length === 0) {
      statusCode = 204; // No Content
    }

    // Log de sucesso detalhado
    logger.info(`[${requestId}] Requisição concluída com sucesso`, {
      tempoProcessamento: `${Date.now() - startTime}ms`,
      itensRetornados: resultado.dados.length,
      fonteDados: resultado.metadados.fonte,
      parametros: { pagina: paginaNum, cidade: cidadeNormalizada, tipo }
    });

    // Resposta padronizada
    return res.status(statusCode).json({
      sucesso: true,
      dados: resultado.dados,
      metadados: {
        requestId,
        timestamp: new Date().toISOString(),
        fonte: resultado.metadados.fonte,
        tempoResposta: `${Date.now() - startTime}ms`,
        paginacao: {
          pagina: paginaNum,
          itensPorPagina: resultado.dados.length,
          totalDisponivel: resultado.totalItens || undefined,
          temMais: resultado.temMais || undefined
        },
        ...(resultado.metadados.fonte === 'banco_local' && { 
          avisoCache: 'Dados podem estar desatualizados' 
        })
      },
      ...(resultado.aviso && { aviso: resultado.aviso })
    });

  } catch (error) {
    // Log de erro completo
    logger.error(`[${requestId}] Falha crítica no processamento`, {
      erro: error.message,
      stack: error.stack,
      tempoProcessamento: `${Date.now() - startTime}ms`,
      parametrosOriginais: req.query,
      endpoint: req.originalUrl
    });

    // Resposta de erro padronizada
    const respostaErro = {
      sucesso: false,
      erro: {
        codigo: error.codigo || 'ERRO_INTERNO',
        mensagem: error.mensagem || 'Falha ao processar requisição cultural',
        ...(process.env.NODE_ENV !== 'production' && {
          detalhes: error.message,
          stack: error.stack
        })
      },
      metadados: {
        requestId,
        timestamp: new Date().toISOString(),
        tempoProcessamento: `${Date.now() - startTime}ms`
      }
    };

    // Status code específico para diferentes tipos de erro
    let statusCode = 500;
    if (error.message.includes('Nenhum dado disponível')) {
      statusCode = 404;
    } else if (error.message.includes('Todas as APIs falharam')) {
      statusCode = 503;
    }

    return res.status(statusCode).json(respostaErro);
  }
};