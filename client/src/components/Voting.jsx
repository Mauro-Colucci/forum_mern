import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

const Voting = ({ commentId }) => {
  const queryClient = useQueryClient();

  /* 
      if (!state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.push(action.payload);
        state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex(userId => userId === action.payload), 1);
  */

  const mutation = useMutation({
    mutationFn: () => newRequest.post(`/vote/${commentId}`, comment),
    onSuccess: () => queryClient.invalidateQueries(["vote"]),
  });

  return (
    <div className="flex items-center gap-1 text-neutral-500">
      <button className=" hover:text-neutral-200">
        <AiOutlineArrowDown />
      </button>{" "}
      <span className="font-semibold text-neutral-300">7</span>
      <button className=" hover:text-neutral-200">
        <AiOutlineArrowUp />
      </button>{" "}
    </div>
  );
};
export default Voting;
