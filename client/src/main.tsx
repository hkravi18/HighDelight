import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";

import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <App />
        <Toaster richColors closeButton position="top-center" />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
