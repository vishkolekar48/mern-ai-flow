import express from "express";
import { askAI, savePrompt } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ask-ai", askAI);
router.post("/save", savePrompt);

export default router;
