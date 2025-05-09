import express from 'express';
import saudeRouter from './saude.routes.js';
// import educacaoRoutes from './educacao.routes.js';
// import culturaRoutes from './cultura.routes.js';
import govbrRoutes from './govbr.routes.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Middleware para log de rotas
router.use((req, res, next) => {
    logger.info(`[ROTA] ${req.method} ${req.originalUrl}`);
    next();
  });
// Configuração das rotas
router.use('/saude', saudeRouter);
// router.use('/educacao', educacaoRoutes);
// router.use('/cultura', culturaRoutes);
router.use('/govbr', govbrRoutes);

// Rota de health check
router.get('/', (req, res) => {
    res.status(200).json({
      status: 'online',
      rotas_disponiveis: ['/saude'],
      timestamp: new Date().toISOString()
    });
  });
  

// Middleware para rotas não encontradas

router.use((req, res) => {
    logger.warn(`Rota não encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
      error: {
        code: 'ROUTE_NOT_FOUND',
        message: 'Endpoint não disponível',
        available_routes: ['/saude/estabelecimentos']
      }
    });
  });

export default router;