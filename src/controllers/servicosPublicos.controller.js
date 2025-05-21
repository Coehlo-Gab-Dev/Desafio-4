import { buscarServicosPublicos } from '../services/servicosPublicos.service.js';
import { logger } from '../utils/logger.js';

export const listarServicosPublicos = async (req, res) => {
  const startTime = Date.now();
  const requestId = req.id || crypto.randomUUID();

  try {
    logger.info(`[${requestId}] Nova requisição de serviços públicos`, { 
      query: req.query,
      ip: req.ip 
    });

    // Validação e normalização
    const { pagina = 1, categoria, nome, esfera } = req.query;

    // Busca dos dados
    const resultado = await buscarServicosPublicos({ 
      pagina: Math.max(1, parseInt(pagina)),
      categoria,
      nome: nome?.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
      esfera
    });

    // Log de sucesso
    logger.info(`[${requestId}] Requisição concluída`, {
      tempoMs: Date.now() - startTime,
      servicos: resultado.dados.length,
      fonte: resultado.metadados.fonte
    });

    // Resposta
    return res.status(resultado.metadados.fonte === 'mock' ? 206 : 200).json({
      sucesso: true,
      dados: resultado.dados,
      metadados: {
        ...resultado.metadados,
        requestId,
        timestamp: new Date().toISOString(),
        tempoResposta: `${Date.now() - startTime}ms`,
        paginacao: {
          pagina: parseInt(pagina),
          itensPorPagina: resultado.dados.length,
          totalItens: resultado.total || undefined
        },
        filtros: {
          categoria: categoria || null,
          nome: nome || null,
          esfera: esfera || null
        }
      },
      ...(resultado.aviso && { aviso: resultado.aviso })
    });

  } catch (error) {
    logger.error(`[${requestId}] Erro no controller de serviços públicos`, {
      erro: error.message,
      stack: error.stack,
      query: req.query,
      tempoProcessamento: `${Date.now() - startTime}ms`
    });

    return res.status(500).json({
      sucesso: false,
      erro: {
        codigo: 'ERRO_SERVICOS_PUBLICOS',
        mensagem: 'Falha ao buscar serviços públicos',
        ...(process.env.NODE_ENV === 'development' && {
          detalhes: error.message
        })
      },
      metadados: {
        requestId,
        timestamp: new Date().toISOString()
      }
    });
  }
};