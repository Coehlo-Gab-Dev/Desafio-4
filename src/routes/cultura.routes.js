import express from 'express';
import { listarPontosCultura } from '../controllers/cultura.controller.js';
import { validarTokenGoverno } from '../middlewares/tokenValidator.middleware.js';
import { query, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const culturaRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => req.ip,
  handler: (req, res) => {
    res.status(429).json({
      sucesso: false,
      erro: {
        codigo: 'LIMITE_EXCEDIDO',
        mensagem: 'Máximo de 100 requisições a cada 15 minutos'
      }
    });
  }
});

const validarConsultaCultura = [
  query('pagina')
    .optional()
    .isInt({ min: 1 }).withMessage('Página deve ser número inteiro positivo')
    .toInt(),
  query('cidade')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Cidade deve ter entre 3-100 caracteres')
    .escape(),
  query('tipo')
    .optional()
    .isIn(['museu', 'teatro', 'biblioteca', 'centro_cultural', 'galeria'])
    .withMessage('Tipo de ponto cultural inválido')
];

router.get('/pontos-cultura',
  validarTokenGoverno,
  culturaRateLimiter,
  validarConsultaCultura,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        sucesso: false,
        erro: {
          codigo: 'PARAMETROS_INVALIDOS',
          mensagem: 'Erro de validação',
          detalhes: errors.array()
        }
      });
    }
    next();
  },
  listarPontosCultura
);

// Rotas legadas
router.get('/culturais', (req, res) => {
  res.redirect(301, '/api/pontos-cultura?' + new URLSearchParams(req.query));
});

router.get('/museus', (req, res) => {
  const queryParams = new URLSearchParams(req.query);
  queryParams.set('tipo', 'museu');
  res.redirect(301, '/api/pontos-cultura?' + queryParams);
});

export default router;