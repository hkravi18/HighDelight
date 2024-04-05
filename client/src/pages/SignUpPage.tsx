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
import { SyncLoadingScreen } from "../components/LoadingScreen";
import signup from "../assets/signup.png";

const Input: React.ForwardRefExoticComponent<any> = InputTailwind;
const Button: React.ForwardRefExoticComponent<any> = ButtonTailwind;
const Card: React.ForwardRefExoticComponent<any> = CardTailwind;
const CardHeader: React.ForwardRefExoticComponent<any> = CardHeaderTailwind;
const CardBody: React.ForwardRefExoticComponent<any> = CardBodyTailwind;
const CardFooter: React.ForwardRefExoticComponent<any> = CardFooterTailwind;
const Typography: React.ForwardRefExoticComponent<any> = TypographyTailwind;

//interfaces
import { signInForm } from "../interfaces/authInterface";

//pages
import VerifyOtpPage from "./VerifyOtpPage";
import { useAuth } from "../hooks/useAuth";

// TODO: Change all the alert messages to toast messages
const SignUpPage = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<signInForm>({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    contactMode: "",
    email: "",
  });

  const [otp, setOtp] = useState<string>("");
  const [isOtpSend, setIsOtpSend] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMsg, setLoadingMsg] = useState<string>("");

  const handleOtpVerification = async () => {
    setLoading(true);
    setLoadingMsg("Verifying OTP...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/otp/verify`,
        { otp, email: form.email }
      );
      const { data } = response;

      if (data?.ok) {
        alert("OTP verification successful");
        console.log("OTP verification successful");
        // TODO: Handle successful OTP verification

        handleSignup();
      } else {
        alert("Error in OTP verification, Please try again");
        console.log(
          "ERROR (OTP verification): ",
          data?.error || "Error in OTP verification"
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("ERROR (OTP verification): ", err.message || "");
      } else {
        console.log("ERROR (OTP verification): An unknown error occurred");
      }
    }
    setLoading(false);
    setLoadingMsg("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    setLoading(true);
    setLoadingMsg("Signing Up...");
    try {
      const reqData: object = form;

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        reqData,
        {
          withCredentials: true,
        }
      );

      const { data } = response;

      if (data?.ok) {
        alert("Signup successful");

        setForm({
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          contactMode: "",
          email: "",
        });

        const user = data?.data?.user;

        //saving the data into cookies
        Cookies.set("hd-first-name", user?.firstName, { expires: 7 });
        Cookies.set("hd-last-name", user?.lastName, { expires: 7 });
        Cookies.set("hd-email", user?.email, { expires: 7 });
        Cookies.set("hd-contact-mode", user?.contactMode, { expires: 7 });

        dispatch({
          type: "LOGIN",
          payload: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            contactMode: user?.contactMode,
          },
        });

        navigate("/");
      } else {
        alert("Error in signup, Please try again");
        console.log("ERROR (signup): ", data?.error || "error in signup");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("ERROR (signup): ", err.message || "");
      } else {
        console.log("ERROR (signup): An unknown error occurred");
      }
    }
    setLoading(false);
    setLoadingMsg("");
  };

  const handleFieldsValidation = (): string => {
    if (form.firstName === "") {
      return "First Name is required";
    } else if (form.password === "") {
      return "Password is required";
    } else if (form.confirmPassword === "") {
      return "Confirm Password is required";
    } else if (form.contactMode === "") {
      return "Contact Mode is required";
    } else if (form.email === "") {
      return "Email is required";
    }

    if (form.confirmPassword !== form.password) {
      return "Password and Confirm Password should be same";
    }
    return "";
  };

  const handleOTPStart = async () => {
    const validationStr: string = handleFieldsValidation();
    if (validationStr.length !== 0) {
      alert(`Error: ${validationStr}`);
      return;
    }

    //send otp to user's email
    setLoading(true);
    setLoadingMsg("Sending OTP...");
    try {
      const reqData: object = {
        email: form.email,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/otp/send`,
        reqData,
        {
          withCredentials: true,
        }
      );

      const { data } = response;

      if (data?.ok) {
        alert("OTP send successfully");
        console.log("OTP send successfully");

        setIsOtpSend(() => true);
      } else {
        alert("Error in sending OTP, Please try again");
        console.log("ERROR (send-otp): ", data?.error || "error in signup");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("ERROR (send-otp): ", err.message || "");
      } else {
        console.log("ERROR (send-otp): An unknown error occurred");
      }
    }
    setLoading(false);
    setLoadingMsg("");
  };

  return (
    <>
      {loading && (
        <SyncLoadingScreen
          message={loadingMsg || "Loading..."}
          messageColor="#000"
          loaderColor="#000"
        />
      )}
      {isOtpSend && !loading ? (
        <VerifyOtpPage
          otp={otp}
          setOtp={setOtp}
          valueLength={6}
          handleOtpVerification={handleOtpVerification}
          handleOTPStart={handleOTPStart}
        />
      ) : (
        <>
          <div className="md:flex md:flex-row flex-col justify-center align-center signup-container">
            <div className="signup-img-container">
              <img
                src={signup}
                alt="signup_illustration"
                className="signup-img"
              />
            </div>
            <div className="flex justify-center items-center w-screen h-screen signup-form-container">
              <Card className="w-96">
                <CardHeader
                  variant="gradient"
                  color="gray"
                  className="mb-4 grid h-28 place-items-center"
                >
                  <Typography variant="h3" color="white">
                    Let Us Know!
                  </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                  <Input
                    label="FirstName"
                    size="lg"
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e)
                    }
                  />
                  <Input
                    label="LastName"
                    size="lg"
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e)
                    }
                  />
                  <Input
                    label="Password"
                    size="lg"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e)
                    }
                  />
                  <Input
                    label="Confirm Password"
                    size="lg"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e)
                    }
                  />
                  <Input
                    label="ContactMode"
                    size="lg"
                    name="contactMode"
                    type="text"
                    value={form.contactMode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e)
                    }
                  />
                  <Input
                    label="Email"
                    size="lg"
                    name="email"
                    type="text"
                    value={form.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e)
                    }
                  />
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    variant="gradient"
                    fullWidth
                    onClick={() => handleOTPStart()}
                  >
                    Send OTP
                  </Button>
                  <Typography
                    variant="small"
                    className="mt-6 flex justify-center"
                  >
                    Already have an account?
                    <Typography
                      as="a"
                      href="/signin"
                      variant="small"
                      color="blue-gray"
                      className="ml-1 font-bold"
                    >
                      Login
                    </Typography>
                  </Typography>
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SignUpPage;
