import { Box, Container, IconButton } from "@mui/material";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import ExtrasList from "../../components/ProductExtras/ExtrasList";
import IngredientList from "../../components/ProductIngredients/IngredientList";
import VariantList from "../../components/ProductVariants/ProductVariants";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { Styles } from "./ProductPage.styles";
import Section from "./Section";
import { setSelectedProduct } from "../../redux/slices/menuSlice";
import { hexToRgba } from "../../utils/colors";

export default function ProductPage() {
  const dispatch = useAppDispatch();

  const { selectedProduct, restaurantData } = useAppSelector(
    (state) => state.menuData
  );

  const backgroundColor = hexToRgba(
    restaurantData.userUiPreferences.colors.primaryColor,
    0.19
  );

  return (
    <Container disableGutters={true} sx={{ ...Styles.container }} maxWidth="sm">
      <Box sx={Styles.box}>
        <IconButton
          onClick={() => dispatch(setSelectedProduct({}))}
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
            sx={{ color: restaurantData.userUiPreferences.colors.primaryColor }}
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
