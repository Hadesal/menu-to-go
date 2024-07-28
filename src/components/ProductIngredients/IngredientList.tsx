import { Box } from "@mui/material";
import IngredientItem from "./IngredientItem";
import { Styles } from "./ProductIngredients.styles";
import { useAppSelector } from "../../utils/hooks";

interface Ingredient {
  img: string;
  name: string;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  listView: boolean;
}

export default function IngredientList({
  ingredients,
  listView,
}: IngredientListProps) {
  const { restaurantData } = useAppSelector((state) => state.menuData);

  return (
    <Box sx={listView ? Styles.listContainer : Styles.cardContainer}>
      {listView ? (
        <ul style={Styles.ingredientList}>
          {ingredients.map((ingredient, index) => (
            <li
              key={index}
              style={{
                ...Styles.ingredientListItem,
                fontFamily: restaurantData.userUiPreferences.fontType,
              }}
            >
              {ingredient.name}
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
