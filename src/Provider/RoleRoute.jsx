// src/Provider/RoleRoute.jsx
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth"; // your auth hook

const RoleRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth(); // should return { email, role, ... }
  const location = useLocation();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but not authorized
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
