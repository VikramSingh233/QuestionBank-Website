import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import * as feedbackController from "../controllers/feedback.controller.js";

const router = express.Router();

router.route("/contact").post(verifyJWT, feedbackController.feedbackContact);



export default router