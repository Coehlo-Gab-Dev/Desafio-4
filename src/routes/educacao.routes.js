import express from 'express';
import { listarEscolas } from '../controllers/educacao.controller.js';
import { validarTokenGoverno } from '../middlewares/tokenValidator.middleware.js';
import { query, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const educacaoRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => req.ip,
  handler: (req, res) => {
    res.status(429).json({
      sucesso: false,
      erro: {
        codigo: 'LIMITE_EDUCACAO_EXCEDIDO',
        mensagem: 'Máximo de 100 requisições a cada 15 minutos para educação'
      }
    });
  }
});

const validarConsultaEducacao = [
  query('pagina')
    .optional()
    .isInt({ min: 1 }).withMessage('Página deve ser número inteiro positivo')
    .toInt(),
  query('cidade')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Cidade deve ter entre 3-100 caracteres')
    .escape(),
  query('nivel')
    .optional()
    .isIn(['infantil', 'fundamental', 'medio', 'profissionalizante', 'eja'])
    .withMessage('Nível de ensino inválido'),
  query('uf')
    .optional()
    .isUppercase()
    .isLength({ min: 2, max: 2 })
    .isIn(['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'])
    .withMessage('UF inválida')
];

router.get('/escolas',
  validarTokenGoverno,
  educacaoRateLimiter,
  validarConsultaEducacao,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        sucesso: false,
        erro: {
          codigo: 'PARAMETROS_EDUCACAO_INVALIDOS',
          mensagem: 'Erro de validação',
          detalhes: errors.array()
        }
      });
    }
    next();
  },
  listarEscolas
);

// Rotas legadas
router.get('/unidades-escolares', (req, res) => {
  res.redirect(301, '/api/escolas?' + new URLSearchParams(req.query));
});

export default router;