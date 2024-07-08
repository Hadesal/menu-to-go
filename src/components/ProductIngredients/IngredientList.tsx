import { Box } from "@mui/material";
import IngredientItem from "./IngredientItem";

interface Ingredient {
  ingredientImg: string;
  ingredientName: string;
}

interface IngredientListProps {
  ingredients: Ingredient[];
}

const styles = {
  container: {
    display: "flex",
    overflowX: "auto",
    gap: "1.5rem",
    scrollbarWidth: "none", // For Firefox
    msOverflowStyle: "none", // For Internet Explorer and Edge
    '&::-webkit-scrollbar': { // For WebKit (Chrome, Safari)
      display: "none"
    }
  }
};

export default function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <Box sx={styles.container}>
      {ingredients.map((ingredient, index) => (
        <IngredientItem key={index} ingredient={ingredient} />
      ))}
    </Box>
  );
}
