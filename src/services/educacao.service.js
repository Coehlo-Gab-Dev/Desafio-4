import axios from 'axios';

export async function getEscolasMA() {
  try {
    const url = 'https://dadosabertos.inep.gov.br/api/escolas?uf=MA'; // Exemplo fictício
    const response = await axios.get(url);

    const data = response.data;

    const escolas = Array.isArray(data?.escolas) ? data.escolas : [];

    return escolas.map(escola => ({
      codigo: escola.codigo,
      nome: escola.nome,
      rede: escola.rede,
      municipio: escola.municipio,
      endereco: escola.endereco,
      telefone: escola.telefone || 'Não informado'
    }));

  } catch (error) {
    console.error('Erro ao buscar dados da Educação:', error.message);
    throw new Error('Erro ao buscar escolas no Maranhão');
  }
}
