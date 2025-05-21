import express from 'express';
import { logger } from '../utils/logger.js';
import { checkDatabaseHealth } from '../config/database.js';
import { responderErro } from '../middlewares/errorHandler.js';

// Importando TODOS os routers das 4 categorias
import saudeRouter from './saude.routes.js';          // Rotas completas de saúde
import educacaoRouter from './educacao.routes.js';    // Rotas completas de educação
import culturaRouter from './cultura.routes.js';      // Rotas completas de cultura
import servicosPublicosRouter from './servicosPublicos.routes.js'; // Rotas completas de serviços públicos

const router = express.Router();

// Configuração das categorias
const API_CATEGORIES = {
  SAUDE: {
    path: 'saude',
    router: saudeRouter,
    name: 'Serviços de Saúde',
    description: 'Hospitais, UBS, farmácias e estabelecimentos de saúde'
  },
  EDUCACAO: {
    path: 'educacao',
    router: educacaoRouter,
    name: 'Serviços Educacionais',
    description: 'Escolas, universidades e instituições de ensino'
  },
  CULTURA: {
    path: 'cultura',
    router: culturaRouter,
    name: 'Serviços Culturais',
    description: 'Museus, teatros, cinemas e eventos culturais'
  },
  SERVICOS_PUBLICOS: {
    path: 'servicos-publicos',
    router: servicosPublicosRouter,
    name: 'Serviços Públicos',
    description: 'Órgãos públicos, prefeituras e serviços municipais'
  }
};

// Middleware de Log para todas as APIs
router.use((req, res, next) => {
  const startTime = process.hrtime();
  const apiCategory = req.path.split('/')[2];
  
  logger.info(`Requisição recebida`, {
    method: req.method,
    path: req.originalUrl,
    category: apiCategory || 'global',
    ip: req.ip
  });

  req.startTime = startTime;
  next();
});

// Rotas INDIVIDUAIS de cada categoria (mantidas conforme seus respectivos arquivos)
router.use(`/${API_CATEGORIES.SAUDE.path}`, API_CATEGORIES.SAUDE.router);
router.use(`/${API_CATEGORIES.EDUCACAO.path}`, API_CATEGORIES.EDUCACAO.router);
router.use(`/${API_CATEGORIES.CULTURA.path}`, API_CATEGORIES.CULTURA.router);
router.use(`/${API_CATEGORIES.SERVICOS_PUBLICOS.path}`, API_CATEGORIES.SERVICOS_PUBLICOS.router);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check Global
 *     description: Verifica o status de todas as APIs
 *     tags: [Monitoramento]
 *     responses:
 *       200:
 *         description: Status geral das APIs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 apis:
 *                   type: object
 *                   properties:
 *                     saude:
 *                       $ref: '#/components/schemas/ApiHealthStatus'
 *                     educacao:
 *                       $ref: '#/components/schemas/ApiHealthStatus'
 *                     cultura:
 *                       $ref: '#/components/schemas/ApiHealthStatus'
 *                     servicos-publicos:
 *                       $ref: '#/components/schemas/ApiHealthStatus'
 */
router.get('/health', async (req, res) => {
  try {
    const healthChecks = await Promise.all(
      Object.values(API_CATEGORIES).map(async (category) => {
        try {
          const dbStatus = await checkDatabaseHealth();
          return {
            [category.path]: {
              status: 'online',
              database: dbStatus.status,
              timestamp: new Date().toISOString()
            }
          };
        } catch (error) {
          return {
            [category.path]: {
              status: 'offline',
              error: error.message
            }
          };
        }
      })
    );

    const statusGeral = healthChecks.every(h => Object.values(h)[0].status === 'online') 
      ? 'online' 
      : 'degraded';

    res.json({
      status: statusGeral,
      apis: Object.assign({}, ...healthChecks)
    });
  } catch (error) {
    responderErro(res, 503, {
      codigo: 'HEALTH_CHECK_FAILED',
      mensagem: 'Falha ao verificar saúde das APIs'
    });
  }
});

/**
 * @swagger
 * /{category}/health:
 *   get:
 *     summary: Health Check por Categoria
 *     description: Verifica o status de uma API específica
 *     tags: [Monitoramento]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [saude, educacao, cultura, servicos-publicos]
 *     responses:
 *       200:
 *         description: Status da API específica
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiHealthStatus'
 *       404:
 *         description: Categoria não encontrada
 */
router.get('/:category/health', async (req, res) => {
  const { category } = req.params;
  const categoryConfig = Object.values(API_CATEGORIES).find(c => c.path === category);

  if (!categoryConfig) {
    return responderErro(res, 404, {
      codigo: 'CATEGORIA_NAO_ENCONTRADA',
      mensagem: 'Categoria de API não encontrada',
      categorias_disponiveis: Object.values(API_CATEGORIES).map(c => c.path)
    });
  }

  try {
    const dbStatus = await checkDatabaseHealth();
    
    // Adiciona verificações específicas para saúde
    let statusExtra = {};
    if (category === 'saude') {
      statusExtra.ultimaAtualizacao = await getUltimaAtualizacaoSaude();
      statusExtra.totalEstabelecimentos = await getTotalEstabelecimentosSaude();
    }

    res.json({
      api: categoryConfig.name,
      status: 'online',
      database: dbStatus.status,
      timestamp: new Date().toISOString(),
      ...statusExtra
    });
  } catch (error) {
    logger.error(`Falha no health check da API ${category}:`, error);
    responderErro(res, 503, {
      codigo: 'SERVICO_INDISPONIVEL',
      mensagem: `Falha ao verificar saúde da API ${categoryConfig.name}`
    });
  }
});

// Funções auxiliares específicas para saúde
async function getUltimaAtualizacaoSaude() {
  // Implementação real deve consultar seu banco de dados
  return new Date().toISOString();
}

async function getTotalEstabelecimentosSaude() {
  // Implementação real deve contar os registros no banco
  return 0; // Substituir pela implementação real
}

export default router;