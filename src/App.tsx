import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import LandingPage from "@pages/LandingPage/LandingPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import MenuComponent from "@pages/MenuPage/MenuComponant";
import RegisterPage from "@pages/RegisterPage/RegisterPage";
import UserDashboardPage from "@pages/UserDashboardPage/UserDashboardPage";
import PrivateRoute from "@routes/PrivateRoute";
import PublicRoute from "@routes/PublicRoute";
import { ConfigProvider } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import "./App.css"; // Include Ant Design styles
import { useLanguage } from "./hooks/useLanguage";
import { antdTheme, muiTheme } from "./theme/theme";

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
                    <MenuComponent />
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
