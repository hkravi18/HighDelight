import {
  Input as InputTailwind,
  Button as ButtonTailwind,
  Card as CardTailwind,
  CardBody as CardBodyTailwind,
  CardFooter as CardFooterTailwind,
} from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";

import signin from "../assets/signin.png";

const Input: React.ForwardRefExoticComponent<any> = InputTailwind;
const Button: React.ForwardRefExoticComponent<any> = ButtonTailwind;
const Card: React.ForwardRefExoticComponent<any> = CardTailwind;
const CardBody: React.ForwardRefExoticComponent<any> = CardBodyTailwind;
const CardFooter: React.ForwardRefExoticComponent<any> = CardFooterTailwind;

import "../styles/SignInPage.css";
import { useAuth } from "../hooks/useAuth";
import { SyncLoadingScreen } from "../components/LoadingScreen";

// TODO: Change all the alert messages to toast messages
const SignInPage = () => {
  const { dispatch } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordType, setPasswordType] = useState<string>("password");

  const navigate = useNavigate();

  const handleFieldsValidation = (): string => {
    if (email === "") {
      return "Email is required";
    } else if (password === "") {
      return "Password is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid Email, Please enter a valid email address";
    }

    return "";
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const validationStr = handleFieldsValidation();
    if (validationStr.length !== 0) {
      // alert(`Error: ${validationStr}`);
      toast.error(validationStr);
      return;
    }

    e.preventDefault();
    setLoading(true);
    try {
      const reqData: object = {
        email,
        password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        reqData,
        {
          withCredentials: true,
        }
      );

      const { data } = response;

      if (data?.ok) {
        // alert("Login successful");
        toast.success("Login successful");

        const user = data?.data?.user;

        //saving the data into cookies
        Cookies.set("hd-first-name", user?.firstName, { expires: 7 });
        Cookies.set("hd-last-name", user?.lastName, { expires: 7 });
        Cookies.set("hd-email", user?.email, { expires: 7 });
        Cookies.set("hd-contact-mode", user?.contactMode, { expires: 7 });

        dispatch({
          type: "LOGIN",
          payload: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            contactMode: user.contactMode,
          },
        });
        // console.log("user : ", user);

        setEmail("");
        setPassword("");

        navigate("/");
      } else {
        // alert("Error in login, Please try again");
        toast.error("Error in login, Please try again");
        console.log("ERROR (signin): ", data?.error || "error in login");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("ERROR (signin): ", err.message || "");
      } else {
        console.log("ERROR (signin): An unknown error occurred");
      }
      toast.error("Error in login, Please try again");
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <SyncLoadingScreen
          message="Logging in..."
          messageColor="#000"
          loaderColor="#000"
        />
      ) : (
        <div className="md:flex md:flex-row flex-col justify-around signin-container">
          <div className="signin-img-container">
            <img
              src={signin}
              alt="signin_illustration"
              className="signin-img"
            />
          </div>
          <div className="flex justify-center items-center w-screen h-screen signin-form">
            <Card className="w-96 signin-form-container">
              <h3 className="signin-title">
                Fill What We Know <span>!</span>
              </h3>
              <CardBody className="flex flex-col gap-4">
                <Input
                  variant="standard"
                  label="Email"
                  size="lg"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className="border-none signin-input"
                />

                <div className="signin-password">
                  <Input
                    variant="standard"
                    label="Password"
                    size="lg"
                    name="password"
                    type={passwordType}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    className="border-none"
                  />
                  <div className="signin-icon">
                    {showPassword ? (
                      <EyeIcon
                        className="eye-icon w-4 h-4"
                        onClick={() => {
                          passwordType === "password"
                            ? setPasswordType("text")
                            : setPasswordType("password");
                          setShowPassword(!showPassword);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        className="eye-slash-icon w-4 h-4"
                        onClick={() => {
                          passwordType === "password"
                            ? setPasswordType("text")
                            : setPasswordType("password");
                          setShowPassword(!showPassword);
                        }}
                      />
                    )}
                  </div>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  variant="gradient"
                  fullWidth
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSubmit(e)
                  }
                  className="mt-2 mb-2 signin-btn1"
                  style={{
                    background: "linear-gradient(to right, #3a244a, #3a244a)",
                    padding: "10px",
                    textTransform: "none",
                    fontSize: "14px",
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="gradient"
                  fullWidth
                  onClick={() => navigate("/signup")}
                  className="mt-2 mb-2 signin-btn2"
                  style={{
                    background: "linear-gradient(to right, #3a244a, #3a244a)",
                    padding: "10px",
                    textTransform: "none",
                    fontSize: "14px",
                  }}
                >
                  Sign Up
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      <Toaster richColors closeButton position="top-center" />
    </>
  );
};

export default SignInPage;
