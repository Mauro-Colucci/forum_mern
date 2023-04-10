import Community from "../models/Community.js";
import createError from "../utils/createError.js";

export const createCommunity = async (req, res, next) => {
  try {
    const duplicate = await Community.findOne({ name: req.body.name })
      .lean()
      .exec();
    if (duplicate) return next(createError(409, "Community already exist"));
    const community = await Community.create({
      ...req.body,
      author: req.username,
    });
    res.status(200).send(community);
  } catch (err) {
    next(err);
  }
};

export const getCommunity = async (req, res, next) => {
  try {
    const community = await Community.findOne({ name: req.params.community });
    res.status(200).send(community);
  } catch (err) {
    next(err);
  }
};
