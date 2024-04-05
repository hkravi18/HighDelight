import {
  Input as InputTailwind,
  Button as ButtonTailwind,
  Card as CardTailwind,
  CardHeader as CardHeaderTailwind,
  CardBody as CardBodyTailwind,
  CardFooter as CardFooterTailwind,
  Typography as TypographyTailwind,
} from "@material-tailwind/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import signin from "../assets/signin.png";

const Input: React.ForwardRefExoticComponent<any> = InputTailwind;
const Button: React.ForwardRefExoticComponent<any> = ButtonTailwind;
const Card: React.ForwardRefExoticComponent<any> = CardTailwind;
const CardHeader: React.ForwardRefExoticComponent<any> = CardHeaderTailwind;
const CardBody: React.ForwardRefExoticComponent<any> = CardBodyTailwind;
const CardFooter: React.ForwardRefExoticComponent<any> = CardFooterTailwind;
const Typography: React.ForwardRefExoticComponent<any> = TypographyTailwind;

import "../styles/SignInPage.css";
import { useAuth } from "../hooks/useAuth";
import { SyncLoadingScreen } from "../components/LoadingScreen";

// TODO: Change all the alert messages to toast messages
const SignInPage = () => {
  const { dispatch } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleFieldsValidation = (): string => {
    if (email === "") {
      return "Email is required";
    } else if (password === "") {
      return "Password is required";
    }

    return "";
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const validationStr = handleFieldsValidation();
    if (validationStr.length !== 0) {
      alert(`Error: ${validationStr}`);
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
        alert("Login successful");

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
        console.log("user : ", user);

        setEmail("");
        setPassword("");

        navigate("/");
      } else {
        alert("Error in login, Please try again");
        console.log("ERROR (signin): ", data?.error || "error in login");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("ERROR (signin): ", err.message || "");
      } else {
        console.log("ERROR (signin): An unknown error occurred");
      }
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
        <div className="md:flex md:flex-row flex-col">
          <div>
            <img src={signin} alt="signIn_illustration" />
          </div>
          <div className="flex justify-center items-center w-screen h-screen">
            <Card className="w-96">
              <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  Fill What We Know!
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Typography
                  color="blue-gray"
                  className="-mb-2 ml-2 font-medium"
                >
                  Email<span className="text-red-800">*</span> :
                </Typography>
                <Input
                  label="Email"
                  size="lg"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
                <Typography
                  color="blue-gray"
                  className="-mb-2 ml-2 font-medium"
                >
                  Password<span className="text-red-800">*</span> :
                </Typography>
                <Input
                  label="Password"
                  size="lg"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  variant="gradient"
                  fullWidth
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSubmit(e)
                  }
                  className="mt-2 mb-2"
                >
                  Sign In
                </Button>
                <Button
                  variant="gradient"
                  fullWidth
                  onClick={() => navigate("/signup")}
                  className="mt-2 mb-2"
                >
                  Sign Up
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInPage;
