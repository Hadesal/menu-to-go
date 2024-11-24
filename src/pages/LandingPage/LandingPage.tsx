//import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/LandingPageComponents/PageHeader/Header";
import SectionsContainer from "../../components/LandingPageComponents/SectionsContainer";
import Footer from "../../components/LandingPageComponents/Footer";

export default function LandingPage() {
  return (
    <Box sx={{ background: "#F9FDFE" }}>
      <Box>
        <Header />
        <SectionsContainer />
        <Footer />
      </Box>
    </Box>
  );
}
