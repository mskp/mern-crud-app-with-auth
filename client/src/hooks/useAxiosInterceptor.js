// Importing necessary dependencies
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "../utils/axiosConfig";

// Custom hook for managing Axios interceptors to automatically include the access token in requests
export default function useAxiosInterceptor() {
  const { auth } = useAuth();
  useEffect(() => {
    // Setting up an Axios request interceptor
    const axiosRequestInterceptor = axios.interceptors.request.use(
      async (config) => {
        if (auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Cleaning up the Axios request interceptor when the component unmounts
    return () => axios.interceptors.request.eject(axiosRequestInterceptor);
  }, [auth]); // Dependency on the 'auth' object triggers the effect when it changes
}
