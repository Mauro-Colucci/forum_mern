import { useState } from "react";
import newRequest from "../utils/newRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (post) => newRequest.post("/comments", post),
    onSuccess: () => queryClient.invalidateQueries(post),
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      //await newRequest.post("/comments", post);
      mutation.mutate(post);
      setPost({ title: "", body: "" });
    } catch (err) {
      console.log(err);
    }
  };
  const handleTitle = (e) => setPost({ ...post, title: e.target.value });
  const handleBody = (e) => setPost({ ...post, body: e.target.value });

  return (
    <form onSubmit={handlesubmit}>
      <input
        name="title"
        type="text"
        onChange={handleTitle}
        value={post.title}
      />
      <textarea name="body" onChange={handleBody} value={post.body} />
      <button>Submit</button>
    </form>
  );
};
export default CreatePost;
