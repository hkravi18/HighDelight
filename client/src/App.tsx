import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { email } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={email ? <WelcomePage /> : <SignInPage />} />
          <Route
            path="/signin"
            element={!email ? <SignInPage /> : <WelcomePage />}
          />
          <Route
            path="/signup"
            element={!email ? <SignUpPage /> : <WelcomePage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
