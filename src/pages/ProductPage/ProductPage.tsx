import { Box, Container, Divider } from "@mui/material";

import ProductDetails from "@components/Product/ProductDetails/ProductDetails";
import ExtrasList from "@components/Product/ProductExtras/ExtrasList";
import IngredientList from "@components/Product/ProductIngredients/IngredientList";
import VariantList from "@components/Product/ProductVariants/ProductVariants";
import { useAppSelector } from "../../redux/reduxHooks";
import Section from "./Section";
import { useEffect, useRef } from "react";
import { allergensOptionsMap } from "@constants/productLabels";

interface ProductPageProps {
  isDesktop?: boolean;
}
export default function ProductPage({ isDesktop }: ProductPageProps) {
  const productPageContainerRef = useRef<HTMLDivElement>(null);
  const { selectedProduct, restaurantData } = useAppSelector(
    (state) => state.menuData
  );

  useEffect(() => {
    if (productPageContainerRef.current) {
      // Scroll into view
      productPageContainerRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
  }, []);

  return (
    <Container
      ref={productPageContainerRef}
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
              productDietaryOption={selectedProduct.details.dietaryOptionLabel}
              isSoldOut={selectedProduct.isSoldOut}
            />
            {selectedProduct.details &&
              selectedProduct.details.allergies &&
              selectedProduct.details.allergies.length !== 0 && (
                <Section name="Allergies">
                  <div>
                    {selectedProduct.details.allergies.map((allergy, index) => (
                      <span
                        key={
                          allergensOptionsMap[
                            allergy as keyof typeof allergensOptionsMap
                          ]
                        }
                      >
                        {
                          allergensOptionsMap[
                            allergy as keyof typeof allergensOptionsMap
                          ]
                        }
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
