import { Box, Typography } from "@mui/material";

interface Ingredient {
  ingredientImg: string;
  ingredientName: string;
}

interface IngredientItemProps {
  ingredient: Ingredient;
}

export default function IngredientItem({ ingredient }: IngredientItemProps) {
  return (
    <Box sx={{ width: "50px" }}>
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
        sx={{ fontSize: "12px", fontWeight: "400", lineHeight: "14px" }}
      >
        {ingredient.ingredientName}
      </Typography>
    </Box>
  );
}