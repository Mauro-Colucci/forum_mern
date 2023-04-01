import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import newRequest from "../utils/newRequest";
import Post from "../components/Post";
import { AiOutlineClose } from "react-icons/ai";

const PostPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: [id, "post"],
    queryFn: () => newRequest.get(`/comments/${id}`).then((res) => res.data),
  });
  console.log(!!state);
  return (
    <div
      className={
        !!state &&
        "min-h-screen w-full bg-[rgba(0,0,0,.9)] absolute top-0 py-5 left-0 z-50"
      }
    >
      <div
        className={
          !!state &&
          "bg-neutral-900 text-neutral-300 p-6 w-3/4 md:w-1/2 rounded-md border mx-auto border-neutral-800"
        }
      >
        <div className="flex flex-col gap-4 py-4 max-w-5xl mx-auto">
          {!!state && (
            <button
              className="text-neutral-300 flex items-center hover:bg-neutral-600 w-fit px-2 rounded-full text-sm"
              onClick={() => navigate(-1)}
            >
              <AiOutlineClose size="1.1rem" /> Close
            </button>
          )}
          {isLoading ? "Loading..." : <Post {...data} full />}
        </div>
      </div>
    </div>
  );
};
export default PostPage;
