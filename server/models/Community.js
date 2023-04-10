import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slogan: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  cover: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Community", CommunitySchema);
