import Comment from "../models/Comment.js";
import Community from "../models/Community.js";
import createError from "../utils/createError.js";

export const getPosts = async (req, res, next) => {
  const { search, community } = req.query;
  const filter = search
    ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { body: { $regex: search, $options: "i" } },
          //instead of searching for the query in the comment model for communities, it should check in the community model
          //test commented queries in the try
          //{ community: { $regex: search, $options: "i" } },
        ],
      }
    : { rootId: null };

  if (community) filter.community = community;
  let communityRes = null;
  try {
    const posts = await Comment.find(filter).sort({ createdAt: -1 });
    if (search) {
      communityRes = await Community.find({
        name: { $regex: search, $options: "i" },
      })
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    }
    //res.status(200).send(posts,communityRes)
    res.status(200).send({ posts, communities: communityRes });
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
