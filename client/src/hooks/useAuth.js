import { useSelector } from "react-redux";
import { selectCurrentToken } from "../state/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) return jwtDecode(token);
};

export default useAuth;
