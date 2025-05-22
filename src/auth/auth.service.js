import axios from 'axios';
import { logger } from '../utils/logger.js';

class AuthService {
  static async login(login, senha) {
    try {
      // 1. Chamada para a API do governo (ajuste a URL!)
      const response = await axios.post(
        'https://apidadosabertos.saude.gov.br/v1/#/Autentica%C3%A7%C3%A3o/post_autenticacao_login', // URL oficial
        { login, senha }, // Corpo exatamente como na doc
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // 2. Retorne o token conforme a API do governo
      return response.data.token; // Supondo que retorne { token: '...' }

    } catch (error) {
      logger.error('Erro na autenticação:', {
        status: error.response?.status,
        data: error.response?.data
      });
      
      if (error.response?.status === 405) {
        throw new Error('Dados inválidos (código 405)');
      }
      throw new Error('Serviço de autenticação indisponível');
    }
  }
}

export default AuthService;