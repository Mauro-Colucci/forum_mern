import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  getComments,
  downVote,
  upVote,
} from "../controllers/comments.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/root/:rootId", getComments);
router.post("/", verifyToken, createPost);
router.patch("/:commentId/upVote", verifyToken, upVote);
router.patch("/:commentId/downVote", verifyToken, downVote);

export default router;
