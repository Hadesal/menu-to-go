import { Paper, Typography } from "@mui/material";
import { Styles } from "./Extras.styles";
import { useAppSelector } from "@redux/reduxHooks";
import PlusIcon from "./PlusIcon";
import { ExtrasData } from "@dataTypes/ProductDataTypes";

interface ExtrasItemProps {
  extras: ExtrasData;
}

export default function ExtrasItem({ extras }: ExtrasItemProps) {
  const { restaurantData } = useAppSelector((state) => state.menuData);

  return (
    <Paper elevation={2} sx={Styles.ExtrasItemWrapper}>
      <PlusIcon
        color={restaurantData.userUiPreferences.colors.primaryColor}
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
