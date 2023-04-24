import express from "express";
import { register, getUser, deleteUser} from "../controllers/user.controller.js"

const router = express.Router();

router.post("/register", register);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;