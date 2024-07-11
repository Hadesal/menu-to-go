import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import SmokedChickenImage from "../../assets/ingredient.jpg"; // Importing the image as a default export
import onionsImage from "../../assets/onion.jpg"; // Importing the image as a default export
import parsleyImage from "../../assets/parsili.jpg"; // Importing the image as a default export
import pineappleImage from "../../assets/pinapple.jpg"; // Importing the image as a default export
import spicesImage from "../../assets/spices.jpg"; // Importing the image as a default export
import TomatoesImage from "../../assets/tomamto.jpg"; // Importing the image as a default export
import GroundBeef from "../../assets/Ground-Beefjpg.jpg"; // Importing the image as a default export
import Bun from "../../assets/bunjpg.jpg"; // Importing the image as a default export
import AmericanCheese from "../../assets/American Cheese.jpg"; // Importing the image as a default export
import shot from "../../assets/shot.jpg"; // Importing the image as a default export
import milk from "../../assets/milk.jpg"; // Importing the image as a default export
import Sugar from "../../assets/sugar.jpg"; // Importing the image as a default export

// import MenuHeader from "../../components/MenuHeader/MenuHeader";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import ExtrasList from "../../components/ProductExtras/ExtrasList";
import IngredientList from "../../components/ProductIngredients/IngredientList";
import VariantList from "../../components/ProductVariants/ProductVariants";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
// import CloseIcon from "@mui/icons-material/Close";

export default function ProductPage() {
  const ingredients = [
    {
      ingredientImg: SmokedChickenImage,
      ingredientName: "Smoked Chicken",
    },
    {
      ingredientImg: onionsImage,
      ingredientName: "Onions",
    },
    {
      ingredientImg: parsleyImage,
      ingredientName: "Parsley",
    },
    {
      ingredientImg: pineappleImage,
      ingredientName: "Pineapple",
    },
    {
      ingredientImg: spicesImage,
      ingredientName: "Spices",
    },
    {
      ingredientImg: TomatoesImage,
      ingredientName: "Tomatoes",
    },
  ];
  const burgerIngredients = [
    {
      ingredientImg: Bun,
      ingredientName: "Bun sesame seed",
    },
    {
      ingredientImg: GroundBeef,
      ingredientName: "Ground Beef",
    },
    {
      ingredientImg: AmericanCheese,
      ingredientName: "American Cheese",
    },
    {
      ingredientImg: onionsImage,
      ingredientName: "Onions (raw, grilled, or caramelized)",
    },
    {
      ingredientImg: TomatoesImage,
      ingredientName: "Tomatoes",
    },
  ];
  const latteburgerIngredients = [
    {
      ingredientImg: shot,
      ingredientName: "Espresso shot",
    },
    {
      ingredientImg: milk,
      ingredientName: "Steamed milk",
    },
    {
      ingredientImg: Sugar,
      ingredientName: "Sugar or flavored syrup",
    },
  ];

  const variants = [
    {
      variantName: "Small",
      variantPrice: "10$",
    },
    {
      variantName: "Medium",
      variantPrice: "10$",
    },
    {
      variantName: "Large",
      variantPrice: "10$",
    },
  ];
  const extras = [
    {
      extrasName: "Chesses",
      extrasPrice: "10$",
    },
    {
      extrasName: "Tomato's",
      extrasPrice: "10$",
    },
    {
      extrasName: "Onions",
      extrasPrice: "10$",
    },
  ];
  const burgerExtras = [
    {
      extrasName: "Chesses",
      extrasPrice: "2$",
    },
    {
      extrasName: "Fried egg",
      extrasPrice: "1.5$",
    },
    {
      extrasName: "Jalapeños",
      extrasPrice: "1$",
    },
    {
      extrasName: "Onions",
      extrasPrice: "1$",
    },
  ];

  return (
    <Container sx={{ background: "#F9FDFE" }} maxWidth="sm">
      <Box sx={{ paddingTop: "2rem" }}>
        {/* <MenuHeader /> */}
        <IconButton
          onClick={() => console.log("go back")}
          sx={{
            marginBottom: 5,
            padding: 0,
            background: "#A4755D30",
            "&:hover": {
              background: "#A4755D30", // Ensure the background remains the same on hover
            },
          }}
          aria-label="arrowback"
        >
          <NavigateBeforeIcon fontSize="large" color="primary" />
        </IconButton>
        <ProductDetails />

        <Box>
          <Typography
            color="var(--primary-color)"
            variant="h6"
            sx={{ marginTop: "1rem", marginBottom: "0.5rem" }}
          >
            Ingredients
          </Typography>
          <IngredientList
            listView={false}
            ingredients={latteburgerIngredients}
          />
        </Box>

        {/* <Box>
          <Typography
            color="var(--primary-color)"
            variant="h6"
            sx={{ marginTop: "1rem", marginBottom: "0.5rem" }}
          >
            Size
          </Typography>
          <VariantList variants={variants} />
        </Box> */}

        {/* <Box sx={{ marginBottom: "1rem" }}>
          <Typography
            color="var(--primary-color)"
            variant="h6"
            sx={{ marginTop: "1rem", marginBottom: "0.5rem" }}
          >
            Extras
          </Typography>
          <ExtrasList extras={burgerExtras} />
        </Box> */}

        {/* <Box sx={{ marginBottom: "1rem" }}>
          <Typography
            color="var(--primary-color)"
            variant="h6"
            sx={{ marginTop: "1rem", marginBottom: "0.5rem" }}
          >
            Extras
          </Typography>
          <ExtrasList extras={extras} />
        </Box> */}
      </Box>
    </Container>
  );
}
