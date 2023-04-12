import { BiMessage } from "react-icons/Bi";
import { AiOutlineExpandAlt } from "react-icons/ai";
import moment from "moment";
import CommentForm from "./CommentForm";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Voting from "./Voting";
import useAuth from "../hooks/useAuth";

const Comments = (props) => {
  const comments = props.comments?.filter(
    (comment) => props.parentId === comment.parentId
  );
  const [showForm, setShowForm] = useState([]);
  const [hideComment, setHideComment] = useState([]);

  const user = useAuth();

  return (
    <>
      {comments?.map((comment) => {
        const replies = props.comments.filter(
          (c) => c.parentId === comment._id
        );
        return (
          <div key={comment._id}>
            <div className="flex gap-2 mt-3">
              <button
                className={`text-cyan-400 self-start mt-2 ${
                  hideComment.includes(comment._id) ? "" : "hidden"
                }`}
                onClick={() =>
                  setHideComment((prev) =>
                    prev.filter((id) => id !== comment._id)
                  )
                }
              >
                <AiOutlineExpandAlt size="1.2rem" />
              </button>
              <img
                src="/img/noavatar.png"
                alt="User profile picture."
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="">
                <div className="flex gap-2 items-center text-sm mt-2 mb-1">
                  <span className="text-neutral-300 font-semibold">
                    {comment.author}
                  </span>
                  <span className="text-neutral-400">
                    · {moment(comment.createdAt).fromNow()}
                  </span>
                </div>
                {!hideComment.includes(comment._id) && (
                  <>
                    <ReactMarkdown
                      className="pb-2 text-neutral-300 break-word"
                      remarkPlugins={[gfm]}
                      children={comment.body}
                    />
                    <div className="flex gap-2 mb-2">
                      <Voting
                        commentId={comment._id}
                        upVotes={comment.upVotes}
                        downVotes={comment.downVotes}
                      />
                      {!!user && (
                        <button
                          className="flex gap-1 items-center text-sm px-2 py-1 hover:bg-neutral-700 font-semibold text-neutral-500"
                          onClick={() =>
                            setShowForm((prev) => [...prev, comment._id])
                          }
                        >
                          <BiMessage size="1.2rem" />
                          Reply
                        </button>
                      )}
                    </div>
                  </>
                )}
                {showForm.includes(comment._id) && (
                  <CommentForm
                    closeComment={() =>
                      setShowForm((prev) =>
                        prev.filter((id) => id !== comment._id)
                      )
                    }
                    showHeader={false}
                    parentId={comment._id}
                    rootId={props.rootId}
                    community={props.community}
                  />
                )}
              </div>
            </div>
            {replies.length > 0 && (
              <>
                <div
                  className={`flex relative ${
                    hideComment.includes(comment._id) ? "hidden" : ""
                  }`}
                >
                  <button
                    aria-label="Hide Replies"
                    className="w-7 cursor-pointer before:bg-neutral-500 hover:before:bg-neutral-300 focus-visible:before:bg-neutral-300 before:absolute before:w-[2px] before:top-0 before:bottom-0 before:left-4 before:transition duration-100 ease-in-out before:bg"
                    onClick={() =>
                      setHideComment((prev) => [...prev, comment._id])
                    }
                  />
                  <div className="pl-2 w-11/12">
                    <Comments
                      comments={props.comments}
                      parentId={comment._id}
                      rootId={props.rootId}
                      community={props.community}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};
export default Comments;
