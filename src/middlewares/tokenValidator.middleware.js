import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.js';

export const validarTokenGoverno = (req, res, next) => {
  const token = req.headers['gov-api-token'] || process.env.GOV_API_TOKEN;
  
  if (!token) {
    logger.error('Token do governo não fornecido');
    return res.status(401).json({
      success: false,
      error: {
        code: 'TOKEN_NAO_FORNECIDO',
        message: 'Token de acesso à API governamental é requerido'
      }
    });
  }

  try {
    const decoded = jwt.decode(token);
    
    if (!decoded) {
      throw new Error('Token inválido ou malformado');
    }

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      logger.error('Token do governo expirado');
      return res.status(403).json({
        success: false,
        error: {
          code: 'TOKEN_EXPIRADO',
          message: 'Token de integração com governo expirado',
          renovacao: 'https://api.gov.br/renovar-token'
        }
      });
    }

    // Adiciona informações do token à requisição
    req.govApiTokenInfo = decoded;
    next();
  } catch (error) {
    logger.error('Falha na validação do token', {
      error: error.message,
      stack: error.stack
    });
    
    return res.status(500).json({
      success: false,
      error: {
        code: 'ERRO_VALIDACAO_TOKEN',
        message: 'Falha ao validar token de integração'
      }
    });
  }
};

// Middleware para rotas críticas que requerem token válido
export const validarTokenCritico = (req, res, next) => {
  validarTokenGoverno(req, res, (err) => {
    if (err) return next(err);
    
    if (!req.govApiTokenInfo?.scope?.includes('leitura_servicos')) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'SCOPE_INSUFICIENTE',
          message: 'Token não possui permissão para acessar este recurso'
        }
      });
    }
    next();
  });
};