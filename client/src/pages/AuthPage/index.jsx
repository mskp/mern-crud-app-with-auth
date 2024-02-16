import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import Loading from "../../components/Loading";

function AuthPages() {
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useAuth();

  const refresh = useRefreshToken();
  const accessToken = auth?.accessToken;

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  if (isLoading) return <Loading />;

  if (accessToken) return <Navigate to="/profile" replace={true} />;

  return <Outlet />;
}

export default AuthPages;
