import { BiDownvote, BiUpvote } from "react-icons/Bi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import useAuth from "../hooks/useAuth";

const Voting = ({ commentId, upVotes, downVotes, col }) => {
  const user = useAuth();
  const upVoteClass = upVotes.includes(user?.id)
    ? "text-orange-600"
    : "hover:text-orange-600";
  const downVoteClass = downVotes.includes(user?.id)
    ? "text-blue-600"
    : "hover:text-blue-600";
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (vote) => newRequest.patch(`/comments/${commentId}/${vote}`),
    onSuccess: () => queryClient.invalidateQueries(["comment"]),
  });

  const handleVote = (vote) => {
    mutation.mutate(vote);
  };

  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumSignificantDigits: 3,
  });

  return (
    <div
      className={`flex ${
        col ? "flex-col-reverse" : ""
      } items-center gap-1 text-neutral-500`}
    >
      {!!user && (
        <button
          className={downVoteClass}
          onClick={() => handleVote("downVote")}
        >
          <BiDownvote size="1.25rem" />
        </button>
      )}
      <span className="font-bold text-sm leading-4 text-neutral-300">
        {formatter.format(upVotes.length - downVotes.length)}
      </span>
      {!!user && (
        <button className={upVoteClass} onClick={() => handleVote("upVote")}>
          <BiUpvote size="1.25rem" />
        </button>
      )}
    </div>
  );
};
export default Voting;
