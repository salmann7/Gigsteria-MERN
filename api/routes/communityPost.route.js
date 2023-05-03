import express from "express";
import requireUser from "../middleware/requireUser.js";
import { createPost, getPost } from "../controllers/communityPost.controller.js";

const router = express.Router();

router.get('/:id', getPost);
router.post('/', requireUser, createPost);

export default router;