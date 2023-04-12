import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Voting from "./Voting";
import useAuth from "../hooks/useAuth";

const Post = ({
  _id,
  title,
  body,
  author,
  createdAt,
  rootId,
  full = false,
  comments,
  upVotes,
  downVotes,
  community,
}) => {
  const location = useLocation();
  const user = useAuth();

  return (
    <div
      className={`${
        location.state ? "" : "border border-neutral-700 bg-neutral-800"
      } rounded-md p-2 ${
        !full ? "hover:border-neutral-400" : ""
      } flex items-start gap-4 relative overflow-hidden`}
    >
      <div className=" bg-neutral-900 absolute top-0 left-0 h-full w-10 pt-2">
        <Voting commentId={_id} upVotes={upVotes} downVotes={downVotes} col />
      </div>
      <div className="w-full ml-10">
        <div className="flex items-center gap-1 mb-3">
          <Link to={`/r/${community}`} className="flex items-center gap-2">
            <img
              src="/img/noavatar.png"
              alt={`${community} community avatar image.`}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="text-neutral-300 font-semibold">
              r/{community}
            </span>
          </Link>
          <span className="text-neutral-500 text-xs">•</span>
          <span className="text-neutral-500 text-xs">
            Posted by u/{author} {moment(createdAt).fromNow()}
          </span>
        </div>
        {full ? (
          <>
            <h2 className="text-xl mb-3 text-neutral-400">{title}</h2>
            <div className="pt-1 px-2 pb-2">
              {/* <p className="text-sm leading-6 text-neutral-400"> */}
              {/* {body} */}
              <ReactMarkdown
                className="text-sm leading-6 text-neutral-400"
                remarkPlugins={[gfm]}
                children={body}
              />
              {/* </p> */}
            </div>
            {!!user && (
              <>
                <hr className="border-neutral-400 my-4" />
                <CommentForm
                  rootId={_id}
                  parentId={_id}
                  community={community}
                />
              </>
            )}
            <hr className="border-neutral-400 my-4" />
            <Comments
              parentId={_id}
              rootId={_id}
              comments={comments}
              community={community}
            />
          </>
        ) : (
          <Link
            to={`/comments/${rootId || _id}`}
            state={{ background: location }}
            className="cursor-pointer"
          >
            <h2 className="text-xl mb-3 text-neutral-400">{title}</h2>
            <div className="mask-linear-gradient overflow-hidden max-h-60 pt-1 px-2 pb-2">
              <p className="text-sm leading-6 text-neutral-400">{body}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Post;
