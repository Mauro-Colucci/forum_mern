import User from "../models/User.js";
import Comment from "../models/Comment.js";
import createError from "../utils/createError.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Comment.find().sort({ createdAt: -1 });
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
