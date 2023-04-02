import PostForm from "../components/PostForm";
import Posts from "../components/Posts";
import SubHeader from "../components/SubHeader";
import useAuth from "../hooks/useAuth";

const Subreddit = () => {
  const user = useAuth();

  return (
    <>
      <SubHeader />
      <div className="flex flex-col gap-4 py-4 max-w-5xl mx-auto">
        {!!user && <PostForm />}
        <Posts />
      </div>
    </>
  );
};
export default Subreddit;
