import { useAuth } from "../contexts/AuthContext";
import axios from "../utils/axiosConfig";

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  return async () => {
    try {
      const response = await axios.post(`/api/refresh-token`);
      const accessToken = response?.data?.accessToken ?? "";
      setAuth({ accessToken });
    } catch (error) {
      console.log("Refreshing token failure: ", error);
    }
  };
}
