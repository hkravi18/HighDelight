import Cookies from "js-cookie";
import { useAuth } from "./useAuth";
import axios from "axios";
import { useState } from "react";

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const logout = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          withCredentials: true,
        }
      );

      const { data } = res;
      if (data.ok) {
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

        // console.log("httpOnly cookies deleted successfully");
      } else {
        setError(data?.error || "Error in logging out");
        console.log("Error in logging out");
      }
    } catch (err) {
      let errMsg = "Error in logging out, Please try again";
      if (err instanceof Error) {
        if (axios.isAxiosError(err)) {
          errMsg = err?.response?.data?.error;
        } else {
          (errMsg = "ERROR (logout): "), err.message || "";
        }
      } else {
        errMsg = "ERROR (logout): An unknown error occurred";
      }

      console.log(errMsg);
      setError(errMsg);
    }
    setLoading(false);
  };

  return { logout, loading, error };
};
