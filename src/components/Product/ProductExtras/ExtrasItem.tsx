import { Paper, Typography } from "@mui/material";
import { Styles } from "./Extras.styles";
import { useAppSelector } from "@redux/reduxHooks";
import PlusIcon from "./PlusIcon";
import { ExtrasData } from "@dataTypes/ProductDataTypes";
import { currencies } from "@components/common/Dialogs/UserDetailsDialog/Data/userDetailsData";

interface ExtrasItemProps {
  extras: ExtrasData;
}

export default function ExtrasItem({ extras }: ExtrasItemProps) {
  const { restaurantData } = useAppSelector((state) => state.menuData);
  const currencyObject = currencies.find(
    (curr) => curr.currency === restaurantData?.currency
  );
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
        {extras.price}
        {currencyObject?.symbol}
      </Typography>
    </Paper>
  );
}
