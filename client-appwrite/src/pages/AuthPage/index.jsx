import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { account } from "../../appwrite";
import toast from "react-hot-toast";

function AuthPages() {
  const [isLoading, setIsLoading] = useState(true);

  const { setUser, setLoggedin, loggedin } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const user = await account.get();
        setLoggedin(true);
        setUser(user);
      } catch (error) {
        toast.error("Login first", { id: "warn" });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <Loading />;

  if (loggedin) return <Navigate to="/profile" replace />;

  return <Outlet />;
}

export default AuthPages;
