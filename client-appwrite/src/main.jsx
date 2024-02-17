import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/globals.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        toastOptions={{
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
          duration: 2000,
        }}
      />
    </AuthProvider>
  </React.StrictMode>
);
