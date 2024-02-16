import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { useAuth } from "./AuthContext";

const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setAuth } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, status } = await axios.get(`/api/user-info`);
      if (status === 200) setData(data);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAccount = async (updatedData) => {
    try {
      setLoading(true);
      const { data, status } = await axios.put(`/api/user-info`, updatedData);
      if (status === 200 && data?.updatedUser) {
        setData(data);
      }
    } catch (error) {
      setError("Error updating account");
      console.error("Error updating account:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      const { status } = await axios.delete(`/api/user-info`);
      if (status === 204) {
        setData({});
        setAuth({ accessToken: "" });
      }
    } catch (error) {
      setError("Error deleting account");
      console.error("Error deleting account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{ data, loading, error, fetchData, updateAccount, deleteAccount }}
    >
      {children}
    </DataContext.Provider>
  );
}
