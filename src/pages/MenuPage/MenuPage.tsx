import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import MenuCategories from "@components/Menu/MenuCategories/MenuCategories";
import MenuHeader from "@components/Menu/MenuHeader/MenuHeader";
import MenuProductsCard from "@components/Menu/MenuProductsCard/MenuProductsCard";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { fetchMenuData } from "@utils/dataFetchers/MenuDataFetching";
import { Styles } from "@pages/ProductPage/ProductPage.styles";
import SplashScreen from "@pages/SplashScreen/SplashScreen";
import MenuFooter from "@components/Menu/MenuFooter/MenuFooter";
import ProductPage from "@pages/ProductPage/ProductPage";
import MenuSelection from "@components/Menu/MenuSelection/MenuSelection";
import { useParams } from "react-router-dom";
import emptyData from "@assets/Animation - 1724972864386.json";
import Lottie from "lottie-react";
import MenuProductsList from "@components/Menu/MenuProductsCard/MenuProductsList";

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
    (category) => category.products!.length > 0
  );

  // Determine if menu selection should be shown
  const categoryLabels = filteredCategories.map(
    (category) => category.categoryType
  );
  const showMenuSelection =
    categoryLabels.includes("Food") && categoryLabels.includes("Drinks");

  if (
    filteredCategories.length === 0 ||
    (selectedCategory && Object.keys(selectedCategory).length === 0)
  ) {
    return (
      <>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh" }}
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
        color={restaurantData.userUiPreferences.colors.primaryColor}
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
      {restaurantData.userUiPreferences.itemsViewType === "GRID" ? (
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
            marginBottom: 5,
          }}
        >
          {selectedCategory.products!.map((product, index) => (
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
      ) : (
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
            marginBottom: 5,
          }}
        >
          {selectedCategory?.products!.map((product, index) => (
            <Grid
              item
              xs={12}
              sm={12}
              key={index}
              sx={{
                paddingLeft: "0 !important",
                // paddingTop: index < 2 ? "0 !important" : "0px",
              }}
            >
              <MenuProductsList key={index} product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      <MenuFooter />
    </Container>
  );
}
