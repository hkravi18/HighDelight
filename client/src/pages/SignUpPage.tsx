import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Input as InputTailwind, Button as ButtonTailwind } from "@material-tailwind/react";
import axios from "axios";

const Button: React.ForwardRefExoticComponent<any> = ButtonTailwind;
const Input: React.ForwardRefExoticComponent<any> = InputTailwind;

//interfaces
import { signInForm } from "../interfaces/authInterface";

//pages
import VerifyOtpPage from "./VerifyOtpPage";

// TODO: Change all the alert messages to toast messages
const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<signInForm>({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    contactMode: "",
    email: ""
  });

  const [otp, setOtp] = useState<string>("");
  const [isOtpSend, setIsOtpSend] = useState<boolean>(false);

  const handleOtpVerification = async () => {
    setOtp(otp);
    //TODO: handle otp verification
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/otp/verify`, { otp });
      const { data } = response;

      if (data?.ok) {
        alert("OTP verification successful");
        console.log("OTP verification successful");
        // TODO: Handle successful OTP verification

        handleSignup();
      } else {
        alert("Error in OTP verification, Please try again");
        console.log("ERROR (OTP verification): ", data?.error || "Error in OTP verification");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("ERROR (OTP verification): ", err.message || "");
      } else {
        console.log('ERROR (OTP verification): An unknown error occurred');
      }
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const handleSignup = async () => {
    try {
      const reqData: Object = form;

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, reqData, {
        withCredentials: true
      });

      const { data } = response;

      if (data?.ok) {
        alert("Signup successful");

        setForm({
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          contactMode: "",
          email: ""
        });

        navigate("/welcome");
      } else {
        alert("Error in signup, Please try again");
        console.log("ERROR (signup): ", data?.error || "error in signup");
      }

    } catch (err) {
      if (err instanceof Error) {
        console.log("ERROR (signup): ", err.message || "");
      } else {
        console.log('ERROR (signup): An unknown error occurred');
      }
    }
  }

  return (
    <>
      {isOtpSend ? <VerifyOtpPage
        valueLength={6}
        onChange={setOtp}
        handleOtpVerification={handleOtpVerification}
      /> : <form>
        <Input
          id="firstName"
          size="md"
          label="FirstName"
          name="firstName"
          type="text"
          value={form.firstName}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)
          }
        />
        <Input
          id="lastName"
          size="md"
          label="LastName"
          name="lastName"
          type="text"
          value={form.lastName}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)
          }
        />
        <Input
          id="password"
          size="md"
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)
          }
        />
        <Input
          id="confirmPassword"
          size="md"
          label="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)
          }
        />
        <Input
          id="contactMode"
          size="md"
          label="contactMode"
          name="contactMode"
          type="text"
          value={form.contactMode}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)
          }
        />
        <Input
          id="email"
          size="md"
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)
          }
        />
        <Button
          type="submit"
          onClick={() => setIsOtpSend(!isOtpSend)}
        >Signup</Button>
      </form>}
    </>
  )
}

export default SignUpPage