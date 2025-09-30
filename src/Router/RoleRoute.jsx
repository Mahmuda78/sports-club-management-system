import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth"; // your auth hook

const RoleRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but unauthorized
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
