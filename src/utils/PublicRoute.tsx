import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem("userToken");

  // Always allow access to the MenuPage
  if (location.pathname.startsWith("/menu")) {
    return <>{children}</>;
  }

  // Redirect authenticated users away from other public routes (like login/register)
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
