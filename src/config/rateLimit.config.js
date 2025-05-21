import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger.js';

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Pular rate limit para IPs confiáveis ou rotas de health check
    return req.ip === '::1' || req.originalUrl === '/api/v1/health';
  },
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Muitas requisições deste IP. Tente novamente mais tarde.',
        limit: parseInt(process.env.RATE_LIMIT_MAX) || 100,
        window: '15 minutos'
      },
      metadata: {
        timestamp: new Date().toISOString(),
        documentation: 'https://developer.meuapp.com/docs/rate-limiting'
      }
    });
  }
});

export default limiter;