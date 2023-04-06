import User from "../models/User.js";
import Comment from "../models/Comment.js";
import createError from "../utils/createError.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Comment.find({ rootId: null }).sort({ createdAt: -1 });
    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Comment.findById(req.params.id);
    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const post = await Comment.create({ ...req.body, author: req.username });
    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ rootId: req.params.rootId }).sort({
      createdAt: -1,
    });
    res.status(200).send(comments);
  } catch (err) {
    next(err);
  }
};

export const upVote = async (req, res, next) => {
  const id = req.userId;
  const { commentId } = req.params;

  try {
    await Comment.findByIdAndUpdate(commentId, {
      $addToSet: { upVotes: id },
      $pull: { downVotes: id },
    });
    res.status(200).send("comment upvoted");
  } catch (err) {
    next(err);
  }
};

export const downVote = async (req, res, next) => {
  const id = req.userId;
  const { commentId } = req.params;

  try {
    await Comment.findByIdAndUpdate(commentId, {
      $addToSet: { downVotes: id },
      $pull: { upVotes: id },
    });
    res.status(200).send("comment downvoted");
  } catch (err) {
    next(err);
  }
};
