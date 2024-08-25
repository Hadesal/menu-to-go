import React, { useState } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { Styles } from "./MenuCategories.styles";
import VeganFoodImg from "../../assets/veganfood.jpg";
import BreakfastImg from "../../assets/breakfast.jpg";
import PizzaImg from "../../assets/pizza.jpg";
import PastaImg from "../../assets/pasta.jpg";
import ChickenImg from "../../assets/chicken.jpg";
import MeatImg from "../../assets/meat.jpg";
import FreshJuice from "../../assets/freshjuice.jpg";
import SodaDrinks from "../../assets/sodadrinks.jpg";
import WarmDrinks from "../../assets/warmdrinks.jpg";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import PlaceHolder from "../../assets/catering-item-placeholder-704x520.png";
import { setSelectedCategory } from "../../redux/slices/menuSlice";

const categories = [
  {
    id: "vegan",
    label: "Vegan",
    img: VeganFoodImg,
    tag: "food",
  },
  {
    id: "breakfast",
    label: "Breakfast",
    img: BreakfastImg,
    tag: "food",
  },
  {
    id: "pasta",
    label: "Pasta",
    img: PastaImg,
    tag: "food",
  },
  {
    id: "pizza",
    label: "Pizza",
    img: PizzaImg,
    tag: "food",
  },
  {
    id: "meat",
    label: "Meat",
    img: MeatImg,
    tag: "food",
  },
  {
    id: "chocken",
    label: "Chicken",
    img: ChickenImg,
    tag: "food",
  },
  {
    id: "sodadrinks",
    label: "Soda Drinks",
    img: SodaDrinks,
    tag: "food",
  },
  {
    id: "freshjuice",
    label: "Fresh Juice",
    img: FreshJuice,
    tag: "drinks",
  },
  {
    id: "warmdrinks",
    label: "Warm Drinks",
    img: WarmDrinks,
    tag: "drinks",
  },
];

export default function MenuCategories({
  categories,
  categoryTag,
  selectedCategory,
}) {
  const dispatch = useAppDispatch();

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

  return (
    <Box sx={Styles.categoriesContainer}>
      {categoriesData(categoryTag).map((category, index) => (
        <Box
          onClick={() => {
            console.log(category);
            dispatch(setSelectedCategory(category));
          }}
          key={index}
          sx={Styles.categoryBox}
        >
          {/* <Avatar
            style={Styles.categoryAvatarStyle}
            sx={Styles.categoryAvatar}
            alt={category.name}
            src={category.image}
          /> */}
          <img
            src={category.image ? category.image : PlaceHolder}
            alt="Product Image"
            style={Styles.categoryImage}
            width={50}
            height={50}
          />
          <Typography variant="h6" sx={Styles.categoryLabel}>
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
