import AutenticacaoService from './auth.service.js';

class AutenticacaoController {
  static async login(req, res) {
    try {
      const { login, senha } = req.body; // Nomes exatos da documentação
      const token = await AutenticacaoService.login(login, senha);
      res.json({ sucesso: true, token });
    } catch (erro) {
      res.status(405).json({ sucesso: false, erro: "Invalid input" }); // Código 405 conforme doc
    }
  }

  static async logout(req, res) {
    try {
      // Lógica para revogar token (ex: adicionar à blacklist)
      res.json({ sucesso: true, mensagem: "Autorização revogada" });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }
}

export default AutenticacaoController;