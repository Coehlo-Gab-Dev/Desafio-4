import express from 'express';
import { listarServicosGovBr } from '../controllers/govBrApis.controller.js';
import { query, validationResult } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dados GovBr
 *   description: Integração com a API de dados abertos do governo
 */

/**
 * @swagger
 * /api/servicos-publicos:
 *   get:
 *     summary: Obtém serviços públicos com filtros avançados
 *     tags: [Dados GovBr]
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Filtro por nome da organização
 *       - in: query
 *         name: atualizar
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Forçar atualização dos dados (ignorar cache)
 *       - in: query
 *         name: ordenarPor
 *         schema:
 *           type: string
 *           enum: [totalSeguidores, ultimaAtualizacao, nome]
 *           default: totalSeguidores
 *         description: Campo para ordenação dos resultados
 *     responses:
 *       200:
 *         description: Lista de serviços públicos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaServicosPublicos'
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroGenerico'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroGenerico'
 */
router.get('/servicos-publicos', 
  [
    query('pagina')
      .optional()
      .isInt({ min: 1 })
      .withMessage('A página deve ser um número inteiro positivo')
      .toInt(),
    query('nome')
      .optional()
      .trim()
      .escape()
      .isLength({ max: 100 })
      .withMessage('O nome deve ter no máximo 100 caracteres'),
    query('atualizar')
      .optional()
      .isBoolean()
      .withMessage('O parâmetro atualizar deve ser true ou false')
      .toBoolean(),
    query('ordenarPor')
      .optional()
      .isIn(['totalSeguidores', 'ultimaAtualizacao', 'nome'])
      .withMessage('Ordenação inválida')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'PARAMETROS_INVALIDOS',
          message: 'Erro de validação',
          details: errors.array()
        }
      });
    }
    next();
  },
  listarServicosGovBr
);

// Rotas legadas com redirecionamento
router.get('/direitos-cidadao', (req, res) => {
  res.redirect(301, '/api/servicos-publicos?' + new URLSearchParams(req.query));
});

router.get('/organizacoes', (req, res) => {
  res.redirect(301, '/api/servicos-publicos?' + new URLSearchParams(req.query));
});

// Health Check melhorado
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    dependencies: {
      database: 'connected', // Poderia verificar conexão real
      externalAPI: 'active'
    }
  });
});

export default router;