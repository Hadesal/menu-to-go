import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const token = localStorage.getItem("userToken");

  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
