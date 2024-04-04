import { Input as InputTailwind, Button as ButtonTailwind } from "@material-tailwind/react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Input: React.ForwardRefExoticComponent<any> = InputTailwind;
const Button: React.ForwardRefExoticComponent<any> = ButtonTailwind;

import "../styles/SignInPage.css";

// TODO: Change all the alert messages to toast messages
const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const reqData: Object = {
        email,
        password
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, reqData, {
        withCredentials: true
      });

      const { data } = response;

      if (data?.ok) {
        alert("Login successful");
        
        setEmail("");
        setPassword("");

        navigate("/welcome");
      } else {
        alert("Error in login, Please try again");
        console.log("ERROR (signin): ", data?.error || "error in login");
      }

    } catch (err) {
      if (err instanceof Error) {
        console.log("ERROR (signin): ", err.message || "");
      } else {
        console.log('ERROR (signin): An unknown error occurred');
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          size="md"
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
          }
        />
        <Input
          id="password"
          size="md"
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
          }
        />
        <Button>Login</Button>
      </form>
    </>
  )
}

export default SignInPage