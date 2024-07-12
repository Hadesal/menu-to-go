import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import SmokedChickenImage from "../../assets/ingredient.jpg";
import onionsImage from "../../assets/onion.jpg";
import parsleyImage from "../../assets/parsili.jpg";
import pineappleImage from "../../assets/pinapple.jpg";
import spicesImage from "../../assets/spices.jpg";
import TomatoesImage from "../../assets/tomamto.jpg";
import GroundBeef from "../../assets/Ground-Beefjpg.jpg";
import Bun from "../../assets/bunjpg.jpg";
import AmericanCheese from "../../assets/American Cheese.jpg";
import shot from "../../assets/shot.jpg";
import milk from "../../assets/milk.jpg";
import Sugar from "../../assets/sugar.jpg";

import ProductDetails from "../../components/ProductDetails/ProductDetails";
import ExtrasList from "../../components/ProductExtras/ExtrasList";
import IngredientList from "../../components/ProductIngredients/IngredientList";
import VariantList from "../../components/ProductVariants/ProductVariants";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import MenuHeader from "../../components/MenuHeader/MenuHeader";
import Section from "./Section";
import { Styles } from "./ProductPage.styles";

export default function ProductPage() {
  const ingredients = [
    { ingredientImg: SmokedChickenImage, ingredientName: "Smoked Chicken" },
    { ingredientImg: onionsImage, ingredientName: "Onions" },
    { ingredientImg: parsleyImage, ingredientName: "Parsley" },
    { ingredientImg: pineappleImage, ingredientName: "Pineapple" },
    { ingredientImg: spicesImage, ingredientName: "Spices" },
    { ingredientImg: TomatoesImage, ingredientName: "Tomatoes" },
  ];

  const burgerIngredients = [
    { ingredientImg: Bun, ingredientName: "Bun sesame seed" },
    { ingredientImg: GroundBeef, ingredientName: "Ground Beef" },
    { ingredientImg: AmericanCheese, ingredientName: "American Cheese" },
    {
      ingredientImg: onionsImage,
      ingredientName: "Onions (raw, grilled, or caramelized)",
    },
    { ingredientImg: TomatoesImage, ingredientName: "Tomatoes" },
  ];

  const latteburgerIngredients = [
    { ingredientImg: shot, ingredientName: "Espresso shot" },
    { ingredientImg: milk, ingredientName: "Steamed milk" },
    { ingredientImg: Sugar, ingredientName: "Sugar or flavored syrup" },
  ];

  const variants = [
    { variantName: "Small", variantPrice: "10$" },
    { variantName: "Medium", variantPrice: "10$" },
    { variantName: "Large", variantPrice: "10$" },
  ];

  const extras = [
    { extrasName: "Chesses", extrasPrice: "10$" },
    { extrasName: "Tomato's", extrasPrice: "10$" },
    { extrasName: "Onions", extrasPrice: "10$" },
  ];

  const burgerExtras = [
    { extrasName: "Chesses", extrasPrice: "2$" },
    { extrasName: "Fried egg", extrasPrice: "1.5$" },
    { extrasName: "Jalapeños", extrasPrice: "1$" },
    { extrasName: "Onions", extrasPrice: "1$" },
  ];

  return (
    <Container sx={Styles.container} maxWidth="sm">
      <Box sx={Styles.box}>
        {/* <MenuHeader /> */}
        <IconButton
          onClick={() => console.log("go back")}
          sx={Styles.iconButton}
          aria-label="arrowback"
        >
          <NavigateBeforeIcon fontSize="large" color="primary" />
        </IconButton>
        <ProductDetails />
        <Section
          name="Ingredients"
          children={
            <IngredientList
              listView={false}
              ingredients={latteburgerIngredients}
            />
          }
        />
        <Section name="Size" children={<VariantList variants={variants} />} />
        <Section name="Extras" children={<ExtrasList extras={extras} />} />
      </Box>
    </Container>
  );
}
