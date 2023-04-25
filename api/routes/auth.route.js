import express from "express";
import { googleOauthHandler, login, logout } from "../controllers/auth.controller.js";
import requireUser from "../middleware/requireUser.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", requireUser, getCurrentUser);
router.get("/oauth/google", googleOauthHandler);
router.post("/logout", logout);

export default router;