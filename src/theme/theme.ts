// src/theme.ts
import { createTheme } from "@mui/material/styles";

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
      sm: 550,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
