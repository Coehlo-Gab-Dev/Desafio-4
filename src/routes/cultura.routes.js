import express from 'express';
import { listarCultura } from '../controllers/cultura.controller.js';

const router = express.Router();
router.get('/cultura', listarCultura);
export default router;