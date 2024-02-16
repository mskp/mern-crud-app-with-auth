import { DataProvider } from "../../contexts/DataContext";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState, useRef } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { ModalProvider } from "../../contexts/ModalContext";
import Loading from "../../components/Loading";

function ProtectedPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refreshAccessToken = useRefreshToken();
  const timeoutId = useRef(null);

  useEffect(() => {
    const verifyAndRefresh = async () => {
      try {
        await refreshAccessToken();
      } catch (error) {
        console.error("Error refreshing token:", error.message || error);
      } finally {
        setIsLoading(false);
        const nextRefreshTimeout = 28 * 60 * 1000;
        timeoutId.current = setTimeout(verifyAndRefresh, nextRefreshTimeout);
      }
    };
    verifyAndRefresh();
    return () => clearTimeout(timeoutId.current);
  }, []);

  if (isLoading) return <Loading />;

  if (!auth?.accessToken) return <Navigate to="/login" replace />;
  
  return (
    <DataProvider>
      <ModalProvider>
        <Outlet />
      </ModalProvider>
    </DataProvider>
  );
}
export default ProtectedPage;
