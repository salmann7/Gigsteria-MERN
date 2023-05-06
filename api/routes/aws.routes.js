import express from "express";
import requireUser from "../middleware/requireUser.js";
import { getUrl } from "../controllers/aws.controller.js";

const router = express.Router();

router.get("/getUrl", requireUser , getUrl);

export default router;