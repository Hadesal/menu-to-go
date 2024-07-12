import { Box, Typography } from "@mui/material";
import { Styles } from "./ProductIngredients.styles";

interface Ingredient {
  ingredientImg: string;
  ingredientName: string;
}

interface IngredientItemProps {
  ingredient: Ingredient;
}

export default function IngredientItem({ ingredient }: IngredientItemProps) {
  return (
    <Box sx={Styles.IngredientItemContainer}>
      <img
        src={ingredient.ingredientImg}
        alt={ingredient.ingredientName}
        style={{ borderRadius: "8px", backgroundSize: "contain" }}
        width={50}
        height={50}
      />
      <Typography
        variant="body2"
        textAlign="center"
        sx={Styles.IngredientItemName}
      >
        {ingredient.ingredientName}
      </Typography>
    </Box>
  );
}
