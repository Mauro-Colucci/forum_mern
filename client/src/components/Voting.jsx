import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import useAuth from "../hooks/useAuth";

const Voting = ({ commentId, upVotes, downVotes, col }) => {
  const user = useAuth();
  const upVoteClass = upVotes.includes(user?.id)
    ? "text-orange-600"
    : "hover:text-neutral-200";
  const downVoteClass = downVotes.includes(user?.id)
    ? "text-orange-600"
    : "hover:text-neutral-200";
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (vote) => newRequest.patch(`/comments/${commentId}/${vote}`),
    onSuccess: () => queryClient.invalidateQueries(["comment"]),
  });

  const handleVote = (vote) => {
    mutation.mutate(vote);
  };

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
          <AiOutlineArrowDown />
        </button>
      )}
      <span className="font-semibold text-neutral-300">
        {upVotes.length - downVotes.length}
      </span>
      {!!user && (
        <button className={upVoteClass} onClick={() => handleVote("upVote")}>
          <AiOutlineArrowUp />
        </button>
      )}
    </div>
  );
};
export default Voting;
