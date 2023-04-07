import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import newRequest from "../utils/newRequest";
import Post from "../components/Post";
import useOutsideClick from "../hooks/useOutsideClick";
import { AiOutlineClose } from "react-icons/ai";

const PostPage = () => {
  const { id } = useParams();

  const { state } = useLocation();

  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: [id, "post", "comment"],
    queryFn: () => newRequest.get(`/comments/${id}`).then((res) => res.data),
  });

  const { data: comments } = useQuery({
    queryKey: ["comment", id],
    queryFn: () =>
      newRequest.get(`/comments/root/${id}`).then((res) => res.data),
  });

  const goBack = () => navigate(-1);

  const ref = useOutsideClick(goBack);

  return (
    <div
      className={
        !!state &&
        "w-full bg-[rgba(0,0,0,.9)] fixed overflow-y-scroll top-12 bottom-0 py-5 left-0 z-50"
      }
    >
      <div
        className={
          !!state &&
          "bg-neutral-900 text-neutral-300 px-6 py-2 w-3/4 md:w-1/2 rounded-sm border mx-auto border-neutral-800 relative"
        }
        ref={ref}
      >
        <div
          className={`flex flex-col gap-4 max-w-5xl mx-auto ${
            !state ? "pt-16" : "py-4"
          }`}
        >
          {!!state && (
            <div className="flex justify-end bg-black absolute top-0 left-0 w-full p-3">
              <button
                className="text-neutral-300 flex items-center hover:bg-neutral-600 w-fit px-2 py-1 rounded-full text-sm"
                onClick={goBack}
              >
                <AiOutlineClose size="1.1rem" /> Close
              </button>
            </div>
          )}
          {isLoading ? (
            "Loading..."
          ) : (
            <div className={!!state && "pt-10"}>
              <Post {...data} comments={comments} full />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PostPage;
