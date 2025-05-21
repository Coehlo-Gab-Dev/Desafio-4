import { govApiClient } from '../core/govApiClient.js';
import PontoCultural from '../models/pontoCultural.js';
import { logger } from '../utils/logger.js';
import axios from 'axios';

// Helpers (declarados uma única vez no módulo)
const construirQueryLocal = ({ cidade, tipo }) => {
  const query = {};
  if (cidade) query.cidade = { $regex: cidade, $options: 'i' };
  if (tipo) query.tipo = { $regex: tipo, $options: 'i' };
  return query;
};

const transformarDadosAPI = (item) => {
  return {
    id: item.codigo || item.id || Math.random().toString(36).substr(2, 9),
    nome: item.nome || item.nomeMuseu || 'Ponto Cultural',
    tipo: item.tipo || item.tipoMuseu || 'cultural',
    cidade: item.municipio || item.localizacao?.municipio || 'Não informado',
    endereco: {
      logradouro: item.endereco?.logradouro || item.localizacao?.logradouro || 'Não informado',
      numero: item.endereco?.numero || item.localizacao?.numero || 'S/N',
      complemento: item.endereco?.complemento || item.localizacao?.complemento || '',
      bairro: item.endereco?.bairro || item.localizacao?.bairro || 'Não informado',
      cep: item.endereco?.cep || item.localizacao?.cep || '00000-000'
    },
    acessibilidade: item.acessivel === 'Sim' || item.acessibilidade === true,
    horarioFuncionamento: item.horario || item.horarioFuncionamento || 'Não informado',
    atualizadoEm: new Date()
  };
};

const armazenarEmBanco = async (dados) => {
  const bulkOps = dados.map(item => ({
    updateOne: {
      filter: { id: item.id },
      update: { 
        $set: transformarDadosAPI(item)
      },
      upsert: true
    }
  }));

  await PontoCultural.bulkWrite(bulkOps);
};

const gerarMockData = ({ cidade = 'Brasília', tipo = 'museu' }) => {
  return [{
    id: '0000001',
    nome: `${tipo.toUpperCase()} MOCK ${cidade}`,
    tipo,
    cidade,
    endereco: {
      logradouro: 'Rua Cultural',
      numero: 'S/N',
      complemento: 'Próximo à praça',
      bairro: 'Centro',
      cep: '70000000'
    },
    acessibilidade: true,
    horarioFuncionamento: 'Terça a Domingo, 9h às 17h',
    atualizadoEm: new Date()
  }];
};

// Função principal exportada
export const buscarPontosCultura = async ({ pagina = 1, cidade, tipo }) => {
  const LIMITE_POR_PAGINA = 10;
  const requestId = `req_${Date.now().toString(36)}`;

  try {
    // 1. Tentar buscar do banco local primeiro
    const queryLocal = construirQueryLocal({ cidade, tipo });
    const locais = await PontoCultural.find(queryLocal)
      .sort({ atualizadoEm: -1 })
      .skip((pagina - 1) * LIMITE_POR_PAGINA)
      .limit(LIMITE_POR_PAGINA)
      .lean();

    if (locais.length > 0) {
      logger.info(`[${requestId}] Dados locais encontrados: ${locais.length} itens`);
      return { dados: locais, metadados: { fonte: 'banco_local' } };
    }

    // 2. Tentar APIs em ordem de prioridade
    let dadosAPI = null;
    let fonteAPI = '';

    // Tentativa 1: API MuseusBR
    try {
      const response = await axios.get(
        'https://dados.cultura.gov.br/api/3/action/package_show?id=museus-br',
        { timeout: 5000 }
      );
      
      const datasetUrl = response.data.result.resources
        .find(res => res.format === 'JSON').url;

      const { data } = await axios.get(datasetUrl);
      dadosAPI = data.map(transformarDadosAPI);
      fonteAPI = 'museus_br';
    } catch (error) {
      logger.warn(`[${requestId}] API MuseusBR falhou: ${error.message}`);
      
      // Tentativa 2: API IBGE
      try {
        const { data } = await axios.get(
          'https://servicodados.ibge.gov.br/api/v1/cultura/museus/',
          { timeout: 5000 }
        );
        dadosAPI = data.map(transformarDadosAPI);
        fonteAPI = 'ibge';
      } catch (error) {
        logger.warn(`[${requestId}] API IBGE falhou: ${error.message}`);
        throw new Error('Todas as APIs governamentais falharam');
      }
    }

    // 3. Armazenar no banco se obteve dados
    if (dadosAPI?.length > 0) {
      process.nextTick(() => {
        armazenarEmBanco(dadosAPI).catch(error => 
          logger.error(`[${requestId}] Falha ao armazenar dados`, error));
      });

      return { 
        dados: dadosAPI.slice(0, LIMITE_POR_PAGINA), 
        metadados: { fonte: fonteAPI } 
      };
    }

    throw new Error('Nenhum dado disponível nas APIs');

  } catch (error) {
    logger.error(`[${requestId}] Falha na busca`, error);
    
    // Fallback para mock
    const mockData = gerarMockData({ cidade, tipo });
    return { 
      dados: mockData.slice(0, LIMITE_POR_PAGINA), 
      metadados: { fonte: 'mock' },
      aviso: 'Dados simulados - Serviço principal indisponível'
    };
  }
};