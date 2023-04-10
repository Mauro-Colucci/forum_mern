import Comment from "./models/Comment.js";

await Comment.updateMany({}, { community: "mechKeyboards" });
