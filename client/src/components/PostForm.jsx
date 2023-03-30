const PostForm = () => {
  return (
    <div className="bg-neutral-800 border border-neutral-600 p-2 rounded-md max-w-7xl mx-auto text-neutral-400 w-full">
      <div className="flex gap-2 items-center">
        <img
          src="./img/noavatar.png"
          alt="Logged user profile picture."
          className="h-8 w-8 object-cover rounded-full"
        />
        <form
          className="border bg-neutral-700 flex grow border-neutral-600 rounded-md"
          //onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="bg-transparent outline-none py-2 px-3 text-sm w-full"
            placeholder="New Post"
          />
        </form>
      </div>
    </div>
  );
};
export default PostForm;
