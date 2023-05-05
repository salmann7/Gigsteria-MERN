import express from "express";
import requireUser from "../middleware/requireUser.js";
import { getNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", requireUser, getNotifications);

export default router;