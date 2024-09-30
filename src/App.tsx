// src/App.js
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "@pages/LoginPage/LoginPage";
import MenuPage from "@pages/MenuPage/MenuPage";
import RegisterPage from "@pages/RegisterPage/RegisterPage";
import UserDashboardPage from "@pages/UserDashboardPage/UserDashboardPage";
import PrivateRoute from "@routes/PrivateRoute";
import PublicRoute from "@routes/PublicRoute";
import theme from "./theme/theme";
import { ROUTES } from "@constants/constants";
// Define your custom theme

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.ROOT}
            element={<Navigate to={ROUTES.DASHBOARD} replace />}
          />
          <Route
            path={ROUTES.REGISTER}
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <PrivateRoute>
                <UserDashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MENU}
            element={
              <PublicRoute>
                <MenuPage />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
