import { Box, Container } from "@mui/material";
import React from "react";
import { ProductDetails } from "../../components/ProductDetails/ProductDetails";

export default function ProductPage() {
  return (
    <Container maxWidth="sm">
      <Box
        // sx={{
        //   display: "flex",
        //   justifyContent: "center",
        //   height: "100vh",
        // }}
      >
        <ProductDetails />
      </Box>
    </Container>
  );
}
