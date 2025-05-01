import express from "express";
import { listarTodosServicos } from "../controllers/servicos.controller.js";

const router = express.Router();

router.get("/", listarTodosServicos); // GET /api/servicos

export default router;
