import { Box, Container, Divider } from "@mui/material";

import ProductDetails from "@components/Product/ProductDetails/ProductDetails";
import ExtrasList from "@components/Product/ProductExtras/ExtrasList";
import IngredientList from "@components/Product/ProductIngredients/IngredientList";
import VariantList from "@components/Product/ProductVariants/ProductVariants";
import { useAppSelector } from "../../redux/reduxHooks";
import Section from "./Section";
import { useEffect } from "react";

interface ProductPageProps {
  isDesktop?: boolean;
}
export default function ProductPage({ isDesktop }: ProductPageProps) {
  const { selectedProduct, restaurantData } = useAppSelector(
    (state) => state.menuData
  );

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(-10, -10);
  }, []);

  return (
    <Container
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor:
          restaurantData.userUiPreferences.colors.backgroundColor,
        ...(isDesktop && { overflowY: "scroll" }), // Only add when greater than sm
      }}
      disableGutters={true}
      maxWidth={isDesktop ? "xs" : "md"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {selectedProduct && (
          <>
            <ProductDetails
              productName={selectedProduct.name}
              productDescription={
                selectedProduct.details.detailsDescription as string
              }
              productImg={selectedProduct.image as string}
              productPrice={selectedProduct.price}
              productLabels={selectedProduct.details.labels}
              productDietaryOption={selectedProduct.details.dietaryOptions}
              isSoldOut={selectedProduct.isSoldOut}
            />
            {selectedProduct.details &&
              selectedProduct.details.allergies &&
              selectedProduct.details.allergies.length !== 0 && (
                <Section name="Allergies">
                  <div>
                    {selectedProduct.details.allergies.map((allergy, index) => (
                      <span key={allergy.value}>
                        {allergy.label}
                        {index < selectedProduct.details.allergies.length - 1 &&
                          " |"}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

            {selectedProduct.details.ingredients.length !== 0 && (
              <Section
                name="Ingredients"
                children={
                  <IngredientList
                    listView={
                      restaurantData.userUiPreferences?.ingredientViewType ===
                      "LIST"
                    }
                    ingredients={selectedProduct.details.ingredients}
                  />
                }
              />
            )}

            {selectedProduct.details.variants !== null &&
              selectedProduct.details.variants.variantList.length !== 0 && (
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
                children={
                  <ExtrasList extras={selectedProduct.details.extras} />
                }
              />
            )}
          </>
        )}
      </Box>

      <Box>
        <Divider sx={{ marginTop: 4 }} variant="fullWidth" />

        <Box
          sx={{
            textAlign: "center",
            fontSize: "14px",
            width: "100%",
            padding: 1,
          }}
        >
          <a
            style={{ textDecoration: "none", color: "black" }}
            target="_blank"
            href=""
          >
            Powered by MenuToGo®
          </a>
        </Box>
      </Box>
    </Container>
  );
}
