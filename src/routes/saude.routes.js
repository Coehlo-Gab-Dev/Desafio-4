import express from 'express';
import { 
  listarEstabelecimentosSaude,
  atualizarDadosSaude,
  listarTiposEstabelecimentos,
  listarProximos
} from '../controllers/saude.controller.js';
import { validarTokenGoverno } from '../middlewares/tokenValidator.middleware.js';
import { query } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { validarParametros, responderErro } from '../middlewares/errorHandler.js';

const router = express.Router();

// Constantes para configuração
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const DEFAULT_RATE_LIMIT = 150;
const ADMIN_RATE_LIMIT = 300;

// Configurações de Rate Limit
const rateLimitPadrao = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: DEFAULT_RATE_LIMIT,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    responderErro(res, 429, {
      codigo: 'LIMITE_REQUISICOES',
      mensagem: 'Muitas requisições deste IP. Tente novamente mais tarde.',
      detalhes: {
        limite: DEFAULT_RATE_LIMIT,
        window: '15 minutos'
      }
    });
  }
});

const rateLimitAdmin = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: ADMIN_RATE_LIMIT,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    responderErro(res, 429, {
      codigo: 'LIMITE_REQUISICOES',
      mensagem: 'Limite de requisições excedido para usuários autenticados',
      detalhes: {
        limite: ADMIN_RATE_LIMIT,
        window: '15 minutos'
      }
    });
  }
});

// Validações
const validarConsultaSaude = [
  query('pagina')
    .optional()
    .isInt({ min: 1 }).withMessage('Página deve ser um número inteiro positivo')
    .toInt(),
  query('tipo')
    .optional()
    .trim()
    .isIn(['HOSPITAL', 'UPA', 'UBS', 'PS', 'CENTRO_SAUDE', 'FARMACIA_POPULAR'])
    .withMessage('Tipo de estabelecimento inválido'),
  query('municipio')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Município deve ter entre 3 e 100 caracteres')
    .customSanitizer(value => value.toUpperCase())
];

const validarGeolocalizacao = [
  query('lat')
    .exists().withMessage('Latitude é obrigatória')
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude inválida (-90 a 90)')
    .toFloat(),
  query('long')
    .exists().withMessage('Longitude é obrigatória')
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude inválida (-180 a 180)')
    .toFloat(),
  query('raio')
    .optional()
    .isInt({ min: 100, max: 50000 }).withMessage('Raio deve ser entre 100 e 50000 metros')
    .toInt()
];

/**
 * @swagger
 * tags:
 *   name: Saúde
 *   description: Endpoints para gestão de estabelecimentos de saúde
 */

/**
 * @swagger
 * /saude:
 *   get:
 *     summary: Lista estabelecimentos de saúde com filtros
 *     tags: [Saúde]
 *     parameters:
 *       - $ref: '#/components/parameters/municipio'
 *       - $ref: '#/components/parameters/tipo'
 *       - $ref: '#/components/parameters/pagina'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ListaEstabelecimentos'
 *       400:
 *         $ref: '#/components/responses/ErroValidacao'
 *       429:
 *         $ref: '#/components/responses/LimiteRequisicoes'
 *       500:
 *         $ref: '#/components/responses/ErroInterno'
 */
router.get(
  '/',
  rateLimitPadrao,
  validarConsultaSaude,
  validarParametros,
  listarEstabelecimentosSaude
);

/**
 * @swagger
 * /saude/proximos:
 *   get:
 *     summary: Busca estabelecimentos próximos a uma localização
 *     tags: [Saúde]
 *     parameters:
 *       - $ref: '#/components/parameters/latitude'
 *       - $ref: '#/components/parameters/longitude'
 *       - $ref: '#/components/parameters/raio'
 *       - $ref: '#/components/parameters/tipo'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ListaEstabelecimentos'
 *       400:
 *         $ref: '#/components/responses/ErroGeolocalizacao'
 *       429:
 *         $ref: '#/components/responses/LimiteRequisicoes'
 *       500:
 *         $ref: '#/components/responses/ErroInterno'
 */
router.get(
  '/proximos',
  rateLimitPadrao,
  validarGeolocalizacao,
  validarParametros,
  listarProximos
);

/**
 * @swagger
 * /saude/estabelecimentos:
 *   get:
 *     summary: Lista estabelecimentos (rota compatibilidade)
 *     tags: [Saúde]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/municipio'
 *       - $ref: '#/components/parameters/tipo'
 *       - $ref: '#/components/parameters/pagina'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ListaEstabelecimentos'
 *       401:
 *         $ref: '#/components/responses/NaoAutorizado'
 *       429:
 *         $ref: '#/components/responses/LimiteRequisicoesAdmin'
 */
router.get(
  '/estabelecimentos',
  validarTokenGoverno,
  rateLimitAdmin,
  validarConsultaSaude,
  validarParametros,
  listarEstabelecimentosSaude
);

/**
 * @swagger
 * /saude/atualizar:
 *   post:
 *     summary: Força atualização dos dados de saúde
 *     tags: [Saúde]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/AtualizacaoSucesso'
 *       401:
 *         $ref: '#/components/responses/NaoAutorizado'
 *       429:
 *         $ref: '#/components/responses/LimiteRequisicoesAdmin'
 *       500:
 *         $ref: '#/components/responses/ErroAtualizacao'
 */
router.post(
  '/atualizar',
  validarTokenGoverno,
  rateLimitAdmin,
  atualizarDadosSaude
);

/**
 * @swagger
 * /saude/tipos:
 *   get:
 *     summary: Lista tipos de estabelecimentos disponíveis
 *     tags: [Saúde]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ListaTipos'
 *       429:
 *         $ref: '#/components/responses/LimiteRequisicoes'
 *       500:
 *         $ref: '#/components/responses/ErroInterno'
 */
router.get(
  '/tipos',
  rateLimitPadrao,
  listarTiposEstabelecimentos
);

export default router;