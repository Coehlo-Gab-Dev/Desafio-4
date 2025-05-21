import express from 'express';
import cors from './config/cors.config.js';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import apiRoutes from './routes/index.js';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimiter from './config/rateLimit.config.js';
import errorHandler from './middlewares/errorHandler.js';
import { logger } from './utils/logger.js';
import { connectMongoose, checkDatabaseHealth } from './config/database.js';

// Configuração inicial
dotenv.config();
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';
const BASE_PATH = `/api/${API_VERSION}`;

// Definição das categorias de API
const API_CATEGORIES = [
  {
    name: 'Saúde',
    path: 'saude',
    description: 'Estabelecimentos de saúde e serviços médicos'
  },
  {
    name: 'Educação',
    path: 'educacao',
    description: 'Escolas e instituições educacionais'
  },
  {
    name: 'Cultura',
    path: 'cultura',
    description: 'Eventos e espaços culturais'
  },
  {
    name: 'Serviços Públicos',
    path: 'servicos-publicos',
    description: 'Serviços governamentais'
  }
];

// Conexão com o banco de dados com tratamento aprimorado
const initializeDatabase = async () => {
  try {
    await connectMongoose();
    logger.info('✔ Conexão com MongoDB estabelecida para todas as APIs');
    
    // Verificação adicional de índices para saúde
    if (process.env.ENABLE_INDEX_CHECK === 'true') {
      await checkHealthIndexes();
    }
  } catch (err) {
    logger.error('✖ Falha crítica na conexão com MongoDB:', {
      error: err.message,
      stack: err.stack
    });
    process.exit(1);
  }
};

// Verificação de índices específicos para saúde
const checkHealthIndexes = async () => {
  try {
    // Implementação específica para verificar índices do modelo de saúde
    logger.info('Verificando índices do modelo de saúde...');
    // Adicione aqui verificações específicas se necessário
  } catch (error) {
    logger.warn('Aviso na verificação de índices:', error.message);
  }
};

// Configuração do Express
const app = express();

// Configurações de Segurança Aprimoradas
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
      styleSrc: ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net']
    }
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors);

// Middlewares Aprimorados
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging personalizado
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    '-',
    tokens['response-time'](req, res), 'ms',
    '-',
    req.ip,
    '-',
    req.headers['user-agent']
  ].join(' ');
}, { stream: { write: msg => logger.http(msg.trim()) } }));

// Configuração do Swagger com componentes reutilizáveis
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Governo Integrado',
      version: '1.0.0',
      description: 'Integração unificada dos sistemas públicos',
      contact: {
        name: "Suporte Técnico",
        email: "suporte@governo.api"
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}${BASE_PATH}`,
        description: "Servidor de Desenvolvimento"
      },
      {
        url: "https://api.governo.digital/{basePath}",
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
  apis: [
    './routes/*.js',
    './routes/saude/*.js',
    './routes/educacao/*.js',
    './routes/cultura/*.js',
    './routes/servicos-publicos/*.js'
  ]
};

// Documentação Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check Aprimorado
app.get(`${BASE_PATH}/health`, async (req, res) => {
  try {
    const dbStatus = await checkDatabaseHealth();
    const status = dbStatus.status === 'connected' ? 'operacional' : 'degraded';
    
    res.json({
      status,
      version: process.env.npm_package_version || '1.0.0',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      categories: API_CATEGORIES.map(category => ({
        name: category.name,
        path: `${BASE_PATH}/${category.path}`,
        status: 'operational'
      })),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(503).json({
      status: 'offline',
      error: 'Serviço indisponível',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Rotas principais
app.use(BASE_PATH, rateLimiter, apiRoutes);

// Middleware de erro aprimorado
app.use(errorHandler);

// Inicialização do servidor
const startServer = async () => {
  await initializeDatabase();
  
  const server = app.listen(PORT, () => {
    logger.info(`🚀 Servidor rodando na porta ${PORT}`);
    logger.info(`🔗 Acesso base: ${BASE_PATH}`);
    logger.info('📚 APIs disponíveis:');
    API_CATEGORIES.forEach(category => {
      logger.info(`- ${category.name}: ${BASE_PATH}/${category.path}`);
    });
    logger.info(`📄 Documentação: http://localhost:${PORT}/api-docs`);
  });

  // Tratamento de encerramento gracioso
  process.on('SIGTERM', () => {
    logger.info('Recebido SIGTERM. Encerrando servidor...');
    server.close(() => {
      logger.info('Servidor encerrado');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    logger.info('Recebido SIGINT. Encerrando servidor...');
    server.close(() => {
      logger.info('Servidor encerrado');
      process.exit(0);
    });
  });

  return server;
};

// Inicialização
startServer().catch(error => {
  logger.error('Falha crítica na inicialização:', {
    error: error.message,
    stack: error.stack
  });
  process.exit(1);
});

export default app;