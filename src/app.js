// src/app.js
import express from 'express';
import cors from 'cors'; // Importando o pacote cors diretamente
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import apiRoutes from './routes/index.js'; // Agregador de rotas
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimiter from './config/rateLimit.config.js'; // Rate limiter
import errorHandler from './middlewares/errorHandler.js'; 
import { logger, stream } from './utils/logger.js'; // Logger e stream para Morgan
import { connectMongoose, checkDatabaseHealth } from './config/database.js';
import autenticacaoRoutes from './auth/auth.routes.js';
import connectRedis from './config/redis.js'; // Conexão com Redis

// 1.Inicial
dotenv.config();
const app = express();

// 2. Constantes de configuração
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';
const BASE_PATH = `/api/${API_VERSION}`;

// 3. Definição das categorias de API (do seu original)
const API_CATEGORIES = [
    { name: 'Saúde', path: 'saude', description: 'Estabelecimentos de saúde e serviços médicos' },
    { name: 'Educação', path: 'educacao', description: 'Escolas e instituições educacionais' },
    { name: 'Cultura', path: 'cultura', description: 'Eventos e espaços culturais' },
    { name: 'Serviços Públicos', path: 'servicos-publicos', description: 'Serviços governamentais' }
];

// 4. Middlewares de segurança e configuração
app.use(helmet({ // Sua configuração do helmet
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net', 'unpkg.com'],
            styleSrc: ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net', 'unpkg.com'],
            imgSrc: ["'self'", "data:", 'validator.swagger.io'] 
        }
    },
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Configuração do CORS 
const corsOptions = {
  origin: ['http://127.0.0.1:5501', 'http://localhost:5501', `http://localhost:${PORT}`], 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 5. Logging HTTP com Morgan e Winston
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    '-',
    tokens['response-time'](req, res), 'ms',
    '-',
    req.ip, //Req.ip para simplicidade
    req.headers['user-agent']
  ].join(' ');
}, { stream: stream }));

// 6. Configuração do Swagger 
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Governo Integrado - Acesso Fácil Maranhão',
      version: process.env.npm_package_version || '1.0.0',
      description: 'Integração unificada dos sistemas públicos para acesso a serviços essenciais do estado do Maranhão.',
      contact: {
        name: "Suporte Técnico - Desafio 4 Inova Maranhão",
        email: "suporte.desafio4@governo.ma.example.com"
      },
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}${BASE_PATH}`,
        description: "Servidor de Desenvolvimento Local"
      },
      {
        url: "https://api.governo.digital/{basePath}", //Produção
        description: "Servidor de Produção",
        variables: {
          basePath: {
            default: BASE_PATH
          }
        }
      }
    ],
    tags: API_CATEGORIES.map(category => ({
      name: category.name,
      description: category.description
    })),
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
    
  },
  apis: [ // Caminhos para seus arquivos de rotas com anotações JSDoc para Swagger
    './src/routes/*.js', // Pega o index.js das rotas
    './src/routes/saude.routes.js',
    './src/routes/educacao.routes.js', 
    './src/routes/cultura.routes.js',   
    './src/routes/servicos-publicos.routes.js', 
    './src/auth/auth.routes.js' 
  ]
};

try {
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: "Documentação API - Acesso Fácil MA"
    }));
} catch (e) {
    logger.error('Erro ao configurar o Swagger com swagger-jsdoc:', e);
}

// 7. Rotas de Autenticação
app.use(`${BASE_PATH}/auth`, autenticacaoRoutes);

// 8. Health Check 
app.get(`${BASE_PATH}/health`, async (req, res) => {
  try {
    const dbStatus = await checkDatabaseHealth();
    // const redisStatus = await checkRedisHealth(); // Descomente se tiver checkRedisHealth
    
    let overallStatus = 'operacional';
    if (dbStatus.status !== 'connected' /* || (redisClient && !redisClient.isOpen) */) { // Ajuste para checar status do Redis
        overallStatus = 'degradado';
    }
    
    res.json({
      status: overallStatus,
      version: process.env.npm_package_version || '1.0.0',
      timestamp: new Date().toISOString(),
      dependencies: {
          database: dbStatus,
          
      },
      categories: API_CATEGORIES.map(category => ({
        name: category.name,
        path: `${BASE_PATH}/${category.path}`,
        status: 'operacional' 
      })),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    logger.error(`[HEALTH_CHECK] Erro: ${error.message}`);
    res.status(503).json({
      status: 'indisponivel',
      error: 'Serviço ou uma de suas dependências críticas está indisponível.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 9. Rotas principais da API (com rate limit)

app.use(BASE_PATH, rateLimiter, apiRoutes); 

// 10. Middleware de erro 
app.use(errorHandler); 

// 11. Inicialização do servidor 
const startServer = async () => {
  try {
    await connectMongoose(); 
    // O log de conexão com MongoDB já deve estar em connectMongoose()

    if (connectRedis && typeof connectRedis === 'function') {
        await connectRedis(); // O log de conexão com Redis já deve estar em connectRedis()
    }

    const server = app.listen(PORT, () => {
      logger.info(`🚀 Servidor rodando na porta ${PORT}`);
      logger.info(`🔗 Acesso base: ${BASE_PATH}`);
      logger.info('📚 APIs disponíveis:');
      API_CATEGORIES.forEach(category => {
        logger.info(`- ${category.name}: ${BASE_PATH}/${category.path}`);
      });
      logger.info(`🔐 Autenticação: ${BASE_PATH}/auth`);
      logger.info(`📄 Documentação: http://localhost:${PORT}/api-docs`);
    });

    const shutdown = (signal) => {
      logger.info(`Recebido ${signal}. Encerrando servidor...`);
      server.close(async () => { 
        logger.info('Servidor HTTP encerrado.');
        try {

            if (redisClient && typeof redisClient.quit === 'function') { // Se você exporta o cliente Redis
                await redisClient.quit();
                logger.info('Conexão Redis fechada.');
            } else if (redisClient && typeof redisClient.disconnect === 'function') {
                await redisClient.disconnect(); // Algumas libs usam disconnect
                logger.info('Conexão Redis desconectada.');
            }
        } catch (err) {
            logger.error('Erro ao fechar conexões durante o shutdown:', err);
        } finally {
            logger.info('Processo encerrado.');
            process.exit(0);
        }
      });
      // Forçar o encerramento após um timeout se o servidor não fechar graciosamente
      setTimeout(() => {
        logger.error('Desligamento forçado após timeout.');
        process.exit(1);
      }, 10000).unref(); // 10 segundos de timeout
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT')); // Captura Ctrl+C

  } catch (error) {
    logger.error('Falha crítica na inicialização do servidor:', {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
};

startServer();

export default app;