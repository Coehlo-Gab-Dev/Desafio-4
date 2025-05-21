import IntegratedDataService from '../services/integratedData.service.js';

export default class IntegratedDataController {
  static async getIntegratedData(req, res) {
    try {
      const { localizacao } = req.query;
      
      if (!localizacao) {
        return res.status(400).json({
          error: 'Parâmetro "localizacao" é obrigatório'
        });
      }

      const service = new IntegratedDataService();
      const data = await service.getIntegratedData(localizacao);

      res.json({
        success: true,
        data: data,
        metadata: {
          timestamp: new Date(),
          localizacao: localizacao
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}