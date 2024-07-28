import { Box, Container, IconButton } from "@mui/material";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useEffect, useState } from "react";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import ExtrasList from "../../components/ProductExtras/ExtrasList";
import IngredientList from "../../components/ProductIngredients/IngredientList";
import VariantList from "../../components/ProductVariants/ProductVariants";
import { fetchMenuData } from "../../utils/MenuDataFetching";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import SplashScreen from "../SplashScreen/SplashScreen";
import { Styles } from "./ProductPage.styles";
import Section from "./Section";

// Utility function to convert hex to rgba
function hexToRgba(hex, alpha = 1) {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const { selectedProduct, restaurantData } = useAppSelector(
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

  // Show splash screen while loading
  if (loading) {
    return <SplashScreen />;
  }
  
  const backgroundColor = hexToRgba(
    restaurantData.userUiPreferences.primaryColor,
    0.19
  );

  return (
    <Container sx={{ ...Styles.container }} maxWidth="sm">
      <Box sx={Styles.box}>
        <IconButton
          onClick={() => console.log("go back")}
          sx={{
            ...Styles.iconButton,
            background: backgroundColor,
            "&:hover": {
              background: backgroundColor,
            },
          }}
          aria-label="arrowback"
        >
          <NavigateBeforeIcon
            fontSize="large"
            sx={{ color: restaurantData.userUiPreferences.primaryColor }}
          />
        </IconButton>
        <ProductDetails
          productName={selectedProduct.name}
          productDescription={selectedProduct.details.detailsDescription}
          productImg={selectedProduct.image}
        />

        {selectedProduct.details.ingredients.length !== 0 && (
          <Section
            name="Ingredients"
            children={
              <IngredientList
                listView={
                  restaurantData.userUiPreferences.ingredientViewType !== "GRID"
                }
                ingredients={selectedProduct.details.ingredients}
              />
            }
          />
        )}

        {selectedProduct.details.variants.variantList.length !== 0 && (
          <Section
            name={selectedProduct.details.variants.name}
            children={
              <VariantList
                variants={selectedProduct.details.variants.variantList}
              />
            }
          />
        )}

        {selectedProduct.details.extras.length !== 0 && (
          <Section
            name="Extras"
            children={<ExtrasList extras={selectedProduct.details.extras} />}
          />
        )}
      </Box>
    </Container>
  );
}
