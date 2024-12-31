import express from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js";  // Verify JWT middleware
import * as viewController from '../controllers/view.controller.js';
import multer from 'multer';

const router = express.Router();

router.get("/home", verifyJWT, viewController.renderHomePage);

router.get("/about", verifyJWT, viewController.renderAboutPage);

router.get("/contact", verifyJWT, viewController.renderContactPage);

router.get("/profile", verifyJWT, viewController.renderProfilePage);

router.get("/mySubject", verifyJWT, viewController.renderMySubjectPage);

router.get("/mySubject/:subject", verifyJWT, viewController.getSubjectDetails);
router.post("/mySubject/GetSubjects", verifyJWT, viewController.getSubjects);

router.route("/mySubject/AddSubject").post(verifyJWT,viewController.AddnewSubject);
const upload = multer();
router.route("/mySubject/AddQuestion/:subjectId").post(verifyJWT,upload.none(),viewController.AddQuestion);

router.get("/forgotPassword",viewController.renderForgotPasswordPage);
  
// Login page
router.get("/login", viewController.renderLoginPage); // Render login page without JWT

export default router;
