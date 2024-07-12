import { Box } from "@mui/material";
import IngredientItem from "./IngredientItem";
import { Styles } from "./ProductIngredients.styles";

interface Ingredient {
  ingredientImg: string;
  ingredientName: string;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  listView: boolean;
}

export default function IngredientList({
  ingredients,
  listView,
}: IngredientListProps) {
  return (
    <Box sx={listView ? Styles.listContainer : Styles.cardContainer}>
      {listView ? (
        <ul style={Styles.ingredientList}>
          {ingredients.map((ingredient, index) => (
            <li key={index} style={Styles.ingredientListItem}>
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
