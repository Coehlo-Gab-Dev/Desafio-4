import { govApiClient } from '../core/govApiClient.js';
import ServicoPublico from '../models/servicoPublico.model.js';
import { logger } from '../utils/logger.js';

const MOCK_SERVICOS = [
  {
    codigoServico: 'BF-2023',
    nome: 'Bolsa Família',
    descricao: 'Programa de transferência de renda para famílias em situação de pobreza e extrema pobreza.',
    categoria: 'assistencia_social',
    publicoAlvo: 'Famílias com renda per capita de até R$ 178 mensais',
    requisitos: [
      {
        titulo: 'Cadastro Único',
        descricao: 'A família deve estar cadastrada no Cadastro Único',
        documentos: ['CPF', 'RG', 'Comprovante de residência']
      }
    ],
    comoAcessar: {
      online: {
        url: 'https://www.gov.br/bolsafamilia',
        descricao: 'Acesse o portal e siga as instruções'
      },
      presencial: {
        locais: [
          {
            tipo: 'CRAS',
            endereco: 'Centro de Referência de Assistência Social mais próximo',
            horario: 'Segunda a sexta, 8h às 17h'
          }
        ]
      },
      telefone: '136'
    },
    beneficios: [
      {
        tipo: 'Básico',
        valor: 'R$ 89,00',
        periodicidade: 'mensal'
      }
    ],
    esferaGoverno: 'federal',
    atualizadoEm: new Date()
  }
];

export const buscarServicosPublicos = async ({ pagina = 1, categoria, nome, esfera }) => {
  const LIMITE_POR_PAGINA = 10;
  const requestId = `req_${Date.now().toString(36)}`;

  try {
    // 1. Tentar buscar do banco local primeiro
    const queryLocal = construirQueryLocal({ categoria, nome, esfera });
    const servicos = await ServicoPublico.find(queryLocal)
      .sort({ atualizadoEm: -1 })
      .skip((pagina - 1) * LIMITE_POR_PAGINA)
      .limit(LIMITE_POR_PAGINA)
      .lean();

    if (servicos.length > 0) {
      logger.info(`[${requestId}] Dados locais encontrados: ${servicos.length} serviços`);
      return { dados: servicos, metadados: { fonte: 'banco_local' } };
    }

    // 2. Buscar da API governamental
    logger.info(`[${requestId}] Buscando da API Serviços Públicos...`);
    const paramsAPI = {
      categoria,
      nome,
      esfera,
      _limit: LIMITE_POR_PAGINA,
      _page: pagina
    };

    const { data } = await govApiClient.get('servicos-publicos', 'programas', paramsAPI);

    if (!data || data.length === 0) {
      throw new Error('API retornou vazia');
    }

    // 3. Armazenar no banco (assíncrono)
    process.nextTick(() => {
      armazenarServicos(data).catch(error => 
        logger.error(`[${requestId}] Falha ao armazenar serviços`, error));
    });

    return { dados: data, metadados: { fonte: 'api' } };

  } catch (error) {
    logger.error(`[${requestId}] Falha na busca de serviços públicos`, {
      error: error.message,
      stack: error.stack
    });

    // Fallback para mock em caso de falha
    return { 
      dados: MOCK_SERVICOS, 
      metadados: { fonte: 'mock' },
      aviso: 'Dados simulados - Serviço principal indisponível'
    };
  }
};

// Helpers
function construirQueryLocal({ categoria, nome, esfera }) {
  const query = { ativo: true };
  if (categoria) query.categoria = categoria;
  if (esfera) query.esferaGoverno = esfera;
  if (nome) query.nome = { $regex: nome, $options: 'i' };
  return query;
}

async function armazenarServicos(dados) {
  const bulkOps = dados.map(item => ({
    updateOne: {
      filter: { codigoServico: item.codigoServico },
      update: { 
        $set: transformarDadosServico(item)
      },
      upsert: true
    }
  }));

  await ServicoPublico.bulkWrite(bulkOps);
}

function transformarDadosServico(item) {
  return {
    codigoServico: item.codigoServico,
    nome: item.nome,
    descricao: item.descricao,
    categoria: item.categoria,
    publicoAlvo: item.publicoAlvo,
    requisitos: item.requisitos,
    comoAcessar: item.comoAcessar,
    beneficios: item.beneficios,
    esferaGoverno: item.esferaGoverno,
    atualizadoEm: new Date()
  };
}