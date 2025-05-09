import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { logger } from '../utils/logger.js';

dotenv.config();

// Dados mockados de emergência
const MOCK_DATA = [
  {
    nome: "Ministério da Saúde",
    esfera: "federal",
    totalSeguidores: 2500,
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    nome: "Secretaria Municipal de Educação",
    esfera: "municipal",
    totalSeguidores: 1200,
    ultimaAtualizacao: new Date().toISOString()
  }
];

const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' }
  ]
});

prisma.$on('warn', (e) => logger.warn('Prisma Warning:', e.message));
prisma.$on('error', (e) => logger.error('Prisma Error:', e.message));

const API_CONFIG = {
  baseURL: process.env.GOVBR_API_BASE_URL || 'https://dados.gov.br/api',
  timeout: parseInt(process.env.API_TIMEOUT) || 15000, // 15 segundos
  headers: {
    'Authorization': `Bearer ${process.env.GOVBR_API_TOKEN}`,
    'Accept': 'application/json',
    'X-Request-ID': generateRequestId()
  },
  maxRedirects: 0,
  validateStatus: (status) => status < 500 // Aceita todos os status < 500
};

export async function getServicosPublicos(pagina = 1, nome = '') {
  const requestId = generateRequestId();
  const startTime = Date.now();
  
  try {
    logger.info(`[${requestId}] Iniciando requisição`, { pagina, nome });

    // 1. Tenta buscar do banco de dados primeiro
    const localData = await getLocalData(pagina, nome);
    if (shouldReturnLocalData(localData)) {
      logger.info(`[${requestId}] Retornando dados locais`);
      return formatResponse(localData, false, requestId, startTime);
    }

    // 2. Busca da API externa com tratamento de erro
    logger.info(`[${requestId}] Buscando dados da API externa`);
    const apiData = await fetchApiData(pagina, nome, requestId);
    
    if (!apiData) {
      throw new Error('API externa não retornou dados válidos');
    }

    // 3. Processamento e armazenamento
    const processedData = processApiData(apiData);
    await storeData(processedData, requestId);

    // 4. Retorna dados atualizados
    const finalData = await getLocalData(pagina, nome);
    return formatResponse(finalData, true, requestId, startTime);

  } catch (error) {
    logger.error(`[${requestId}] Falha na requisição`, {
      error: error.message,
      stack: error.stack
    });
    
    return await handleFallback(pagina, nome, requestId, error, startTime);
  } finally {
    await safeDisconnect();
  }
}

// Funções auxiliares
async function getLocalData(pagina, nome) {
  try {
    return await prisma.orgaoPublico.findMany({
      where: { 
        nome: { contains: nome, mode: 'insensitive' } 
      },
      skip: (pagina - 1) * 10,
      take: 10,
      orderBy: { ultimaAtualizacao: 'desc' }
    });
  } catch (error) {
    logger.error('Erro ao buscar dados locais:', error);
    return [];
  }
}

function shouldReturnLocalData(localData) {
  return localData && localData.length > 0;
}

async function fetchApiData(pagina, nome, requestId) {
  try {
    const response = await axios.get('/organizacao', {
      ...API_CONFIG,
      params: {
        pagina,
        nome,
        itensPorPagina: 10,
        _cache: Date.now() // Evita cache
      },
      timeout: API_CONFIG.timeout
    });

    return response.data?.data || response.data; // Compatível com diferentes formatos de resposta
  } catch (error) {
    logger.warn(`[${requestId}] Falha na API externa`, {
      status: error.response?.status,
      message: error.message
    });
    return null;
  }
}

function processApiData(apiData) {
  if (!apiData) return [];
  
  // Converte para array se necessário
  const dataArray = Array.isArray(apiData) ? apiData : 
                   apiData.data ? apiData.data : 
                   Object.values(apiData);

  return dataArray.map(item => ({
    nome: item.nome || item.Nome || '',
    esfera: item.esfera || item.Esfera || '',
    totalSeguidores: item.totalSeguidores || item.seguidores || 0,
    ultimaAtualizacao: new Date().toISOString()
  })).filter(item => item.nome && item.esfera);
}

async function storeData(data, requestId) {
  if (!data || data.length === 0) return;

  try {
    const BATCH_SIZE = 50;
    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE);
      await prisma.$transaction(
        batch.map(item =>
          prisma.orgaoPublico.upsert({
            where: { nome: item.nome },
            update: item,
            create: item
          })
        )
      );
      logger.debug(`[${requestId}] Lote ${i/BATCH_SIZE + 1} armazenado`);
    }
  } catch (error) {
    logger.error(`[${requestId}] Falha no armazenamento`, error);
    throw error;
  }
}

async function handleFallback(pagina, nome, requestId, error, startTime) {
  try {
    // Tenta primeiro o banco local
    const fallbackData = await getLocalData(pagina, nome);
    if (fallbackData.length > 0) {
      logger.warn(`[${requestId}] Usando fallback local`);
      return formatResponse(
        fallbackData, 
        false, 
        requestId, 
        startTime,
        { warning: 'Dados podem estar desatualizados' }
      );
    }

    // Se não houver dados locais, usa mock
    logger.error(`[${requestId}] Usando dados mockados`);
    return formatResponse(
      MOCK_DATA.slice(0, 10), 
      false, 
      requestId, 
      startTime,
      { 
        warning: 'Serviço usando dados de exemplo',
        originalError: error.message 
      }
    );

  } catch (fallbackError) {
    logger.error(`[${requestId}] Falha crítica no fallback`, fallbackError);
    return {
      success: false,
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'Serviço temporariamente indisponível',
        details: error.message,
        requestId
      },
      metadata: {
        timestamp: new Date().toISOString(),
        responseTime: `${Date.now() - startTime}ms`
      }
    };
  }
}

async function safeDisconnect() {
  try {
    await prisma.$disconnect();
  } catch (error) {
    logger.error('Erro ao desconectar Prisma:', error);
  }
}

function formatResponse(data, isFresh, requestId, startTime, extras = {}) {
  return {
    success: true,
    data,
    metadata: {
      requestId,
      source: isFresh ? 'api' : (extras.warning ? 'fallback' : 'cache'),
      timestamp: new Date().toISOString(),
      responseTime: `${Date.now() - startTime}ms`,
      count: data.length,
      ...extras
    }
  };
}

function generateRequestId() {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`;
}