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
  const { categoryShape, colors, fontType } = restaurantData.userUiPreferences;

  // Filter categories based on categoryTag
  const filteredCategories = categories.filter(
    (category) =>
      category.categoryType.toLowerCase() === categoryTag.toLowerCase()
  );

  // Select first category if none is selected
  useEffect(() => {
    if (!selectedCategory && filteredCategories.length > 0) {
      dispatch(setSelectedCategory(filteredCategories[0]));
    }
  }, [categoryTag]);

  const handleCategorySelect = (category: CategoryData) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <Box sx={Styles.categoriesContainer}>
      {filteredCategories.map((category, index) => {
        const isSelected = category.name === selectedCategory;
        const categoryColor = isSelected
          ? colors.primaryColor
          : adjustBrightness(colors.primaryColor, 50);

        return (
          <Box
            key={index}
            onClick={() => handleCategorySelect(category)}
            sx={
              categoryShape === "text"
                ? {
                    background: isSelected ? colors.secondaryColor : "white",
                    border: `1px solid ${colors.secondaryColor}`,
                    padding: "0.5rem 1rem",
                    borderRadius: 2,
                    maxWidth: "200px",
                  }
                : Styles.categoryBox
            }
          >
            {categoryShape === "text" ? (
              <Typography
                variant="h6"
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: 500,
                  color: isSelected ? "white" : colors.secondaryColor,
                  fontFamily: fontType,
                }}
              >
                {category.name}
              </Typography>
            ) : (
              <>
                <img
                  src={category.image as string || PlaceHolder}
                  alt="Product Image"
                  onError={(e) => (e.currentTarget.src = PlaceHolder)}
                  style={{
                    borderRadius:
                      categoryShape === "circle"
                        ? "50%"
                        : categoryShape === "rounded"
                        ? "20%"
                        : "0%",
                    width: 70,
                    height: 70,
                    padding: 1,
                  }}
                />

                <Typography
                  variant="h6"
                  sx={{
                    ...Styles.categoryLabel,
                    color: categoryColor,
                    fontFamily: fontType,
                  }}
                >
                  {category.name}
                </Typography>
                {isSelected && (
                  <Box
                    sx={{
                      ...Styles.selectedCategoryIndicator,
                      background: colors.secondaryColor,
                    }}
                  />
                )}
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
