import { useState } from "react";
import newRequest from "../utils/newRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const PostFormModal = ({ onClick }) => {
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (post) => newRequest.post("/comments", post),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(post);
      //onClick();
      navigate(`/comments/${data._id}`);
    },
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    mutation.mutate(post);
    /* setPost({ title: "", body: "" });
    onClick(); */
  };

  const handleTitle = (e) => setPost({ ...post, title: e.target.value });
  const handleBody = (e) => setPost({ ...post, body: e.target.value });

  return (
    <div className="h-screen w-full bg-[rgba(0,0,0,.9)] fixed top-12 left-0 py-5 z-20 overflow-y-scroll">
      <div className="bg-neutral-900 text-neutral-300 p-6 w-3/4 md:w-1/2 rounded-md border mx-auto border-neutral-800">
        <form onSubmit={handlesubmit} className="flex flex-col gap-4">
          <h1 className="text-2xl">Create a post</h1>
          <Input
            name="title"
            type="text"
            className="rounded-md"
            placeholder="Title"
            onChange={handleTitle}
            value={post.title}
          />
          <textarea
            className="bg-neutral-800 text-neutral-300 py-2 px-4 border border-neutral-700 rounded-md"
            name="body"
            placeholder="Write your post here..."
            onChange={handleBody}
            value={post.body}
          />
          <div className="flex gap-2 justify-end">
            <Button outline onClick={onClick}>
              Cancel
            </Button>
            <Button>POST</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PostFormModal;
