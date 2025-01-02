import express from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js";  // Verify JWT middleware
import * as generateController from '../controllers/generateQuestionPaper.controller.js';
import multer from 'multer';

const router = express.Router();

router.route("/generateQuestionPaper").post(verifyJWT,generateController.generateQuestionPaper);

export default router