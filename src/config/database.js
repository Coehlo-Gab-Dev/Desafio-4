import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

// Configuração otimizada para múltiplas APIs
const MONGO_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 50,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  retryReads: true
};

// Conexão compartilhada para todas as APIs
export async function connectMongoose() {
  if (mongoose.connection.readyState === 1) {
    logger.info('Reutilizando conexão existente com MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, MONGO_CONFIG);
    logger.info('✔ Conexão estabelecida com MongoDB para todas as APIs');
    
    mongoose.connection.on('error', (err) => {
      logger.error(`Erro de conexão MongoDB: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('Conexão com MongoDB perdida');
    });
  } catch (error) {
    logger.error('✖ Falha crítica na conexão com MongoDB:', error);
    process.exit(1);
  }
}

// Health Check unificado para todas as APIs
export async function checkDatabaseHealth() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000
  });

  try {
    await client.connect();
    await client.db().admin().ping();
    return { 
      status: 'healthy',
      apis_suportadas: ['saude', 'educacao', 'cultura', 'servicos-publicos']
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      apis_afetadas: ['saude', 'educacao', 'cultura', 'servicos-publicos']
    };
  } finally {
    await client.close();
  }
}

// Obter instância do banco para uma API específica
export async function getDatabase(apiName) {
  const validApis = ['saude', 'educacao', 'cultura', 'servicos-publicos'];
  if (!validApis.includes(apiName)) {
    throw new Error(`API ${apiName} não é válida`);
  }

  const client = new MongoClient(process.env.MONGODB_URI, MONGO_CONFIG);
  await client.connect();
  return client.db(`gov_${apiName}`);
}