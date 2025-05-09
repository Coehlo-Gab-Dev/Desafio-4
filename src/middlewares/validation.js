import { query, param, body, validationResult } from 'express-validator';
import { logger } from '../utils/logger.js';

/**
 * Validações para consulta de estabelecimentos de saúde
 */
export const validarConsultaEstabelecimentos = [
  query('pagina')
    .optional()
    .isInt({ min: 1 }).withMessage('O número da página deve ser um inteiro positivo')
    .toInt()
    .customSanitizer(value => value || 1), // Garante valor padrão 1

  query('tipo')
    .optional()
    .trim()
    .isIn(['UPA', 'HOSPITAL', 'PRONTO SOCORRO', 'UBS', 'PS'])
    .withMessage('Tipo de estabelecimento inválido. Valores aceitos: UPA, HOSPITAL, PRONTO SOCORRO, UBS, PS'),

  query('municipio')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('O município deve ter entre 3 e 100 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('O município deve conter apenas letras e espaços'),

  query('uf')
    .optional()
    .trim()
    .isLength({ min: 2, max: 2 })
    .withMessage('A UF deve ter exatamente 2 caracteres')
    .isUppercase()
    .withMessage('A UF deve estar em maiúsculas')
    .isIn(['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'])
    .withMessage('UF brasileira inválida'),

  query('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('A latitude deve estar entre -90 e 90 graus')
    .toFloat(),

  query('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('A longitude deve estar entre -180 e 180 graus')
    .toFloat()
];

/**
 * Validação para criação/atualização de estabelecimentos
 */
export const validarCadastroEstabelecimento = [
  body('codigo')
    .isString()
    .trim()
    .notEmpty().withMessage('O código CNES é obrigatório')
    .isLength({ min: 7, max: 7 }).withMessage('O código CNES deve ter 7 dígitos')
    .matches(/^[0-9]+$/).withMessage('O código CNES deve conter apenas números'),

  body('nome')
    .isString()
    .trim()
    .notEmpty().withMessage('O nome é obrigatório')
    .isLength({ min: 5, max: 100 }).withMessage('O nome deve ter entre 5 e 100 caracteres'),

  body('tipo')
    .isString()
    .trim()
    .notEmpty().withMessage('O tipo é obrigatório')
    .isIn(['UPA', 'HOSPITAL', 'PRONTO SOCORRO', 'UBS', 'PS'])
    .withMessage('Tipo de estabelecimento inválido'),

  body('endereco')
    .isString()
    .trim()
    .notEmpty().withMessage('O endereço é obrigatório')
    .isLength({ min: 10, max: 200 }).withMessage('O endereço deve ter entre 10 e 200 caracteres'),

  body('municipio')
    .isString()
    .trim()
    .notEmpty().withMessage('O município é obrigatório')
    .isLength({ min: 3, max: 50 }).withMessage('O município deve ter entre 3 e 50 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/).withMessage('O município deve conter apenas letras e espaços'),

  body('uf')
    .isString()
    .trim()
    .notEmpty().withMessage('A UF é obrigatória')
    .isLength({ min: 2, max: 2 }).withMessage('A UF deve ter 2 caracteres')
    .isUppercase().withMessage('A UF deve estar em maiúsculas')
    .isIn(['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'])
    .withMessage('UF brasileira inválida'),

  body('telefone')
    .optional()
    .isString()
    .trim()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/)
    .withMessage('O telefone deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX'),

  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 }).withMessage('A latitude deve estar entre -90 e 90 graus')
    .toFloat(),

  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 }).withMessage('A longitude deve estar entre -180 e 180 graus')
    .toFloat()
];

/**
 * Validação de ID CNES na URL
 */
export const validarIdCnes = [
  param('id')
    .isString().withMessage('O ID deve ser uma string')
    .trim()
    .notEmpty().withMessage('O ID é obrigatório')
    .isLength({ min: 7, max: 7 }).withMessage('O ID CNES deve ter 7 dígitos')
    .matches(/^[0-9]+$/).withMessage('O ID CNES deve conter apenas números')
];

/**
 * Middleware para tratamento de erros de validação
 */
export const tratarErrosValidacao = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errosFormatados = errors.array().map(err => ({
      campo: err.path,
      mensagem: err.msg,
      valor: err.value,
      localizacao: err.location
    }));

    logger.warn('Erros de validação', {
      metodo: req.method,
      endpoint: req.originalUrl,
      ip: req.ip,
      erros: errosFormatados
    });

    return res.status(400).json({
      sucesso: false,
      erro: {
        codigo: 'DADOS_INVALIDOS',
        mensagem: 'Erro de validação nos dados enviados',
        detalhes: errosFormatados
      },
      metadados: {
        timestamp: new Date().toISOString()
      }
    });
  }
  
  next();
};