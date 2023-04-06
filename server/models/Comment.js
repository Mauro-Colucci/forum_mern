import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    rootId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    upVotes: {
      type: [String],
      default: [],
    },
    downVotes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
