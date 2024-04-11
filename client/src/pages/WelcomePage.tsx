import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";
import { Button as ButtonTailwind } from "@material-tailwind/react";

const Button: React.ForwardRefExoticComponent<any> = ButtonTailwind;

import "../styles/WelcomePage.css";
import { SyncLoadingScreen } from "../components/LoadingScreen";
import { toast } from "sonner";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { firstName, lastName } = useAuth();
  const { logout, loading, error } = useLogout();

  const handleLogout = async () => {
    await logout();

    if (!loading && !error) {
      toast.success("Logout successfully");
    }

    navigate("/signin");
  };

  if (error) {
    toast.error(error);
  }

  return (
    <>
      {loading ? (
        <SyncLoadingScreen
          message="Logging out..."
          messageColor="#000"
          loaderColor="#000"
        />
      ) : (
        <div className="welcome-container">
          <h1 className="welcome-heading text-4xl">
            <span className="welcome-title">Welcome </span>
            {firstName || ""} {lastName || ""} !
          </h1>
          <Button onClick={() => handleLogout()}>Logout</Button>
        </div>
      )}
    </>
  );
};

export default WelcomePage;
