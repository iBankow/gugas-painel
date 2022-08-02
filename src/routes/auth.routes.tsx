import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const AuthRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export { AuthRoute };
