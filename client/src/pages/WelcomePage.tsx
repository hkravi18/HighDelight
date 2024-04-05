import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";
import { Button as ButtonTailwind } from "@material-tailwind/react";

const Button: React.ForwardRefExoticComponent<any> = ButtonTailwind;

import "../styles/WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { firstName, lastName } = useAuth();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <>
      <div className="welcome-container">
        <h1 className="welcome-heading text-4xl">
          <span className="welcome-title">Welcome </span>
          {firstName || ""} {lastName || ""} !
        </h1>
        <Button onClick={() => handleLogout()}>Logout</Button>
      </div>
    </>
  );
};

export default WelcomePage;
