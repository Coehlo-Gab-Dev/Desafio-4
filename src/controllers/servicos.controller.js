import { obterDadosDasApis } from "../services/govApis.service.js";

export const listarTodosServicos = async (req, res) => {
  try {
    const dados = await obterDadosDasApis();
    res.status(200).json(dados);
  } catch (error) {
    console.error("Erro no controller:", error.message);
    res.status(500).json({ erro: "Erro ao buscar dados das APIs" });
  }
};
