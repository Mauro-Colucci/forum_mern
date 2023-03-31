import Post from "./Post";
import newRequest from "../utils/newRequest";
import { useQuery } from "@tanstack/react-query";

const Posts = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => newRequest.get("/comments").then((res) => res.data),
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
