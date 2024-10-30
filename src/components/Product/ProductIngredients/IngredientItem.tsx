import { Box, Typography } from "@mui/material";
import { Styles } from "./ProductIngredients.styles";
import PlaceHolder from "@assets/catering-item-placeholder-704x520.png";
import { useAppSelector } from "@redux/reduxHooks";
import { IngredientData } from "@dataTypes/ProductDataTypes";

interface IngredientItemProps {
  ingredient: IngredientData;
}

export default function IngredientItem({ ingredient }: IngredientItemProps) {
  const { restaurantData } = useAppSelector((state) => state.menuData);

  return (
    <Box sx={Styles.IngredientItemContainer}>
      <img
        src={ingredient.image ? ingredient.image : PlaceHolder}
        alt={ingredient.name}
        style={{ borderRadius: "8px", backgroundSize: "contain" }}
        width={50}
        height={50}
      />
      <Typography
        variant="body2"
        textAlign="center"
        sx={{
          ...Styles.IngredientItemName,
          fontFamily: restaurantData.userUiPreferences.fontType,
        }}
      >
        {ingredient.name}
      </Typography>
    </Box>
  );
}
