import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import apiRoutes from './routes/index.js';
import { Organizacao, Metadata } from './components/schemas.js';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Configuração de ambiente
dotenv.config();

const app = express();

// 1. Configuração de Segurança
app.use(helmet());
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'OPTIONS']
}));

// 2. Middlewares Básicos
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// 3. Rate Limiting (DDoS Protection)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
    success: false,
    error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Muitas requisições deste IP. Tente novamente mais tarde.'
    }
    }
});

// 4. Configuração Swagger/OpenAPI
const swaggerOptions = {
    definition: {
    openapi: '3.0.0',
    info: {
        title: 'API Serviços Públicos GovBr',
        version: '1.0.0',
        description: 'Integração profissional com a API de dados abertos do governo brasileiro',
        contact: {
        name: 'Equipe de Suporte',
        email: 'suporte@seusistema.com'
        }
    },
    servers: [
        {
        url: `http://localhost:${process.env.PORT || 3000}/api`,
        description: 'Servidor Local'
        },
        {
        url: 'https://api.seusistema.com/v1',
        description: 'Servidor de Produção'
        }
    ],
    components: {
        schemas: { Organizacao, Metadata },
        securitySchemes: {
        ApiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'chave-api-dados-abertos'
        }
        }
    },
    security: [{
        ApiKeyAuth: []
    }]
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// 5. Rotas Documentadas
app.use('/api-docs', 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: 'Documentação API GovBr'
    })
);

// 6. Aplicação de Rate Limit apenas nas rotas da API
app.use('/api', apiLimiter, apiRoutes);

// 7. Rota Raiz (Health Check)
app.get('/', (req, res) => {
    res.status(200).json({
    status: 'operacional',
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV || 'development',
    documentation: '/api-docs'
    });
});

// 8. Tratamento de Erros Avançado
app.use((req, res, next) => {
    res.status(404).json({
    success: false,
    error: {
        code: 'ROUTE_NOT_FOUND',
        message: 'Endpoint não disponível',
        suggestedRoutes: [
        '/api/servicos-publicos',
        '/api/organizacoes',
        '/api-docs'
        ]
    }
    });
});

app.use((err, req, res, next) => {
    console.error('⚠️ Erro não tratado:', {
    error: err.stack,
    request: {
        method: req.method,
        url: req.originalUrl,
        params: req.params,
        query: req.query
    }
    });

    res.status(err.status || 500).json({
    success: false,
    error: {
        code: err.code || 'INTERNAL_ERROR',
        message: process.env.NODE_ENV === 'production' 
        ? 'Erro interno no servidor' 
        : err.message,
        ...(process.env.NODE_ENV !== 'production' && {
        stack: err.stack
        })
    }
    });
});

// 9. Inicialização do Servidor
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📄 Documentação disponível em http://localhost:${PORT}/api-docs`);
});

// 10. Tratamento de encerramento gracioso
process.on('SIGTERM', () => {
    console.log('🛑 Recebido SIGTERM. Encerrando servidor...');
    server.close(() => {
    console.log('🔴 Servidor encerrado');
    process.exit(0);
    });
});

process.on('unhandledRejection', (err) => {
    console.error('⚠️ Rejeição não tratada:', err);
    server.close(() => process.exit(1));
});