import { useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import Posts from "../components/Posts";
import SubHeader from "../components/SubHeader";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import useAuth from "../hooks/useAuth";

const Subreddit = () => {
  const user = useAuth();
  const { community } = useParams();

  const { data } = useQuery({
    queryKey: ["community"],
    queryFn: () =>
      newRequest.get(`/community/${community}`).then((res) => res.data),
  });

  return (
    <>
      {!!community && <SubHeader {...data} />}
      <div
        className={`flex flex-col gap-4 py-4 max-w-5xl mx-auto ${
          !community && "pt-16"
        }`}
      >
        {!!user && !!community && <PostForm />}
        <Posts community={community} />
      </div>
    </>
  );
};
export default Subreddit;
