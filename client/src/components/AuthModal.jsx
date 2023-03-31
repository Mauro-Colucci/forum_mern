import Input from "./Input";
import Button from "./Button";
import useOutsideClick from "../hooks/useOutsideClick";
import newRequest from "../utils/newRequest";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../state/authSlice";
//import { useNavigate } from "react-router-dom";

const AuthModal = ({ onClick, modalType, setModalType }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  //const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [username, email, password, confirmPassword, modalType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "Log In") {
        const { data } = await newRequest.post("/auth/login", {
          username,
          password,
        });
        //sets modalOpen to false
        onClick();
        dispatch(setCredentials({ data }));
        /* localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/"); */
      }
      if (modalType === "Sign Up") {
        await newRequest.post("/auth/register", {
          username,
          email,
          password,
          confirmPassword,
        });
        setModalType("Log In");
      }
    } catch (err) {
      console.error(err);
      setError(err.response.data);
    }
  };

  const ref = useOutsideClick(onClick);
  return (
    <div className="h-screen w-screen bg-[rgba(0,0,0,.6)] absolute top-0 left-0 flex items-center justify-center">
      <div
        className="bg-neutral-900 text-neutral-300 p-6 w-full max-w-sm max-h-[600px] rounded-md border border-neutral-800"
        ref={ref}
      >
        <div className="flex flex-col h-full gap-8 max-w-[280px] m-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">{modalType}</h1>
            <span className="cursor-pointer" onClick={onClick}>
              X
            </span>
          </div>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {modalType === "Sign Up" && (
              <Input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {modalType === "Sign Up" && (
              <Input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <Button className="lg:w-full text-base py-2">{modalType}</Button>
            {!!error && <span className="text-red-700">{error}</span>}
          </form>
          {modalType === "Log In" ? (
            <span className="text-sm text-neutral-500">
              New to Reddit?{" "}
              <button
                className="underline font-semibold text-neutral-400"
                onClick={() => setModalType("Sign Up")}
              >
                SIGN UP
              </button>
            </span>
          ) : (
            <span className="text-sm text-neutral-500">
              Already have an account?{" "}
              <button
                className="underline font-semibold text-neutral-400"
                onClick={() => setModalType("Log In")}
              >
                LOG IN
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthModal;
