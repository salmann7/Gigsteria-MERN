import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createGig, deleteGig, getGig, getGigs} from "../controllers/gig.controller.js";

const router = express.Router();

router.get("/", getGigs);
router.get("/single/:id", getGig);
router.delete("/:id", verifyToken, deleteGig);
router.post("/", verifyToken, createGig);

export default router;