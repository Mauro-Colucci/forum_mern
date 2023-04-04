import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  getComments,
} from "../controllers/comments.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/root/:rootId", getComments);
router.post("/", verifyToken, createPost);

export default router;
