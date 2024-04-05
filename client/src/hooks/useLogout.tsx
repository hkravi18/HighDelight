import Cookies from "js-cookie";
import { useAuth } from "./useAuth";

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuth();

  const logout = () => {
    Cookies.remove("hd-first-name");
    Cookies.remove("hd-last-name");
    Cookies.remove("hd-email");
    Cookies.remove("hd-contact-mode");

    authDispatch({
      type: "LOGOUT",
      payload: {
        firstName: null,
        lastName: null,
        contactMode: null,
        email: null,
      },
    });
  };

  return { logout };
};
