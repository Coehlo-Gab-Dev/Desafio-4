// src/routes/saude.routes.js
import express from 'express';
import {
    listarEstabelecimentosSaude,
    atualizarDadosSaude,
    listarTiposEstabelecimentos,
    listarProximos
} from '../controllers/saude.controller.js';

import { validarTokenGoverno } from '../middlewares/tokenValidator.middleware.js';
import { checkValidationResult } from '../middlewares/errorHandler.js'; // Corrigido para importar de errorHandler.js
import { query, param } from 'express-validator';
import rateLimit from 'express-rate-limit';

// --- Importar o Enum do Prisma e definir a constante para validação ---
import { TipoEstabelecimentoSaude } from '@prisma/client'; // Verifique se o caminho para o cliente Prisma está correto
const TIPOS_SAUDE_VALIDOS_ENUM = Object.values(TipoEstabelecimentoSaude);
// --------------------------------------------------------------------

// --- Configurações de Rate Limit ---
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_RATE_LIMIT = 150;
const ADMIN_RATE_LIMIT = 300;

const createRateLimitErrorHandler = (limitValue, windowText, message) => (req, res) => {
    res.status(429).json({
        sucesso: false,
        erro: {
            codigo: 'LIMITE_REQUISICOES',
            mensagem: message,
            detalhes: { limite: limitValue, window: windowText },
            requestId: req.id || null
        }
    });
};

const rateLimitPadrao = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: DEFAULT_RATE_LIMIT,
    standardHeaders: true,
    legacyHeaders: false,
    handler: createRateLimitErrorHandler(DEFAULT_RATE_LIMIT, '15 minutos', 'Muitas requisições deste IP. Tente novamente mais tarde.')
});

const rateLimitAdmin = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: ADMIN_RATE_LIMIT,
    standardHeaders: true,
    legacyHeaders: false,
    handler: createRateLimitErrorHandler(ADMIN_RATE_LIMIT, '15 minutos', 'Limite de requisições excedido para usuários autenticados.')
});

// --- Cadeias de Validação Reutilizáveis ---
const validarQueryPaginacaoETipo = [
    query('pagina')
        .optional()
        .isInt({ min: 1 }).withMessage('Página deve ser um número inteiro positivo.')
        .toInt(),
    query('tipo')
        .optional()
        .trim()
        .toUpperCase()
        // Agora usando a constante derivada do Enum:
        .isIn(TIPOS_SAUDE_VALIDOS_ENUM)
        .withMessage('Tipo de estabelecimento inválido. Valores válidos: ' + TIPOS_SAUDE_VALIDOS_ENUM.join(', ')),
    query('user_lat').optional().isFloat({ min: -90, max: 90 }).withMessage('Latitude do usuário inválida.').toFloat(),
    query('user_long').optional().isFloat({ min: -180, max: 180 }).withMessage('Longitude do usuário inválida.').toFloat()
];

const validarQueryMunicipioNome = [
    query('municipio_nome')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 }).withMessage('Nome do município deve ter entre 3 e 100 caracteres.')
        .toUpperCase()
];

const validarPathCodigoMunicipioIBGE = [
    param('codigo_ibge')
        .isInt({ min: 1000000, max: 9999999 }) // Assumindo códigos IBGE de 7 dígitos
        .withMessage('Código IBGE do município deve ser um número inteiro de 7 dígitos.')
        .toInt()
];

const validarQueryGeolocalizacao = [
    query('lat')
        .exists({ checkFalsy: true }).withMessage('Latitude é obrigatória.')
        .isFloat({ min: -90, max: 90 }).withMessage('Latitude inválida (-90 a 90).')
        .toFloat(),
    query('long')
        .exists({ checkFalsy: true }).withMessage('Longitude é obrigatória.')
        .isFloat({ min: -180, max: 180 }).withMessage('Longitude inválida (-180 a 180).')
        .toFloat(),
    query('raio')
        .optional()
        .isInt({ min: 100, max: 50000 }).withMessage('Raio (em metros) deve ser entre 100 e 50000.')
        .toInt()
];

const router = express.Router();

// --- ROTAS (com seus comentários Swagger) ---
// Mantenha seus comentários Swagger como estavam, apenas certifique-se que
// os `enum` nos parâmetros para 'tipo' reflitam os valores de TIPOS_SAUDE_VALIDOS_ENUM

/**
 * @swagger
 * tags:
 * name: Saúde
 * description: Endpoints para consulta de estabelecimentos de saúde
 */

// Lista estabelecimentos por NOME do município (query param) ou todos do MA
/**
 * @swagger
 * /saude:
 * get:
 * summary: Lista estabelecimentos de saúde (por nome de município ou todos do MA)
 * tags: [Saúde]
 * parameters:
 * - name: municipio_nome
 * in: query
 * # ... (resto do seu swagger param)
 * - name: tipo
 * in: query
 * schema:
 * type: string
 * enum: [HOSPITAL, UPA, UBS, PS, CENTRO_SAUDE, FARMACIA_POPULAR, LABORATORIO, POLICLINICA] # Atualize com seus enums
 * # ... (resto dos seus swagger params e responses)
 */
router.get(
    '/',
    rateLimitPadrao,
    ...validarQueryMunicipioNome,
    ...validarQueryPaginacaoETipo,
    checkValidationResult,
    listarEstabelecimentosSaude
);

// Lista estabelecimentos por CÓDIGO IBGE do município (path param)
/**
 * @swagger
 * /saude/codigo/{codigo_ibge}:
 * get:
 * summary: Lista estabelecimentos de saúde por código IBGE do município
 * tags: [Saúde]
 * # ... (seus swagger params e responses)
 */
router.get(
    '/codigo/:codigo_ibge',
    rateLimitPadrao,
    ...validarPathCodigoMunicipioIBGE,
    ...validarQueryPaginacaoETipo,
    checkValidationResult,
    listarEstabelecimentosSaude
);

// Busca estabelecimentos próximos
/**
 * @swagger
 * /saude/proximos:
 * get:
 * summary: Busca estabelecimentos próximos a uma localização geográfica
 * tags: [Saúde]
 * # ... (seus swagger params e responses)
 */
router.get(
    '/proximos',
    rateLimitPadrao,
    ...validarQueryGeolocalizacao,
    query('tipo') // Validação de tipo específica para esta rota
        .optional()
        .trim()
        .toUpperCase()
        .isIn(TIPOS_SAUDE_VALIDOS_ENUM) // <<< Usando a constante definida
        .withMessage('Tipo de estabelecimento inválido para busca por proximidade. Valores válidos: ' + TIPOS_SAUDE_VALIDOS_ENUM.join(', ')),
    checkValidationResult,
    listarProximos
);

// Lista tipos de estabelecimentos
/**
 * @swagger
 * /saude/tipos:
 * get:
 * summary: Lista os tipos de estabelecimentos de saúde disponíveis
 * tags: [Saúde]
 * # ... (seus swagger responses)
 */
router.get(
    '/tipos',
    rateLimitPadrao,
    listarTiposEstabelecimentos
);

// --- ROTAS ADMINISTRATIVAS ---
/**
 * @swagger
 * /saude/admin/estabelecimentos:
 * get:
 * # ... (seu swagger)
 */
router.get(
    '/admin/estabelecimentos',
    validarTokenGoverno,
    rateLimitAdmin,
    ...validarQueryMunicipioNome,
    ...validarQueryPaginacaoETipo,
    checkValidationResult,
    listarEstabelecimentosSaude
);

/**
 * @swagger
 * /saude/admin/atualizar:
 * post:
 * # ... (seu swagger)
 */
router.post(
    '/admin/atualizar',
    validarTokenGoverno,
    rateLimitAdmin,
    atualizarDadosSaude
);

export default router;