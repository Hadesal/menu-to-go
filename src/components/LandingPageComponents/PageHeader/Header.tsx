//import React from "react";
import { Box, Button } from "@mui/material";
import logo from "../../../assets/qr-code-logo.svg";
import Typography from "@mui/material/Typography";
import HeaderDrawer from "./HeaderDrawer";

export default function LandingPageHeader() {
  return (
    <Box component="nav">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#D9D9D980",
          paddingLeft: { xs: "1rem", md: "2rem" },
          paddingRight: { xs: "1rem", md: "2rem" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
          }}
        >
          <Box>
            <img
              style={{
                display: "flex",
              }}
              alt="qrcode"
              src={logo}
              width={"70px"}
              height={"70px"}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Lucida Calligraphy",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "28px",
                lineHeight: "36px",
              }}
              variant="h6"
              noWrap
              component="div"
            >
              <span style={{ color: "#A4755D" }}>Menu</span>
              -To-Go
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <ul
            style={{
              listStyle: "none",
              color: "#797979",
              display: "flex",
              flexDirection: "row",
              columnGap: "2rem",
              padding: 0,
            }}
          >
            {["Home", "Pricing", "How it Works", "Contact"].map(
              (text, index) => (
                <li key={index}>{text}</li>
              )
            )}
          </ul>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "row",
            flexGrow: 1,
            justifyContent: "flex-end",
            columnGap: "1rem",
          }}
        >
          <Button
            sx={{
              borderRadius: "1rem",
              backgroundColor: "transparent",
              borderColor: "var(--primary-color)",
              color: "var(--primary-color)",

              "&:hover": {
                backgroundColor: "var(--primary-color)",
                color: "white",
              },
              height: "50px",
              width: "90px",
              textTransform: "none",
            }}
            variant="outlined"
            onClick={() => {
              console.log("sign in");
            }}
          >
            Sign in
          </Button>
          <Button
            sx={{
              borderRadius: "1rem",
              backgroundColor: "var(--primary-color)",
              color: "white",
              "&:hover": {
                backgroundColor: "transparent",
                borderColor: "var(--primary-color)",
                color: "var(--primary-color)",
              },
              height: "50px",
              width: "90px",
              textTransform: "none",
            }}
            variant="outlined"
            onClick={() => {
              console.log("sign up");
            }}
          >
            Sing Up
          </Button>
        </Box>
        <HeaderDrawer />
      </Box>
    </Box>
  );
}
