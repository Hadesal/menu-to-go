import PlaceHolder from "@assets/catering-item-placeholder-704x520.png";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { setSelectedCategory } from "@redux/slices/menuSlice";
import { adjustBrightness } from "@utils/colors";
import { useEffect } from "react";
import { Styles } from "./MenuCategories.styles";

interface MenuCategoriesProps {
  categories: CategoryData[];
  categoryTag: string;
  selectedCategory: string;
}

export default function MenuCategories({
  categories,
  categoryTag,
  selectedCategory,
}: MenuCategoriesProps) {
  const dispatch = useAppDispatch();
  const { restaurantData } = useAppSelector((state) => state.menuData);

  const categoriesData = (categoryTag: string) => {
    let categoriesDataArray = [];

    if (categoryTag.toLocaleLowerCase() === "food") {
      categoriesDataArray = categories.filter((category) => {
        return category.categoryType.toLowerCase() === "food";
      });
    } else {
      categoriesDataArray = categories.filter((category) => {
        return category.categoryType.toLowerCase() === "drinks";
      });
    }

    return categoriesDataArray;
  };

  useEffect(() => {
    if (!selectedCategory) {
      dispatch(setSelectedCategory(categoriesData(categoryTag)[0]));
    }
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
            style={{
              ...Styles.categoryImage,
              borderRadius:
                restaurantData.userUiPreferences.categoryShape === "circle"
                  ? "50%"
                  : restaurantData.userUiPreferences.categoryShape === "rounded"
                  ? "20%"
                  : "0%",
            }}
            width={70}
            height={70}
          />
          <Typography
            variant="h6"
            sx={{
              ...Styles.categoryLabel,
              color:
                category.name === selectedCategory
                  ? restaurantData.userUiPreferences?.colors.primaryColor
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
            <Box
              sx={{
                ...Styles.selectedCategoryIndicator,
                background:
                  restaurantData.userUiPreferences?.colors.secondaryColor,
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
