import Post from "./Post";
import newRequest from "../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const Posts = () => {
  const { search } = useLocation();
  const { isLoading, data } = useQuery({
    queryKey: ["comment", search],
    queryFn: () => newRequest.get(`/comments${search}`).then((res) => res.data),
  });

  return (
    <>
      {isLoading
        ? "Loading..."
        : data.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
};
export default Posts;
