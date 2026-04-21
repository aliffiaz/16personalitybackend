import express from "express";
import { userLogin, userRegisterGoogle, userSignup, userLogout } from "../Controllers/UserController.js";

const router = express.Router();

router.post("/StudentLogin", userLogin); // Frontend expects this path
router.post("/googleLogin", userRegisterGoogle); // Frontend expects this path
router.post("/signup", userSignup);
router.post("/logout", userLogout);

export default router;
