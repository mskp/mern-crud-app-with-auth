import { DataProvider } from "../../contexts/DataContext";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { ModalProvider } from "../../contexts/ModalContext";
import Loading from "../../components/Loading";
import { account } from "../../appwrite";

function ProtectedPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, loggedin, setLoggedin } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const user = await account.get();
        setUser(user);
        setLoggedin(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <Loading />;

  if (!loggedin) return <Navigate to="/login" replace />;

  return (
    <DataProvider>
      <ModalProvider>
        <Outlet />
      </ModalProvider>
    </DataProvider>
  );
}
export default ProtectedPage;
