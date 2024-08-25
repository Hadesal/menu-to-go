import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem("userToken");

  const getRedirectPath = () => {
    if (location.pathname.startsWith("/dashboard")) {
      return "/dashboard";
    } else if (location.pathname.startsWith("/menu")) {
      return "/menu";
    }
    return "/dashboard";
  };

  return token ? <Navigate to={getRedirectPath()} /> : <>{children}</>;
};

export default PublicRoute;
