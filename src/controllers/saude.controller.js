import { buscarEstabelecimentos } from '../services/cnes.service.js';
import { logger } from '../utils/logger.js';

/**
 * @swagger
 * tags:
 *   name: Saúde
 *   description: Endpoints para estabelecimentos de saúde
 */

/**
 * @swagger
 * /api/estabelecimentos-saude:
 *   get:
 *     summary: Lista estabelecimentos de saúde
 *     description: Retorna estabelecimentos filtrados por tipo, município ou UF
 *     tags: [Saúde]
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página para paginação
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *         description: Tipo de estabelecimento (ex: UPA, HOSPITAL)
 *       - in: query
 *         name: municipio
 *         schema:
 *           type: string
 *         description: Nome do município (ex: Rio de Janeiro)
 *       - in: query
 *         name: uf
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Sigla da UF (ex: RJ, SP)
 *     responses:
 *       200:
 *         description: Lista de estabelecimentos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EstabelecimentosResponse'
 *       206:
 *         description: Dados mockados (quando a API está indisponível)
 *       500:
 *         description: Erro interno do servidor
 */
export const listarEstabelecimentosSaude = async (req, res) => {
    const startTime = Date.now();
    const requestId = req.id || `req_${Date.now().toString(36)}`;
    
    try {
        logger.info(`[${requestId}] Requisição recebida`, { 
            query: req.query,
            ip: req.ip
        });

        // Validação básica dos parâmetros
        const { pagina = 1, tipo, municipio, uf } = req.query;
        
        if (uf && uf.length !== 2) {
            return res.status(400).json({
                sucesso: false,
                erro: {
                    codigo: 'UF_INVALIDA',
                    mensagem: 'A UF deve ter exatamente 2 caracteres'
                }
            });
        }

        // Converter página para número e validar
        const paginaNumero = Math.max(1, parseInt(pagina)) || 1;

        // Buscar dados
        const resultado = await buscarEstabelecimentos({
            pagina: paginaNumero,
            tipo,
            municipio,
            uf
        });

        // Determinar status code apropriado
        const statusCode = resultado.metadados.fonte === 'mock' ? 206 : 200;

        // Log de sucesso
        logger.info(`[${requestId}] Requisição concluída`, {
            tempoResposta: `${Date.now() - startTime}ms`,
            totalItens: resultado.dados.length,
            statusCode
        });

        return res.status(statusCode).json(resultado);

    } catch (error) {
        // Log detalhado do erro
        logger.error(`[${requestId}] Erro no controller`, {
            erro: error.message,
            stack: error.stack,
            query: req.query,
            tempoProcessamento: `${Date.now() - startTime}ms`
        });

        // Resposta de erro padronizada
        return res.status(500).json({
            sucesso: false,
            erro: {
                codigo: 'ERRO_INTERNO',
                mensagem: 'Falha ao processar requisição',
                detalhes: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            metadados: {
                requestId,
                timestamp: new Date().toISOString()
            }
        });
    }
};

/**
 * Obtém detalhes de um estabelecimento específico
 */
export const obterEstabelecimentoPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const estabelecimento = await buscarEstabelecimentos({ id });
      
      if (!estabelecimento) {
        return res.status(404).json({
          sucesso: false,
          erro: {
            codigo: 'NAO_ENCONTRADO',
            mensagem: 'Estabelecimento não encontrado'
          }
        });
      }
  
      return res.status(200).json({
        sucesso: true,
        dados: estabelecimento,
        metadados: {
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      logger.error('Erro ao buscar estabelecimento por ID', error);
      return res.status(500).json({
        sucesso: false,
        erro: {
          codigo: 'ERRO_INTERNO',
          mensagem: 'Falha ao buscar estabelecimento'
        }
      });
    }
  };