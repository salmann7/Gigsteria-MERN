import express from "express";
import requireUser from "../middleware/requireUser.js";
import { getProfile } from "../controllers/profile.controller.js";

const router = express.Router();

router.get('/', getProfile);

export default router;