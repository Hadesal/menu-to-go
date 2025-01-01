import { ThemeProvider } from "@mui/material";
import LandingPage from "@pages/LandingPage/LandingPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import MenuPage from "@pages/MenuPage/MenuPage";
import RegisterPage from "@pages/RegisterPage/RegisterPage";
import UserDashboardPage from "@pages/UserDashboardPage/UserDashboardPage";
import PrivateRoute from "@routes/PrivateRoute";
import PublicRoute from "@routes/PublicRoute";
import { ConfigProvider } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css"; // Include Ant Design styles
import { antdTheme, muiTheme } from "./theme/theme";
import { useLanguage } from "./hooks/useLanguage";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const App = () => {
  const { currentLanguage } = useLanguage();

  // Conditional cache based on language direction
  const cacheRtl = createCache({
    key: currentLanguage === "ar" ? "mui-rtl" : "mui-ltr",
    stylisPlugins:
      currentLanguage === "ar" ? [prefixer, rtlPlugin] : [prefixer],
  });

  const theme = {
    ...muiTheme,
    direction: currentLanguage === "ar" ? "rtl" : "ltr",
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <ConfigProvider
          direction={currentLanguage === "ar" ? "rtl" : "ltr"}
          theme={antdTheme}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
                path="/menu/:id"
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
    </CacheProvider>
  );
};

export default App;
