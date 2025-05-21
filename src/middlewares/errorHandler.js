import { logger } from '../utils/logger.js';

// Middleware principal de tratamento de erros
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';
  const isOperationalError = err.isOperational || false;

  // Log detalhado do erro
  logger.error({
    message: err.message,
    ...(!isProduction && { stack: err.stack, fullError: err }),
    request: {
      method: req.method,
      url: req.originalUrl,
      params: req.params,
      query: req.query,
      body: Object.keys(req.body).length > 0 ? req.body : undefined,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    },
    statusCode,
    timestamp: new Date().toISOString()
  });

  // Resposta formatada
  const errorResponse = {
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: isProduction && !isOperationalError
        ? 'Ocorreu um erro inesperado no servidor'
        : err.message,
      ...(!isProduction && {
        details: err.details,
        stack: err.stack,
        type: err.name
      })
    },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.id || null,
      path: req.originalUrl,
      ...(err.metadata && { ...err.metadata })
    }
  };

  if (!isOperationalError && isProduction) {
    logger.fatal('Erro fatal não operacional, encerrando aplicação...');
    process.exit(1);
  }

  res.status(statusCode).json(errorResponse);
};

// Função para validar parâmetros (adicionei como exemplo)
const validarParametros = (req, res, next) => {
  // Implemente suas validações aqui
  // Exemplo: validar se um ID está presente
  if (!req.params.id) {
    const err = new Error('Parâmetro ID é obrigatório');
    err.statusCode = 400;
    err.isOperational = true;
    throw err;
  }
  next();
};

// Exportando ambas as funções
export const responderErro = errorHandler;
export { validarParametros };
export default errorHandler;