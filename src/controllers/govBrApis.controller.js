import { getServicosPublicos } from '../services/govBrApis.service.js';

export async function listarServicosGovBr(req, res) {
  const { pagina = 1, nome = '', atualizar = 'false', ordenarPor = 'totalSeguidores' } = req.query;
  
  try {
    // Validação e normalização de parâmetros
    const params = {
      pagina: Math.max(1, parseInt(pagina)) || 1,
      nome: nome.toString().trim(),
      forceUpdate: atualizar.toLowerCase() === 'true',
      ordenarPor: ['totalSeguidores', 'ultimaAtualizacao', 'nome'].includes(ordenarPor) 
        ? ordenarPor 
        : 'totalSeguidores'
    };

    // Busca os dados
    const resultado = await getServicosPublicos(
      params.pagina, 
      params.nome, 
      params.forceUpdate
    );

    // Formata resposta
    const responsePayload = {
      success: true,
      data: resultado,
      metadata: {
        apiVersion: 'v2',
        source: params.forceUpdate ? 'api' : 'cache',
        timestamp: new Date().toISOString(),
        pagination: {
          currentPage: params.pagina,
          itemsPerPage: resultado.length,
          hasMore: resultado.length >= 10 // Supondo 10 itens por página
        }
      }
    };

    res.status(200).json(responsePayload);

  } catch (error) {
    const statusCode = getStatusCode(error);
    const errorResponse = buildErrorResponse(error, req);
    
    console.error(`[${new Date().toISOString()}] Erro ${statusCode}:`, {
      endpoint: req.originalUrl,
      params: req.query,
      error: errorResponse.error
    });

    res.status(statusCode).json(errorResponse);
  }
}

// Utilitários
function getStatusCode(error) {
  const codeMap = {
    'INVALID_PARAM': 400,
    'TOKEN_INVALIDO': 401,
    'ACESSO_NEGADO': 403,
    'NAO_ENCONTRADO': 404,
    'LIMITE_EXCEDIDO': 429,
    'API_ERROR': 502
  };
  return codeMap[error.code] || 500;
}

function buildErrorResponse(error, req) {
  return {
    success: false,
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message: error.message,
      action: error.action || 'Tente novamente mais tarde',
      ...(process.env.NODE_ENV !== 'production' && {
        details: error.details,
        stack: error.stack
      })
    },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.id || generateRequestId(),
      documentation: "https://developer.meuapp.com/erros"
    }
  };
}

function generateRequestId() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}