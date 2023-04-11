import Post from "./Post";
import newRequest from "../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";

const Posts = ({ community, communityAvatar }) => {
  const { search } = useLocation();
  const { isLoading, data } = useQuery({
    queryKey: ["comment", "community", community, search],
    queryFn: () =>
      newRequest
        .get(`/comments${search}${community ? `?community=${community}` : ""}`)
        .then((res) => res.data),
  });

  return (
    <>
      {isLoading
        ? "Loading..."
        : data.posts.map((post) => (
            <Post key={post._id} {...post} communityAvatar={communityAvatar} />
          ))}
      {data?.communities?.map((community) => (
        <div
          className={
            "border border-neutral-700 bg-neutral-800 hover:border-neutral-400 rounded-md p-4"
          }
          /*   style={{ backgroundImage: `url(${community.avatar})` }} */
          key={community._id}
        >
          <Link to={`/r/${community.name}`} className="cursor-pointer">
            <h2 className="text-2xl tracking-wide text-neutral-300 stroke-2 stroke-blue-400">
              r/{community.name}
            </h2>
          </Link>
        </div>
      ))}
    </>
  );
};
export default Posts;
