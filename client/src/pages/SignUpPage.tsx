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

//components
import { SyncLoadingScreen } from "../components/LoadingScreen";
import SelectOption from "../components/SelectOption";

//assets
import signup from "../assets/signup.png";

const Input: React.ForwardRefExoticComponent<any> = InputTailwind;
const Button: React.ForwardRefExoticComponent<any> = ButtonTailwind;
const Card: React.ForwardRefExoticComponent<any> = CardTailwind;
const CardBody: React.ForwardRefExoticComponent<any> = CardBodyTailwind;
const CardFooter: React.ForwardRefExoticComponent<any> = CardFooterTailwind;

import "../styles/SignUpPage.css";

//interfaces
import {
  SignUpForm as SignUpFormInterface,
  SelectOption as SelectOptionInterface,
} from "../interfaces/authInterface";

//pages
import VerifyOtpPage from "./VerifyOtpPage";
import { useAuth } from "../hooks/useAuth";

const options: SelectOptionInterface[] = [
  { value: "EMAIL", label: "Email" },
  { value: "MOBILE_NUMBER", label: "Mobile Number" },
];

const SignUpPage = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<SignUpFormInterface>({
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

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordType, setPasswordType] = useState<string>("password");

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [confirmPasswordType, setConfirmPasswordType] =
    useState<string>("password");

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
        // alert("OTP verification successful");
        toast.success("OTP verification successful");
        console.log("OTP verification successful");
        // TODO: Handle successful OTP verification

        handleSignup();
      } else {
        // alert("Error in OTP verification, Please try again");
        toast.error("Error in OTP verification, Please try again");
        console.log(
          "ERROR (OTP verification): ",
          data?.error || "Error in OTP verification"
        );
      }
    } catch (err) {
      let errMsg = "Error in OTP Verification, Please try again";
      if (err instanceof Error) {
        console.log("ERROR (OTP verification): ", err.message || "");
        if (axios.isAxiosError(err)) {
          errMsg = err?.response?.data?.error;
        }
      } else {
        console.log("ERROR (OTP verification): An unknown error occurred");
      }
      console.log("errMsg : ", errMsg);
      toast.error(errMsg);
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

  const handleSelectChange = (optionChoosed: string) => {
    setForm({
      ...form,
      contactMode: optionChoosed,
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
        // alert("Signup successful");
        toast.success("Signup successful");

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
        // alert("Error in signup, Please try again");
        toast.error("Error in signup, Please try again");
        console.log("ERROR (signup): ", data?.error || "error in signup");
      }
    } catch (err) {
      let errMsg = "Error in signup, Please try again";
      if (err instanceof Error) {
        console.log("ERROR (signup): ", err.message || "");
        if (axios.isAxiosError(err)) {
          errMsg = err?.response?.data?.error;
        }
      } else {
        console.log("ERROR (signup): An unknown error occurred");
      }
      toast.error(errMsg);
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "Invalid Email, Please enter a valid email address";
    }

    if (form.password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(form.firstName)) {
      return "Please enter a valid first name, it should contain only eng alphabets";
    }

    if (form.lastName !== "" && !nameRegex.test(form.lastName)) {
      return "Please enter a valid last name, it should contain only eng alphabets";
    }

    return "";
  };

  const handleOTPStart = async () => {
    const validationStr: string = handleFieldsValidation();
    if (validationStr.length !== 0) {
      // alert(`Error: ${validationStr}`);
      toast.error(validationStr);
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
        // alert("OTP send successfully");
        toast.success("OTP send successfully");
        console.log("OTP send successfully");

        setIsOtpSend(() => true);
      } else {
        // alert("Error in sending OTP, Please try again");
        toast.error("Error in sending OTP, Please try again");
        console.log("ERROR (send-otp): ", data?.error || "error in signup");
      }
    } catch (err) {
      let errMsg = "Error in sending OTP, Please try again";
      if (err instanceof Error) {
        console.log("ERROR (send-otp): ", err.message || "");
        if (axios.isAxiosError(err)) {
          errMsg = err?.response?.data?.error;
        }
      } else {
        console.log("ERROR (send-otp): An unknown error occurred");
      }
      toast.error(errMsg);
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
          <div className="md:flex md:flex-row flex-col signup-container">
            <div className="signup-img-container">
              <img
                src={signup}
                alt="signup_illustration"
                className="signup-img"
              />
            </div>
            <div className="flex justify-center items-center w-screen h-screen signup-form">
              <Card className="w-96 signup-form-container">
                {/* <CardHeader
                  variant="gradient"
                  className="mb-4 grid h-28 place-items-center"
                > */}
                <div className="signup-form-titles">
                  <h3 className="signup-title1">
                    Let Us Know <span>!</span>
                  </h3>
                  <h6
                    className="signup-title2"
                    onClick={() => navigate("/signin")}
                  >
                    Sign<span>In</span>
                  </h6>
                </div>
                {/* </CardHeader> */}
                <CardBody className="flex flex-col gap-4">
                  <Input
                    variant="standard"
                    label="First Name"
                    size="lg"
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e)
                    }
                    className="border-none bg-white"
                  />
                  <Input
                    variant="standard"
                    label="Last Name"
                    size="lg"
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e)
                    }
                    className="border-none"
                  />
                  <div className="signup-password">
                    <Input
                      variant="standard"
                      label="Password"
                      size="lg"
                      name="password"
                      type={passwordType}
                      value={form.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e)
                      }
                      className="border-none"
                    />
                    <div className="signup-icon">
                      {showPassword ? (
                        <EyeIcon
                          className="eye-icon w-4 h-4 mr-3"
                          onClick={() => {
                            passwordType === "password"
                              ? setPasswordType("text")
                              : setPasswordType("password");
                            setShowPassword(!showPassword);
                          }}
                        />
                      ) : (
                        <EyeSlashIcon
                          className="eye-slash-icon w-4 h-4 mr-3"
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
                  <div className="signup-confirm-password signup-icon">
                    <Input
                      variant="standard"
                      label="Retype Password"
                      size="lg"
                      name="confirmPassword"
                      type={confirmPasswordType}
                      value={form.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e)
                      }
                      className="border-none"
                    />
                    {showConfirmPassword ? (
                      <EyeIcon
                        className="eye-icon w-4 h-4 mr-3"
                        onClick={() => {
                          confirmPasswordType === "password"
                            ? setConfirmPasswordType("text")
                            : setConfirmPasswordType("password");
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        className="eye-icon w-4 h-4 mr-3"
                        onClick={() => {
                          confirmPasswordType === "password"
                            ? setConfirmPasswordType("text")
                            : setConfirmPasswordType("password");
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                      />
                    )}
                  </div>
                  <SelectOption
                    optionsArr={options}
                    handleSelectChange={handleSelectChange}
                  />
                  <Input
                    variant="standard"
                    label="Email"
                    size="lg"
                    name="email"
                    type="text"
                    value={form.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e)
                    }
                    className="border-none"
                  />
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    variant="gradient"
                    fullWidth
                    onClick={() => handleOTPStart()}
                    style={{
                      background: "linear-gradient(to right, #3a244a, #3a244a)",
                      padding: "10px",
                      textTransform: "none",
                      fontSize: "14px",
                    }}
                  >
                    Send OTP
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          <Toaster richColors closeButton position="top-center" />
        </>
      )}
    </>
  );
};

export default SignUpPage;
