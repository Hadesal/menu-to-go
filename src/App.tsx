import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UserDashboardPage from "./pages/UserDashBoard/UserDashboardPage";

// Define your custom theme
const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Arial", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#a4755d", // Your custom primary color
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
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
