import { query, param, body, validationResult } from 'express-validator';
import { logger } from '../utils/logger.js';

// Validações compartilhadas
const validacoesComuns = {
  paginacao: [
    query('pagina')
      .optional()
      .isInt({ min: 1 }).withMessage('Página deve ser um inteiro positivo ≥1')
      .toInt()
      .default(1),
    query('itensPorPagina')
      .optional()
      .isInt({ min: 1, max: 100 }).withMessage('Itens por página deve ser entre 1-100')
      .toInt()
      .default(10)
  ],
  localizacao: [
    query('latitude')
      .optional()
      .isFloat({ min: -90, max: 90 }).withMessage('Latitude inválida (-90 a 90)')
      .toFloat(),
    query('longitude')
      .optional()
      .isFloat({ min: -180, max: 180 }).withMessage('Longitude inválida (-180 a 180)')
      .toFloat()
  ]
};

// Validações específicas para serviços públicos
export const validarServicosPublicos = [
  ...validacoesComuns.paginacao,
  query('categoria')
    .optional()
    .isIn(['assistencia_social', 'saude', 'educacao', 'trabalho', 'habitação', 'outros'])
    .withMessage('Categoria inválida'),
  query('beneficio')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Benefício deve ter 3-50 caracteres'),
  query('publicoAlvo')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Público-alvo deve ter até 100 caracteres')
];

// Middleware de tratamento de erros
export const validarRequisicao = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errosFormatados = errors.array().map(err => ({
      parametro: err.param,
      local: err.location,
      mensagem: err.msg,
      valor: err.value
    }));

    logger.warn('Erros de validação', {
      rota: req.originalUrl,
      metodo: req.method,
      erros: errosFormatados
    });

    return res.status(400).json({
      sucesso: false,
      erro: {
        codigo: 'VALIDACAO_FALHOU',
        mensagem: 'Dados inválidos na requisição',
        erros: errosFormatados
      },
      metadados: {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    });
  }
  next();
};