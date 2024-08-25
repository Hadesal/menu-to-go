import React, { useEffect, useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import MenuHeader from "../../components/MenuHeader/MenuHeader";
import MenuFooter from "../../components/MenuFooter/MenuFooter";
import MenuCategories from "../../components/MenuCategories/MenuCategories";
import MenuProductsCard from "../../components/MenuProductsCard/MenuProductsCard";
import { Styles } from "../ProductPage/ProductPage.styles";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchMenuData } from "../../utils/MenuDataFetching";
import SplashScreen from "../SplashScreen/SplashScreen";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";

const menuSelections = [
  {
    id: "food",
    Label: "Food",
  },
  {
    id: "drinks",
    Label: "Drinks",
  },
];

export default function MenuPage() {
  const [loading, setLoading] = useState(true);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState("Food");
  const dispatch = useAppDispatch();

  const { restaurantData, selectedCategory } = useAppSelector(
    (state) => state.menuData
  );

  useEffect(() => {
    const fetchDataAndHandleLoading = async () => {
      setLoading(true);
      const result = await fetchMenuData(dispatch);

      if (result.success) {
        setLoading(false);
      } else {
        console.error("Error fetching data:", result.error);
      }
    };

    fetchDataAndHandleLoading();
  }, [dispatch]);

  //   selectedCategory?.products.map((category) => {
  //     console.log(category.name);
  // });

  // Show splash screen while loading
  if (loading) {
    return <SplashScreen />;
  }

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
        </Paper>
        <MenuCategories
          categories={restaurantData.categories}
          categoryTag="Food"
          selectedCategory={selectedCategory.name}
        />
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

      <Typography
      color={"var(--primary-color)"}
        sx={{ paddingLeft: "1rem", paddingTop: "2rem" , fontWeight:500 }}
        variant="h6"
      >
        {selectedCategory.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          paddingTop: "2rem",
          paddingLeft: "1rem",
          gap: 2,
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
        {selectedCategory?.products.length === 0 ? (
          <Box>
            <Typography>No products</Typography>
          </Box>
        ) : (
          selectedCategory?.products.map((product, index) => (
            <MenuProductsCard product={product} />
          ))
        )}
      </Box>
      <MenuFooter />
    </Container>
  );
}
