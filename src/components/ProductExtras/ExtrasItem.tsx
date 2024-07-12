import { Paper, Typography } from "@mui/material";
import PlusImage from "../../assets/ph_plus-fill.svg";
import { Styles } from "./Extras.styles";

interface Extras {
  extrasName: string;
  extrasPrice: string;
}

interface ExtrasItemProps {
  extras: Extras;
}

export default function ExtrasItem({ extras }: ExtrasItemProps) {
  return (
    <Paper elevation={2} sx={Styles.ExtrasItemWrapper}>
      <img src={PlusImage} alt="Bullet" style={Styles.bulletImage} />
      <Typography component="span" sx={Styles.ExtrasItemName}>
        {extras.extrasName}
      </Typography>
      <Typography component="span" sx={Styles.ExtrasItemPrice}>
        {extras.extrasPrice}
      </Typography>
    </Paper>
  );
}
