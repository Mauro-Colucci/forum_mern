import { Router } from "express";
import { createPost, getPosts, getPost } from "../controllers/comments.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, createPost);

export default router;
