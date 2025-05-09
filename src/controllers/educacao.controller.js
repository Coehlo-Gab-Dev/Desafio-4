import { getEscolasMA } from '../services/educacao.service.js';

export async function listarEscolas(req, res) {
    try {
    const escolas = await getEscolasMA();
    res.status(200).json(escolas);
    } catch (error) {
    console.error('❌ Erro em listarEscolas:', error.message);
    res.status(500).json({ error: 'Erro ao obter dados das escolas.' });
    }
}
