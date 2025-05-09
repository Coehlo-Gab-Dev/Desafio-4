import express from 'express';
import { listarEstabelecimentosSaude } from '../controllers/saude.controller.js';
import { validarConsultaEstabelecimentos, tratarErrosValidacao } from '../middlewares/validacao.middleware.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();
/**
 * @swagger
 * /api/saude/estabelecimentos:
 *   get:
 *     summary: Lista estabelecimentos de saúde
 *     description: Retorna estabelecimentos filtrados por tipo, município ou UF com paginação
 *     tags: [Saúde]
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: tipo
 *         schema: { type: string, enum: [UPA, HOSPITAL, PRONTO SOCORRO, UBS] }
 *       - in: query
 *         name: municipio
 *         schema: { type: string }
 *       - in: query
 *         name: uf
 *         schema: { type: string, maxLength: 2, minLength: 2 }
 *     responses:
 *       200:
 *         description: Lista de estabelecimentos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListaEstabelecimentos'
 *       206:
 *         description: Dados mockados (serviço principal indisponível)
 *       400:
 *         description: Parâmetros inválidos
 *       500:
 *         description: Erro interno do servidor
 */

// Configuração de rate limiting
const healthRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    sucesso: false,
    erro: {
      codigo: 'TOO_MANY_REQUESTS',
      mensagem: 'Limite de requisições excedido'
    }
  }
});
async function listarEstabelecimentos(req, res) {
    const startTime = Date.now();
    const requestId = req.id || `req_${Date.now().toString(36)}`;
    
    try {
        logger.info(`[${requestId}] Requisição recebida`, { 
            query: req.query,
            ip: req.ip
        });

        const { pagina = 1, tipo, municipio, uf } = req.query;
        
        const resultado = await buscarEstabelecimentos({
            pagina: parseInt(pagina) || 1,
            tipo,
            municipio, 
            uf
        });

        // Determinar status code apropriado
        const statusCode = resultado.metadados.fonte === 'mock' ? 206 : 200;

        logger.info(`[${requestId}] Requisição concluída`, {
            tempoResposta: `${Date.now() - startTime}ms`,
            totalItens: resultado.dados.length
        });

        return res.status(statusCode).json(resultado);

    } catch (error) {
        logger.error(`Erro no controller: ${error.message}`, {
            stack: error.stack,
            query: req.query
        });
        
        return res.status(500).json({
            sucesso: false,
            erro: {
                codigo: 'ERRO_INTERNO',
                mensagem: 'Falha ao processar requisição'
            }
        });
    }
}

router.get(
  '/estabelecimentos',
  healthRateLimiter,
  validarConsultaEstabelecimentos,
  tratarErrosValidacao,
  listarEstabelecimentosSaude
);

export default router;

/**
 * @swagger
 * /api/saude/estabelecimentos/{id}:
 *   get:
 *     summary: Obtém detalhes de um estabelecimento
 *     tags: [Saúde]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, pattern: '^[0-9]{7}$' }
 *     responses:
 *       200:
 *         description: Detalhes do estabelecimento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EstabelecimentoDetalhado'
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
async function obterEstabelecimentoPorId(req, res) {
    try {
        // Implementação futura
        res.status(501).json({
            sucesso: false,
            erro: {
                codigo: 'NOT_IMPLEMENTED',
                mensagem: 'Endpoint em desenvolvimento'
            }
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            erro: {
                codigo: 'ERRO_INTERNO',
                mensagem: 'Falha ao buscar estabelecimento'
            }
        });
    }
}

module.exports = {
    listarEstabelecimentos,
    obterEstabelecimentoPorId
};