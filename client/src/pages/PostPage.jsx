import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import newRequest from "../utils/newRequest";
import Post from "../components/Post";

const PostPage = () => {
  const { id } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: [id, "post"],
    queryFn: () => newRequest.get(`/comments/${id}`).then((res) => res.data),
  });

  console.log(id);

  return (
    <div className="flex flex-col gap-4 py-4 max-w-5xl mx-auto">
      {isLoading ? "Loading..." : <Post {...data} full />}
    </div>
  );
};
export default PostPage;
