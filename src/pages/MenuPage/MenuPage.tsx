import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import MenuCategories from "../../components/MenuCategories/MenuCategories";
import MenuHeader from "../../components/MenuHeader/MenuHeader";
import MenuProductsCard from "../../components/MenuProductsCard/MenuProductsCard";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchMenuData } from "../../utils/MenuDataFetching";
import { Styles } from "../ProductPage/ProductPage.styles";
import SplashScreen from "../SplashScreen/SplashScreen";
import MenuFooter from "../../components/MenuFooter/MenuFooter";
import ProductPage from "../ProductPage/ProductPage";
import MenuSelection from "../../components/MenuSelection/MenuSelection";
import { useParams } from "react-router-dom";
import emptyData from "../../assets/Animation - 1724972864386.json";
import Lottie from "lottie-react";

// Define menu selection options
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
  const dispatch = useAppDispatch();

  const {
    restaurantData,
    selectedCategory,
    selectedCategoryType,
    selectedProduct,
  } = useAppSelector((state) => state.menuData);

  const { id } = useParams();
  useEffect(() => {
    const fetchDataAndHandleLoading = async () => {
      setLoading(true);
      const result = await fetchMenuData(id as string, dispatch);

      if (result.success) {
        setLoading(false);
      } else {
        console.error("Error fetching data:", result.error);
      }
    };

    fetchDataAndHandleLoading();
  }, [dispatch]);

  // Show splash screen while loading
  if (loading) {
    return <SplashScreen />;
  }

  if (Object.keys(selectedProduct).length !== 0) {
    return <ProductPage />;
  }

  // Filter categories to include only those with products
  const filteredCategories = restaurantData.categories.filter(
    (category) => category.products.length > 0
  );

  // Determine if menu selection should be shown
  const categoryLabels = filteredCategories.map(
    (category) => category.categoryType
  );
  const showMenuSelection =
    categoryLabels.includes("Food") && categoryLabels.includes("Drinks");

  if (Object.keys(selectedCategory).length === 0) {
    return (
      <>
        {/* <Box sx={{ height: "100%", display: "flex", justifyContent: "center" , alignItems:"center" }}>
          
          <Typography>Menu has no data </Typography>
        </Box> */}
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh"}}
        >
          <Lottie
            animationData={emptyData}
            style={{ width: 200, height: 200 }}
          />
          <Typography>Menu has no data</Typography>
          <Typography>check again later</Typography>
        </Stack>
      </>
    );
  }
  return (
    <Container disableGutters={true} sx={Styles.container} maxWidth="sm">
      <Box sx={Styles.box}>
        <MenuHeader />
        {showMenuSelection && <MenuSelection menuSelections={menuSelections} />}
        <MenuCategories
          categories={filteredCategories}
          categoryTag={selectedCategoryType}
          selectedCategory={selectedCategory.name}
        />
      </Box>
      <Divider sx={{ marginTop: 3 }} variant="fullWidth" />

      <Typography
        color={restaurantData.userUiPreferences.primaryColor}
        sx={{
          paddingLeft: "1rem",
          paddingTop: "2rem",
          fontWeight: 500,
          fontFamily: restaurantData.userUiPreferences.fontType,
        }}
        variant="h6"
      >
        {selectedCategory.name}
      </Typography>
      <Grid
        spacing={2}
        container
        sx={{
          marginTop: "1rem",
          width: "100%",
          overflowY: "scroll",
          height: "400px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: "1rem",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          paddingLeft: "1rem",
          paddingRight: "1rem",
          marginLeft: 0,
          marginBottom: 3,
        }}
      >
        {selectedCategory?.products.map((product, index) => (
          <Grid
            item
            xs={6}
            sm={6}
            key={index}
            sx={{
              paddingLeft: index % 2 === 0 ? "0 !important" : "0px",
              paddingTop: index < 2 ? "0 !important" : "0px",
            }}
          >
            <MenuProductsCard key={index} product={product} />
          </Grid>
        ))}
      </Grid>

      <MenuFooter />
    </Container>
  );
}
