import axios from 'axios';
import axiosRetry from 'axios-retry';
import { logger } from '../utils/logger.js';

const client = axios.create({
  timeout: parseInt(process.env.GOV_API_TIMEOUT),
  headers: {
    'Authorization': `Bearer ${process.env.GOV_API_TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Configuração de retentativas
axiosRetry(client, {
  retries: parseInt(process.env.GOV_API_MAX_RETRIES),
  retryDelay: (retryCount) => {
    const delay = 1000 * retryCount;
    logger.warn(`Tentativa ${retryCount}, aguardando ${delay}ms`);
    return delay;
  },
  retryCondition: (error) => {
    return axiosRetry.isNetworkError(error) || 
      (error.response?.status >= 500);
  }
});

export const govApiClient = {
  get: async (service, endpoint, params = {}) => {
    const baseUrls = {
      saude: process.env.CNES_API_URL,
      educacao: process.env.INEP_API_URL,
      cultura: process.env.CULTURA_API_URL
    };

    try {
      const response = await client.get(`${baseUrls[service]}/${endpoint}`, {
        params,
        paramsSerializer: { indexes: null } // Para arrays formatados corretamente
      });

      return {
        success: true,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      logger.error(`Falha na API ${service}`, {
        endpoint,
        status: error.response?.status,
        message: error.message
      });

      throw {
        code: `API_${service.toUpperCase()}_FALHA`,
        message: `Erro ao acessar ${service}: ${error.message}`,
        details: error.response?.data
      };
    }
  }
};