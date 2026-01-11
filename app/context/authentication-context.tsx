"use client";

import {
  createContext,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { User } from "../types/user";

interface AuthUser {
  user: User;
  token: string;
}

interface AuthContextValue {
  authUser: { user: User | null; token: string } | null;
  isAuthenticated: boolean;
  setAuthUser: (authUser: { user: User; token: string } | null) => void;
  removeAuthUser: () => void;
}

const AuthenticationContext = createContext<AuthContextValue>({
  authUser: null,
  isAuthenticated: false,
  setAuthUser: () => {},
  removeAuthUser: () => {},
});

export const getAuthUser = (): { user: User; token: string } | null => {
  if (typeof window === "undefined") return null; // server guard

  const user = localStorage.getItem("saas_user");
  const parsedUser = user ? JSON.parse(user) : null;
  return parsedUser;
};

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(
    () => getAuthUser() || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!getAuthUser()?.token
  );

  const setAuthUserHandler = useCallback(
    (value: { user: User; token: string } | null) => {
      if (value) {
        localStorage.setItem("saas_user", JSON.stringify(value));
        setAuthUser(value);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("saas_user");
        setAuthUser(null);
        setIsAuthenticated(false);
      }
    },
    []
  );

  const removeAuthUserHandler = useCallback(() => {
    localStorage.removeItem("saas_user");
    setAuthUser(null);
    setIsAuthenticated(false);
  }, []);

  const values = useMemo(
    () => ({
      authUser,
      isAuthenticated,
      setAuthUser: setAuthUserHandler,
      removeAuthUser: removeAuthUserHandler,
    }),
    [authUser, isAuthenticated, setAuthUserHandler, removeAuthUserHandler]
  );

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
