import express from "express";
import { register, getUser, deleteUser, addFav, deleteFav, updateUser, addFollower, removeFollower} from "../controllers/user.controller.js"
import requireUser from "../middleware/requireUser.js";

const router = express.Router();

router.post("/register", register);
router.get("/:id", getUser);
router.put("/", requireUser, updateUser);
router.put("/add/:id", requireUser, addFollower);
router.put("/remove/:id", requireUser, removeFollower);
router.delete("/:id", deleteUser);
router.put("/favorites/:id", deleteFav);
router.post("/favorites/:id", addFav);

export default router;