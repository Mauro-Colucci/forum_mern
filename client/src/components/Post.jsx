import moment from "moment";
import { Link, useLocation } from "react-router-dom";

const Post = ({ _id, title, body, author, createdAt, full = false }) => {
  const location = useLocation();
  return (
    <div
      className={`${
        location.state ? "" : "border border-neutral-700 bg-neutral-800"
      } rounded-md p-2 ${!full && "hover:border-neutral-400"}`}
    >
      <h6 className="text-neutral-500 text-xs mb-1">
        Posted by u/{author} {moment(createdAt).fromNow()}
      </h6>
      {full ? (
        <>
          <h2 className="text-xl mb-3 text-neutral-300">{title}</h2>
          <div className="pt-1 px-2 pb-2">
            <p className="text-sm leading-6 text-neutral-400">{body}</p>
          </div>
        </>
      ) : (
        <Link
          to={`/comments/${_id}`}
          state={{ background: location }}
          className="cursor-pointer"
        >
          <h2 className="text-xl mb-3 text-neutral-300">{title}</h2>
          <div className="mask-linear-gradient overflow-hidden max-h-60 pt-1 px-2 pb-2">
            <p className="text-sm leading-6 text-neutral-400">{body}</p>
          </div>
        </Link>
      )}
    </div>
  );
};
export default Post;
