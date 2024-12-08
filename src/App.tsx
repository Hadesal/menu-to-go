import { ThemeProvider } from "@mui/material";
import { ConfigProvider } from "antd";
import {antdTheme,muiTheme} from "./theme/theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "@pages/LoginPage/LoginPage";
import RegisterPage from "@pages/RegisterPage/RegisterPage";
import UserDashboardPage from "@pages/UserDashboardPage/UserDashboardPage";
import MenuPage from "@pages/MenuPage/MenuPage";
import LandingPage from "@pages/LandingPage/LandingPage";
import PrivateRoute from "@routes/PrivateRoute";
import PublicRoute from "@routes/PublicRoute";
import "./App.css"; // Include Ant Design styles

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <ConfigProvider theme={antdTheme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/landing"
              element={
                <PublicRoute>
                  <LandingPage />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <UserDashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/menu"
              element={
                <PublicRoute>
                  <MenuPage />
                </PublicRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;