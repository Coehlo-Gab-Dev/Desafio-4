import express from 'express';
import AutenticacaoController from '../auth/auth.controller.js';

const router = express.Router();
router.post('/login', AutenticacaoController.login);
router.post('/logout', AutenticacaoController.logout);

export default router;