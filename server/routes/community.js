import { Router } from "express";
import { createCommunity, getCommunity } from "../controllers/community.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.post("/", verifyToken, createCommunity);
router.get("/:community", getCommunity);

export default router;
