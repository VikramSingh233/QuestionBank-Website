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


router.get("/mySubject/:subject", verifyJWT, viewController.renderSubjectPage);

router.route("/mySubject/AddSubject").post(verifyJWT,viewController.AddnewSubject);
// router.get("/mySubject/:subjectName", verifyJWT, async (req, res) => {
//     const { subjectName } = req.params;
//     const userId = req.user._id; // Assuming `verifyJWT` middleware adds the user's ID to `req.user`

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).send("User not found");
//         }

//         // Find the subject in the user's subjects array
//         const subject = user.subjects.find(sub => sub.subjectName.toLowerCase() === subjectName.toLowerCase());

//         if (!subject) {
//             return res.status(404).send("Subject not found for this user");
//         }

//         // Respond with subject details or render a page
//         res.render("subjectPage", { subject });
//     } catch (error) {
//         console.error("Error fetching subject:", error.message);
//         res.status(500).send("Internal server error");
//     }
// });




// Login page
router.get("/login", viewController.renderLoginPage); // Render login page without JWT

export default router;
