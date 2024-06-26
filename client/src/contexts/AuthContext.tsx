import { createContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";

interface Action {
  type: string;
  payload: {
    firstName: string | null;
    lastName: string | null;
    contactMode: string | null;
    email: string | null;
  };
}

interface AuthState {
  firstName: string | null;
  lastName: string | null;
  contactMode: string | null;
  email: string | null;
}

interface AuthContextType extends AuthState {
  dispatch: React.Dispatch<Action>;
}

const initialState: AuthState = {
  firstName: null,
  lastName: null,
  contactMode: null,
  email: null,
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  dispatch: () => null,
});

export const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...action.payload,
      };
    case "LOGOUT":
      return {
        firstName: null,
        lastName: null,
        contactMode: null,
        email: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    firstName: null,
    lastName: null,
    contactMode: null,
    email: null,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const firstName = Cookies.get("hd-first-name");
      const lastName = Cookies.get("hd-last-name");
      const email = Cookies.get("hd-email");
      const contactMode = Cookies.get("hd-contact-mode");

      if (firstName && lastName && email && contactMode) {
        dispatch({
          type: "LOGIN",
          payload: {
            firstName,
            lastName,
            contactMode,
            email,
          },
        });
      }
    };
    fetchDetails();
  }, [state.firstName, state.lastName, state.email, state.contactMode]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
