import ServicoPublico from '../models/servicoPublico.model.js';
import Escola from '../models/educacao.model.js';
import Estabelecimento from '../models/estabelecimento.js';
import PontoCultural from '../models/pontoCultural.js';

export default class IntegratedDataService {
  async getIntegratedData(location) {
    try {
      const [servicos, escolas, saude, cultura] = await Promise.all([
        ServicoPublico.find({
          $or: [
            { 'comoAcessar.presencial.locais.endereco': new RegExp(location, 'i') },
            { esferaGoverno: 'federal' }
          ]
        }).limit(5),
        
        Escola.find({
          'endereco.cidade': new RegExp(location, 'i')
        }).limit(5),
        
        
        // Filtro atualizado para saúde (MA obrigatório)
        Estabelecimento.find({
          municipio: new RegExp(location, 'i'),
          uf: 'MA' // ← Filtro fixo adicionado
        }).limit(5),
        
        PontoCultural.find({
          cidade: new RegExp(location, 'i')
        }).limit(5)
      ]);

      return {
        servicosPublicos: servicos,
        educacao: escolas,
        saude: saude,
        cultura: cultura
      };
    } catch (error) {
      throw new Error(`Erro ao buscar dados integrados: ${error.message}`);
    }
  }
}