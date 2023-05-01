import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm, checkout} from "../controllers/order.controller.js";
import requireUser from "../middleware/requireUser.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", requireUser , intent);
router.put("/", requireUser, confirm);
router.post("/create-checkout-session", verifyToken, checkout);

export default router;