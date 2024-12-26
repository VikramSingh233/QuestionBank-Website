import express from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js";  // Verify JWT middleware
import * as viewController from '../controllers/view.controller.js';

const router = express.Router();

// Route to serve Home page (protected)
router.get("/home", verifyJWT, viewController.renderHomePage);

// Route to serve About Us page (protected)
router.get("/about", verifyJWT, viewController.renderAboutPage);

// Route to serve Contact Us page (protected)
router.get("/contact", verifyJWT, viewController.renderContactPage);

// Route to serve Profile page (protected)
router.get("/profile", verifyJWT, viewController.renderProfilePage);

// Route to serve "My Subjects" page (protected)
router.get("/mySubject", verifyJWT, viewController.renderMySubjectPage);

// Login page
router.get("/login", viewController.renderLoginPage); // Render login page without JWT

export default router;
