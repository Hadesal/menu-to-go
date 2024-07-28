import { Paper, Typography } from "@mui/material";
import PlusImage from "../../assets/ph_plus-fill.svg";
import { Styles } from "./Extras.styles";
import { useAppSelector } from "../../utils/hooks";
import PlusIcon from "./PlusIcon";

interface Extras {
  name: string;
  price: string;
}

interface ExtrasItemProps {
  extras: Extras;
}

export default function ExtrasItem({ extras }: ExtrasItemProps) {
  const { restaurantData } = useAppSelector((state) => state.menuData);

  return (
    <Paper elevation={2} sx={Styles.ExtrasItemWrapper}>
      <PlusIcon
        color={restaurantData.userUiPreferences.primaryColor}
        width={14}
        height={14}
        style={Styles.bulletImage}
      />
      <Typography
        component="span"
        sx={{
          ...Styles.ExtrasItemName,
          fontFamily: restaurantData.userUiPreferences.fontType,
        }}
      >
        {extras.name}
      </Typography>
      <Typography
        component="span"
        sx={{
          ...Styles.ExtrasItemPrice,
          fontFamily: restaurantData.userUiPreferences.fontType,
        }}
      >
        {extras.price}$
      </Typography>
    </Paper>
  );
}
