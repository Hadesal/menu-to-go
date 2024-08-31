// src/App.js
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UserDashboardPage from "./pages/UserDashboardPage/UserDashboardPage";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
// Define your custom theme
const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Arial", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#a4755d",
    },
    secondary: {
      main: "#d9b18f",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 767,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  window.history.pushState(null, null, window.location.href); // Push the current state
  window.onpopstate = function () {
    window.history.go(1); // On back press, go forward in the history
  };
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
