import axios from "axios";

export const obterDadosDasApis = async () => {
  try {
    const respostas = await Promise.all([
      axios.get("api.saude"),                 // Saúde
      axios.get("api.mec"),                   // Educação
      axios.get("api.cultura"),               // Cultura e Lazer
      axios.get("api.detran."),               // DETRAN
      axios.get("api.defesaci"),              // Urgência
      axios.get("api.ssp.ma."),               // Segurança
      axios.get("api.direito"),             // Direitos do Cidadão
      axios.get("api.tce.transparencia."),  // Gestão Pública
      axios.get("api.funac.")                 // Lazer e Cultura
    ]);

    return respostas.map((resposta, index) => ({
      categoria: categorias[index],
      dados: resposta.data,
    }));

  } catch (error) {
    console.error("Erro ao buscar as APIs:", error.message);
    throw error;
  }
};

const categorias = [
  "Saúde",
  "Cultura e Lazer",
  "Educação",
  "DETRAN",
  "Urgência",
  "Segurança",
  "Direitos dos Cidadãos",
  "Gestão Pública",
  "Lazer e Cultura"
];
