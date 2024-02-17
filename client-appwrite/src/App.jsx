import { RouterProvider, redirect } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/AuthPage/Login";
import Signup from "./pages/AuthPage/Signup";
import ProtectedPage from "./pages/ProtectedPage";
import AuthPages from "./pages/AuthPage";
import EditProfile from "./pages/ProtectedPage/EditProfile";
import ViewProfile from "./pages/ProtectedPage/ViewProfile";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    element: <ProtectedPage />,
    children: [
      {
        path: "",
        loader: () => redirect("profile"),
      },
      {
        path: "profile",
        element: <ViewProfile />,
      },
      {
        path: "profile/edit",
        element: <EditProfile />,
      },
    ],
  },
  {
    element: <AuthPages />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
