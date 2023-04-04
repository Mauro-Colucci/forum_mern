import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

const CommentForm = ({ rootId, parentId, showHeader = true, closeComment }) => {
  const user = useAuth();
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const commentData = { body: comment, parentId, rootId };

  const mutation = useMutation({
    mutationFn: (comment) => newRequest.post("/comments", comment),
    onSuccess: () => {
      queryClient.invalidateQueries(["comment"]);
      setComment("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(commentData);
    closeComment();
  };

  return (
    <div>
      {showHeader && (
        <p className="text-neutral-500 text-xs mb-2">
          Comment as u/{user?.username}
        </p>
      )}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <textarea
          className="bg-neutral-800 text-neutral-300 py-2 px-4 border border-neutral-700 rounded-md"
          name="body"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="Write your comment here..."
        />
        <div className="flex justify-end gap-2">
          {!!closeComment && (
            <Button outline onClick={closeComment}>
              Cancel
            </Button>
          )}
          <Button>Comment</Button>
        </div>
      </form>
    </div>
  );
};
export default CommentForm;
