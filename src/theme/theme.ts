// src/theme.ts
import { createTheme } from "@mui/material/styles";

// MUI Theme
const muiTheme = createTheme({
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
      sm: 550,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Ant Design Theme
const antdTheme = {
  token: {
    colorPrimary: "#a4755d",
    colorSecondary: "#d9b18f",
  },
  zIndex: 3000,
};

// Exporting both themes
export { muiTheme, antdTheme };
