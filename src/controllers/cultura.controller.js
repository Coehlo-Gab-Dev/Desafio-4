import { getCulturaMA } from '../services/cultura.service.js';

export async function listarCultura(req, res) {
    try {
    const dados = await getCulturaMA();
    res.status(200).json(dados);
    } catch (error) {
    console.error('❌ Erro em listarCultura:', error.message);
    res.status(500).json({ error: 'Erro ao obter dados culturais.' });
    }
}
