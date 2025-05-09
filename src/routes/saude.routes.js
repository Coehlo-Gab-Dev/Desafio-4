import express from 'express';
import { 
  listarEstabelecimentosSaude, 
  obterEstabelecimentoPorId 
} from '../controllers/saude.controller.js';
import { 
  validarConsultaEstabelecimentos as validarParametrosConsulta,
  validarIdCnes as validarIdEstabelecimento
} from '../middlewares/validation.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Configuração de rate limiting específica para saúde
const healthRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.ip === '::1',
  message: {
    sucesso: false,
    erro: {
      codigo: 'TOO_MANY_REQUESTS',
      mensagem: 'Limite de requisições excedido para serviços de saúde. Tente novamente mais tarde.'
    }
  }
});

/**
 * @swagger
 * tags:
 *   name: Saúde
 *   description: Endpoints para gestão de estabelecimentos de saúde
 */

/**
 * @swagger
 * /saude/estabelecimentos:
 *   get:
 *     summary: Lista estabelecimentos de saúde
 *     description: |
 *       Retorna estabelecimentos filtrados com paginação.
 *       Dados podem vir da API CNES, banco local ou mock (fallback).
 *     tags: [Saúde]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página (10 itens por página)
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [UPA, HOSPITAL, PRONTO SOCORRO, UBS, PS]
 *           example: "UPA"
 *         description: Tipo de unidade de saúde
 *       - in: query
 *         name: municipio
 *         schema:
 *           type: string
 *           example: "São Paulo"
 *         description: Filtro por município (case insensitive)
 *       - in: query
 *         name: uf
 *         schema:
 *           type: string
 *           maxLength: 2
 *           minLength: 2
 *           example: "SP"
 *         description: Filtro por UF (2 caracteres maiúsculos)
 *     responses:
 *       200:
 *         description: Lista de estabelecimentos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListaEstabelecimentos'
 *       206:
 *         description: Dados mockados (serviço principal indisponível)
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroValidacao'
 *       429:
 *         description: Muitas requisições
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
  '/estabelecimentos',
  healthRateLimiter,
  validarParametrosConsulta,
  listarEstabelecimentosSaude
);

/**
 * @swagger
 * /saude/estabelecimentos/{id}:
 *   get:
 *     summary: Obtém detalhes de um estabelecimento
 *     description: Retorna informações completas de um estabelecimento específico pelo ID CNES
 *     tags: [Saúde]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{7}$'
 *           example: "1234567"
 *         description: ID CNES do estabelecimento (7 dígitos)
 *     responses:
 *       200:
 *         description: Detalhes do estabelecimento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EstabelecimentoDetalhado'
 *       404:
 *         description: Estabelecimento não encontrado
 *       429:
 *         description: Muitas requisições
 *       500:
 *         description: Erro interno do servidor
 */

router.get(
  '/estabelecimentos/:id',
  healthRateLimiter,
  validarIdEstabelecimento,
  obterEstabelecimentoPorId
);


export default router;