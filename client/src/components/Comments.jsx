import { BiMessage } from "react-icons/Bi";
import moment from "moment";
import CommentForm from "./CommentForm";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Comments = (props) => {
  const comments = props.comments?.filter(
    (comment) => props.parentId === comment.parentId
  );
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {comments?.map((comment) => {
        const replies = props.comments.filter(
          (c) => c.parentId === comment._id
        );
        return (
          <div key={comment._id}>
            <div className="flex gap-2 items-center text-sm mb-1">
              <div className="bg-blue-300 w-10 h-10 rounded-full" />
              <span className="text-neutral-300">{comment.author}</span>
              <span className="text-neutral-400">
                - {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            <div className="border-l-2 border-neutral-500 px-3 pt-3 ml-4">
              <p className="pb-2 text-neutral-300">
                {/* {comment.body} */}
                <ReactMarkdown remarkPlugins={gfm} children={comment.body} />
              </p>
              <button
                className="flex gap-1 items-center text-sm px-2 py-1 mb-2 hover:bg-neutral-700 font-semibold text-neutral-500"
                onClick={() => setShowForm(comment._id)}
              >
                <BiMessage />
                Reply
              </button>
              {showForm === comment._id && (
                <CommentForm
                  closeComment={() => setShowForm(false)}
                  showHeader={false}
                  parentId={comment._id}
                  rootId={props.rootId}
                />
              )}
              {replies.length > 0 && (
                <Comments
                  comments={props.comments}
                  parentId={comment._id}
                  rootId={props.rootId}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Comments;
