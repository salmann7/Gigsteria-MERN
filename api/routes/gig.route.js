import express from "express";
// import { verifyToken } from "../middleware/jwt.js";
import { createGig, deleteGig, getGig, getGigs} from "../controllers/gig.controller.js";
import requireUser from "../middleware/requireUser.js";

const router = express.Router();

router.get("/", getGigs);
router.get("/single/:id", getGig);
router.delete("/:id", requireUser, deleteGig);
router.post("/", requireUser, createGig);

export default router;