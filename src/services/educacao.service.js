import { govApiClient } from '../core/govApiClient.js';
import Escola from '../models/educacao.model.js';
import { logger } from '../utils/logger.js';

const MOCK_ESCOLAS = [
  {
    codigoInep: '00000001',
    nome: 'Escola Municipal de Educação Básica',
    nivel: 'fundamental',
    endereco: {
      cidade: 'Brasília',
      uf: 'DF'
    },
    atualizadoEm: new Date()
  }
];

export const buscarEscolas = async ({ pagina = 1, cidade, nivel, uf }) => {
  const LIMITE_POR_PAGINA = 10;
  const requestId = `req_${Date.now().toString(36)}`;

  try {
    // 1. Tentar buscar do banco local primeiro
    const queryLocal = construirQueryLocal({ cidade, nivel, uf });
    const escolas = await Escola.find(queryLocal)
      .sort({ atualizadoEm: -1 })
      .skip((pagina - 1) * LIMITE_POR_PAGINA)
      .limit(LIMITE_POR_PAGINA)
      .lean();

    if (escolas.length > 0) {
      logger.info(`[${requestId}] Dados locais encontrados: ${escolas.length} escolas`);
      return { dados: escolas, metadados: { fonte: 'banco_local' } };
    }

    // 2. Buscar da API governamental
    logger.info(`[${requestId}] Buscando da API Educação...`);
    const paramsAPI = {
      municipio: cidade,
      uf,
      nivel_ensino: nivel,
      _limit: LIMITE_POR_PAGINA,
      _page: pagina
    };

    const { data } = await govApiClient.get('educacao', 'escolas', paramsAPI);

    if (!data || data.length === 0) {
      throw new Error('API retornou vazia');
    }

    // 3. Armazenar no banco (assíncrono)
    process.nextTick(() => {
      armazenarEscolas(data).catch(error => 
        logger.error(`[${requestId}] Falha ao armazenar escolas`, error));
    });

    return { dados: data, metadados: { fonte: 'api' } };

  } catch (error) {
    logger.error(`[${requestId}] Falha na busca de escolas`, {
      error: error.message,
      stack: error.stack
    });

    // Fallback para mock em caso de falha
    return { 
      dados: MOCK_ESCOLAS, 
      metadados: { fonte: 'mock' },
      aviso: 'Dados simulados - Serviço principal indisponível'
    };
  }
};

// Helpers
function construirQueryLocal({ cidade, nivel, uf }) {
  const query = {};
  if (cidade) query['endereco.cidade'] = { $regex: cidade, $options: 'i' };
  if (uf) query['endereco.uf'] = uf.toUpperCase();
  if (nivel) query.nivel = nivel;
  return query;
}

async function armazenarEscolas(dados) {
  const bulkOps = dados.map(item => ({
    updateOne: {
      filter: { codigoInep: item.codigoInep },
      update: { 
        $set: transformarDadosEscola(item)
      },
      upsert: true
    }
  }));

  await Escola.bulkWrite(bulkOps);
}

function transformarDadosEscola(item) {
  return {
    codigoInep: item.codigoInep,
    nome: item.nome,
    nivel: item.nivel,
    endereco: {
      logradouro: item.endereco?.logradouro,
      numero: item.endereco?.numero,
      complemento: item.endereco?.complemento,
      bairro: item.endereco?.bairro,
      cep: item.endereco?.cep,
      cidade: item.endereco?.municipio || item.endereco?.cidade,
      uf: item.endereco?.uf
    },
    contato: {
      telefone: item.contato?.telefone,
      email: item.contato?.email
    },
    matriculas: {
      total: item.matriculas?.total,
      porSerie: item.matriculas?.porSerie
    },
    infraestrutura: {
      acessivel: item.infraestrutura?.acessivel,
      laboratorios: item.infraestrutura?.laboratorios,
      quadras: item.infraestrutura?.quadras,
      biblioteca: item.infraestrutura?.biblioteca
    },
    atualizadoEm: new Date()
  };
}