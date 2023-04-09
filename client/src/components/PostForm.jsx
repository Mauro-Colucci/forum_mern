import PostFormModal from "./PostFormModal";
import { useDispatch, useSelector } from "react-redux";
import { setPostOpen } from "../state/modalSlice";

const PostForm = () => {
  const postFormOpen = useSelector((state) => state.modal.postFormIsOpen);
  const dispatch = useDispatch();

  return (
    <div className="bg-neutral-800 border border-neutral-600 p-2 rounded-md text-neutral-400">
      <div className="flex gap-2 items-center">
        <img
          src="/img/noavatar.png"
          alt="Logged user profile picture."
          className="h-8 w-8 object-cover rounded-full"
        />
        <input
          type="text"
          className=" bg-neutral-700 border border-neutral-600 rounded-md outline-none py-2 px-3 text-sm w-full"
          placeholder="New Post"
          onFocus={() => dispatch(setPostOpen())}
        />
      </div>
      {postFormOpen && <PostFormModal />}
    </div>
  );
};
export default PostForm;
