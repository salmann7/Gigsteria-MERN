import express from "express";
import { register, getUser, deleteUser, addFav, deleteFav} from "../controllers/user.controller.js"

const router = express.Router();

router.post("/register", register);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/favorites/:id", deleteFav);
router.post("/favorites/:id", addFav);

export default router;