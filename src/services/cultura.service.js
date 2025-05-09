import axios from 'axios';

export async function getCulturaMA() {
  try {
    const url = 'https://mapas.cultura.gov.br/api/item?territorio=MA';

    // Faz a requisição com timeout para evitar travamentos
    const response = await axios.get(url, { timeout: 10000 });

    // Validação segura da estrutura esperada
    const dados = response?.data?.data;
    if (!Array.isArray(dados)) {
      console.warn('Resposta inesperada da API de Cultura:', response.data);
      return []; // Retorna array vazio se a estrutura não for a esperada
    }

    // Mapeia os dados relevantes
    return dados.map(item => ({
      id: item.id,
      nome: item.nome,
      tipo: item.tipo,
      municipio: item.municipio,
      responsavel: item.responsavel || 'Desconhecido',
      dataCriacao: item.dataCriacao
    }));

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro Axios na API de Cultura:', error.message);
    } else {
      console.error('Erro inesperado em getCulturaMA:', error);
    }
    throw error; // Repassa o erro para o controller tratar
  }
}
