// middlewares/validarParametros.js
export const validarMunicipio = (req, res, next) => {
    const { municipio } = req.query;
    
    if (!municipio) {
      return res.status(400).json({
        sucesso: false,
        erro: {
          codigo: "ERRO_VALIDACAO",
          mensagem: "Parâmetro municipio é obrigatório",
          detalhes: {
            municipios_validos: ["SAO LUIS", "IMPERATRIZ", "CAXIAS"], // Lista reduzida
            sugestao: "Exemplo: SAO LUIS, IMPERATRIZ, CAXIAS"
          }
        }
      });
    }
    next();
  };