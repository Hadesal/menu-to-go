import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import BreakfastImg from "../../assets/breakfast.jpg";
import PlaceHolder from "../../assets/catering-item-placeholder-704x520.png";
import ChickenImg from "../../assets/chicken.jpg";
import FreshJuice from "../../assets/freshjuice.jpg";
import MeatImg from "../../assets/meat.jpg";
import PastaImg from "../../assets/pasta.jpg";
import PizzaImg from "../../assets/pizza.jpg";
import SodaDrinks from "../../assets/sodadrinks.jpg";
import VeganFoodImg from "../../assets/veganfood.jpg";
import WarmDrinks from "../../assets/warmdrinks.jpg";
import { setSelectedCategory } from "../../redux/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { Styles } from "./MenuCategories.styles";
import { adjustBrightness } from "../../utils/colors";

export default function MenuCategories({
  categories,
  categoryTag,
  selectedCategory,
}) {
  const dispatch = useAppDispatch();
  const { restaurantData } = useAppSelector((state) => state.menuData);

  const categoriesData = (categoryTag: string) => {
    let categoriesDataArray = [];

    if (categoryTag === "Food") {
      categoriesDataArray = categories.filter((category) => {
        return category.categoryType === "Food";
      });
    } else {
      categoriesDataArray = categories.filter((category) => {
        return category.categoryType === "Drinks";
      });
    }

    return categoriesDataArray;
  };

  useEffect(() => {
    dispatch(setSelectedCategory(categoriesData(categoryTag)[0]));
  }, [categoryTag]);

  return (
    <Box sx={Styles.categoriesContainer}>
      {categoriesData(categoryTag).map((category, index) => (
        <Box
          onClick={() => {
            dispatch(setSelectedCategory(category));
          }}
          key={index}
          sx={Styles.categoryBox}
        >
          <img
            src={category.image ? category.image : PlaceHolder}
            alt="Product Image"
            style={Styles.categoryImage}
            width={50}
            height={50}
          />
          <Typography
            variant="h6"
            sx={{
              ...Styles.categoryLabel,
              color:
                category.name === selectedCategory
                  ? restaurantData.userUiPreferences.colors.primaryColor
                  : adjustBrightness(
                      restaurantData.userUiPreferences.colors.primaryColor,
                      50
                    ),
              fontFamily: restaurantData.userUiPreferences.fontType,
            }}
          >
            {category.name}
          </Typography>
          {category.name === selectedCategory && (
            <Box sx={Styles.selectedCategoryIndicator} />
          )}
        </Box>
      ))}
    </Box>
  );
}
