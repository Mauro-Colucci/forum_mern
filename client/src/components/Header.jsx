import { useState } from "react";
import {
  AiOutlineMessage,
  AiOutlineBell,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineDown,
  AiOutlineUser,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";
import Button from "./Button";
import useOutsideClick from "../hooks/useOutsideClick";
import newRequest from "../utils/newRequest";
import AuthModal from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../state/authSlice";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import PostFormModal from "./PostFormModal";
import CreateCommunity from "./CreateCommunity";
import { setPostOpen } from "../state/modalSlice";

const Header = () => {
  const [modalType, setModalType] = useState("");
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openCommunity, setOpenCommunity] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const postFormModal = useSelector((state) => state.modal.isPostFormOpen);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
    setSearch("");
  };

  const user = useAuth();

  const clickLogin = () => {
    setModalType("Log In");
    setModalOpen(!modalOpen);
    setOpen(false);
  };

  const clickSignUp = () => {
    setModalType("Sign Up");
    setModalOpen(!modalOpen);
  };

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      dispatch(logOut());
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const ref = useOutsideClick(() => setOpen(false));
  const addReff = useOutsideClick(() => setOpenAdd(false));

  return (
    <header className="fixed right-0 left-0 top-0 bg-neutral-900 z-50 h-12">
      <div className="px-5 relative flex items-center h-full border-b border-neutral-700">
        <Link to="/" className="flex gap-2 items-center">
          <img
            src="/img/community.jpg"
            alt="E pluribus anus. Community icon."
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-neutral-200 font-bold text-xl">community</span>
        </Link>
        <div className="flex grow ml-2">
          <form
            className="bg-neutral-800 h-10 mx-auto rounded-full flex items-center grow gap-1 px-2 text-neutral-300 border border-neutral-700 max-w-2xl"
            onSubmit={handleSearch}
          >
            <AiOutlineSearch className="text-neutral-500" size="1.4rem" />
            <input
              type="text"
              className="bg-transparent outline-none text-sm w-full"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </form>
        </div>
        {!!user ? (
          <div className="hidden sm:flex items-center gap-4 text-neutral-300">
            <AiOutlineMessage size="1.4rem" />
            <AiOutlineBell size="1.4rem" />
            <div ref={addReff} className="relative flex">
              <button onClick={() => setOpenAdd(!openAdd)}>
                <AiOutlinePlus size="1.4rem" />
              </button>
              {openAdd && (
                <div className="absolute top-8 right-0 bg-neutral-900 border border-neutral-700 z-10 rounded-md text-neutral-400 overflow-hidden">
                  <button
                    className="flex items-center gap-2 w-48 py-2 px-3 text-sm hover:bg-neutral-300 hover:text-black"
                    onClick={() => {
                      dispatch(setPostOpen());
                      setOpenAdd(false);
                    }}
                  >
                    <AiOutlinePlus size="1.2rem" />
                    Create Post
                  </button>
                  <button
                    className="flex items-center gap-2 w-48 py-2 px-3 text-sm hover:bg-neutral-300 hover:text-black"
                    onClick={() => {
                      setOpenCommunity((prev) => !prev);
                      setOpenAdd(false);
                    }}
                  >
                    <AiOutlinePlus size="1.2rem" />
                    Create Community
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden sm:flex gap-2">
            <Button onClick={clickLogin}>Log In</Button>
            <Button outline onClick={clickSignUp}>
              Sign Up
            </Button>
          </div>
        )}

        <div ref={ref}>
          <button
            className="flex items-center gap-2 px-2 py-1 border border-transparent ml-2 hover:border-neutral-700 rounded-md"
            onClick={() => setOpen(!open)}
          >
            {!!user ? (
              <>
                <img
                  src="/img/noavatar.png"
                  alt="User profile picture."
                  className="m-1 h-6 rounded-full object-cover"
                />
                <p className="text-neutral-300">{user?.username}</p>
              </>
            ) : (
              <AiOutlineUser className="text-neutral-500" size="1.5rem" />
            )}
            <AiOutlineDown className="text-neutral-500" size=".75rem" />
          </button>
          {open && (
            <div className="absolute top-11 right-0 bg-neutral-900 border border-neutral-700 z-10 rounded-md text-neutral-400 overflow-hidden">
              {/**links */}
              {!!user ? (
                <button
                  className="flex items-center gap-2 w-48 py-2 px-3 text-sm hover:bg-neutral-300 hover:text-black"
                  onClick={handleLogout}
                >
                  <AiOutlineLogout size="1.2rem" />
                  Logout
                </button>
              ) : (
                <button
                  className="flex items-center gap-2 w-48 py-2 px-3 text-sm hover:bg-neutral-300 hover:text-black"
                  onClick={clickLogin}
                >
                  <AiOutlineLogin size="1.2rem" /> Log In / Sign Up
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {modalOpen && (
        <AuthModal
          modalType={modalType}
          setModalType={setModalType}
          onClick={() => setModalOpen(false)}
        />
      )}
      {postFormModal && <PostFormModal />}
      {openCommunity && (
        <CreateCommunity onClick={() => setOpenCommunity(false)} />
      )}
    </header>
  );
};
export default Header;
