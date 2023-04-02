import { useState } from "react";
import PostFormModal from "./PostFormModal";

const PostForm = () => {
  const [modalOpen, setModalOpen] = useState(false);

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
          onFocus={() => setModalOpen((prev) => !prev)}
        />
      </div>
      {modalOpen && <PostFormModal onClick={() => setModalOpen(false)} />}
    </div>
  );
};
export default PostForm;
