import express from 'express';
import { listarEscolas } from '../controllers/educacao.controller.js';

const router = express.Router();
router.get('/educacao', listarEscolas);
export default router;