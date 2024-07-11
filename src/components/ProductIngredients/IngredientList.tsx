import { Box } from "@mui/material";
import IngredientItem from "./IngredientItem";

interface Ingredient {
  ingredientImg: string;
  ingredientName: string;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  listView: boolean;
}

const styles = {
  container: {
    display: "flex",
    overflowX: "auto",
    gap: "1.5rem",
    scrollbarWidth: "none", // For Firefox
    msOverflowStyle: "none", // For Internet Explorer and Edge
    "&::-webkit-scrollbar": {
      // For WebKit (Chrome, Safari)
      display: "none",
    },
  },
  listContainer: {
    display: "block",
  },
  list: {
    padding: 0,
    listStyleType: "none",
  },
  listItem: {
    display: "list-item",
    listStyleType: "disc", // Combine disc with red color
    color: "var(--primary-color)",
    marginLeft: "20px",
    marginBottom: "0.5rem",
  },
};

export default function IngredientList({
  ingredients,
  listView,
}: IngredientListProps) {
  return (
    <Box sx={listView ? styles.listContainer : styles.container}>
      {listView ? (
        <ul style={styles.list}>
          {ingredients.map((ingredient, index) => (
            <li key={index} style={styles.listItem}>
              {ingredient.ingredientName}
            </li>
          ))}
        </ul>
      ) : (
        ingredients.map((ingredient, index) => (
          <IngredientItem key={index} ingredient={ingredient} />
        ))
      )}
    </Box>
  );
}
