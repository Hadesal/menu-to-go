import React, { useState } from "react";
import { Box, Container, Paper } from "@mui/material";
import MenuHeader from "../../components/MenuHeader/MenuHeader";
import MenuFooter from "../../components/MenuFooter/MenuFooter";
import MenuCategories from "../../components/MenuCategories/MenuCategories";
import MenuProductsCard from "../../components/MenuProductsCard/MenuProductsCard";
import { Styles } from "../ProductPage/ProductPage.styles";

const menuSelections = [
  {
    id: "restaurant",
    Label: "Restaurant",
  },
  {
    id: "café",
    Label: "Café",
  },
];

export default function MenuPage() {
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState("Restaurant");

  return (
    <Container sx={Styles.container} maxWidth="sm">
      <Box sx={Styles.box}>
        <MenuHeader />
        <Paper
          sx={{
            display: "flex",
            borderRadius: "29px",
            height: "64px",
            background: "#FCFDFD",
            position: "relative",
          }}
          elevation={6}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: "44px",
            }}
          >
            {menuSelections.map((selection, index) => (
              <Box
                key={index}
                onClick={() => setSelectedMenuCategory(selection.Label)}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background:
                    selection.Label === selectedMenuCategory
                      ? "#A4755D"
                      : "transparent",
                  color:
                    selection.Label === selectedMenuCategory
                      ? "#F9FDFE"
                      : "#797979",
                  borderRadius: "22px",
                  padding: "1rem",
                  width: "140px",
                  height: "48px",
                  fontWeight: "500",
                  lineHeight: "16px",
                  cursor: "pointer", // Add cursor to indicate clickable items
                }}
              >
                {selection.Label}
              </Box>
            ))}
          </Box>
          <Box></Box>
        </Paper>
        <MenuCategories categoryTag="food" />
      </Box>
      <Box
        maxWidth="sm"
        sx={{
          background: "#D9B18F4D",
          height: "1px",
          marginTop: "1rem",
          position: "fixed",
          width: "100%",
          index: 99,
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          paddingTop: "2rem",
          paddingLeft: "1rem",
          gap: 4,
          overflowY: "scroll",
          height: "400px",
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For Internet Explorer and Edge
          "&::-webkit-scrollbar": {
            // For WebKit (Chrome, Safari)
            display: "none",
          },
        }}
      >
        <MenuProductsCard />
        <MenuProductsCard />
        <MenuProductsCard />
      </Box>
      <MenuFooter />
    </Container>
  );
}
