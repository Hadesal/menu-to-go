import { Box, Container, IconButton } from "@mui/material";
import AmericanCheese from "../../assets/American Cheese.jpg";
import GroundBeef from "../../assets/Ground-Beefjpg.jpg";
import Bun from "../../assets/bunjpg.jpg";
import SmokedChickenImage from "../../assets/ingredient.jpg";
import milk from "../../assets/milk.jpg";
import onionsImage from "../../assets/onion.jpg";
import parsleyImage from "../../assets/parsili.jpg";
import pineappleImage from "../../assets/pinapple.jpg";
import shot from "../../assets/shot.jpg";
import spicesImage from "../../assets/spices.jpg";
import Sugar from "../../assets/sugar.jpg";
import TomatoesImage from "../../assets/tomamto.jpg";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useEffect, useState } from "react";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import ExtrasList from "../../components/ProductExtras/ExtrasList";
import IngredientList from "../../components/ProductIngredients/IngredientList";
import VariantList from "../../components/ProductVariants/ProductVariants";
import { fetchAllCategories } from "../../redux/slices/menuSlice";
import { useAppDispatch } from "../../utils/hooks";
import { Styles } from "./ProductPage.styles";
import Section from "./Section";
import { fetchMenuData } from "../../utils/MenuDataFetching";
import SplashScreen from "../SplashScreen/SplashScreen";

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

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

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
  }, [dispatch]); // Added dispatch to the dependency array

  // Show splash screen while loading
  if (loading) {
    return <SplashScreen />;
  }
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
