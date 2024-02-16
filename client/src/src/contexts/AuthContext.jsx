import { createContext, useContext, useState } from "react";
import axios from "../utils/axiosConfig";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: "",
  });

  const login = async (userData) => {
    try {
      const { status, data } = await axios.post("/api/login", userData);
      if (status === 200 && data?.accessToken) {
        const { accessToken } = data;
        setAuth({ accessToken });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      const { status } = await axios.post("/api/signup", userData);
      return status === 201;
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.delete("/api/logout");
      setAuth({ accessToken: "" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
