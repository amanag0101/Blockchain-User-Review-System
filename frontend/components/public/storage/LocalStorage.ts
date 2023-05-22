import { UserResponse } from "../authentication/interface/UserResponse";
import { Theme } from "../constants/Theme";

export const setThemeInLocalStorage = (theme: Theme) => {
  localStorage.setItem("theme", theme);
};

export const getThemeFromLocalStorage = (): Theme => {
  const theme = localStorage.getItem("theme");
  return theme === "dark" ? Theme.DARK : Theme.LIGHT;
};

export const setLoggedInUserInLocalStorage = (user: UserResponse) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
};

export const getLoggedInUserFromLocalStorage = (): UserResponse => {
  const user = localStorage.getItem("loggedInUser");
  return user !== null ? JSON.parse(user) : null;
};

export const isUserLoggedIn = (): boolean => {
  return localStorage.getItem("loggedInUser") === null ? false : true;
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("loggedInUser");
};
