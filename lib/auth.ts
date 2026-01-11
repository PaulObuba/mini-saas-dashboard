
export const USER_KEY = "saas_user";

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const isLoggedIn = () => !!getUser();
