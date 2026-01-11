import { useContext } from "react";
import AuthenticationContext from "../context/authentication-context";

const useAuth = () => {
  return useContext(AuthenticationContext);
};

export default useAuth;
