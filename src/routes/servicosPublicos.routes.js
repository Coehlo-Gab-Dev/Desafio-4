import express from 'express';
import { listarServicosPublicos } from '../controllers/servicosPublicos.controller.js';
import { validarTokenGoverno } from '../middlewares/tokenValidator.middleware.js';
import { query, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const servicosRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => req.ip,
  handler: (req, res) => {
    res.status(429).json({
      sucesso: false,
      erro: {
        codigo: 'LIMITE_SERVICOS_EXCEDIDO',
        mensagem: 'Máximo de 100 requisições a cada 15 minutos para serviços públicos'
      }
    });
  }
});

const validarConsultaServicos = [
  query('pagina')
    .optional()
    .isInt({ min: 1 }).withMessage('Página deve ser número inteiro positivo')
    .toInt(),
  query('nome')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3-100 caracteres')
    .escape(),
  query('categoria')
    .optional()
    .isIn(['assistencia_social', 'saude', 'educacao', 'trabalho', 'habitação', 'outros'])
    .withMessage('Categoria inválida'),
  query('esfera')
    .optional()
    .isIn(['federal', 'estadual', 'municipal'])
    .withMessage('Esfera de governo inválida')
];

/**
 * @swagger
 * /api/servicos-publicos:
 *   get:
 *     summary: Obtém informações sobre serviços públicos governamentais
 *     description: Retorna detalhes sobre programas como Bolsa Família, incluindo como acessar
 *     tags: [Serviços Públicos]
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *           enum: [assistencia_social, saude, educacao, trabalho, habitação, outros]
 *       - in: query
 *         name: esfera
 *         schema:
 *           type: string
 *           enum: [federal, estadual, municipal]
 *     responses:
 *       200:
 *         description: Lista de serviços públicos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaServicosPublicos'
 */
router.get('/servicos-publicos',
  validarTokenGoverno,
  servicosRateLimiter,
  validarConsultaServicos,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        sucesso: false,
        erro: {
          codigo: 'PARAMETROS_SERVICOS_INVALIDOS',
          mensagem: 'Erro de validação',
          detalhes: errors.array()
        }
      });
    }
    next();
  },
  listarServicosPublicos
);

// Rotas legadas
router.get('/programas-sociais', (req, res) => {
  res.redirect(301, '/api/servicos-publicos?' + new URLSearchParams(req.query));
});

export default router;