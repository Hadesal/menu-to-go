import React, { useState } from "react";
import { Box, Avatar } from "@mui/material";
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

export default function MenuCategories({ categoryTag }) {
  const [selectedCategory, setSelectedCategory] = useState("Vegan");

  const categoriesData = (categoryTag: string) => {
    let categoriesDataArray = [];

    if (categoryTag === "food") {
      categoriesDataArray = categories.filter((category) => {
        return category.tag === "food";
      });
    } else {
      categoriesDataArray = categories.filter((category) => {
        return category.tag === "drinks";
      });
    }

    return categoriesDataArray;
  };

  return (
    <Box sx={Styles.categoriesContainer}>
      {categoriesData(categoryTag).map((category, index) => (
        <Box key={index} sx={Styles.categoryBox}>
          <Avatar
            style={Styles.categoryAvatarStyle}
            sx={Styles.categoryAvatar}
            alt={category.label}
            src={category.img}
          />
          <Box sx={Styles.categoryLabel}>{category.label}</Box>
          {category.label === selectedCategory && (
            <Box sx={Styles.selectedCategoryIndicator} />
          )}
        </Box>
      ))}
    </Box>
  );
}
