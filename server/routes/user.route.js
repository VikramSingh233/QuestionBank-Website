import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { registerUser , loginUser,logoutUser} from "../controllers/user.controller.js";
// import {upload} from "../middlewares/multer.middleware.js"
const router = Router()
router.route("/register").post(registerUser)
router.route("/loginUser").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)

export default router