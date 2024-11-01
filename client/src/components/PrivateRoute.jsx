import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

function PrivateRoute() {
  const { loggedIn, authLoading } = useAuthStatus();

  if (authLoading) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
