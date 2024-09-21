import { Box, Typography } from "@mui/material";
import { Styles } from "./MenuHeader.styles";
import { useAppSelector } from "../../utils/hooks";

export default function MenuHeader() {
  const title: string = "";
  const { restaurantData } = useAppSelector((state) => state.menuData);
  return (
    <Box sx={Styles.container}>
      <Box sx={Styles.backgroundBluredDivStyle}></Box>
      <Box sx={Styles.titleContainer}>
        <Typography
          sx={Styles.titlePrimary}
          variant="h4"
          color={restaurantData.userUiPreferences.colors.primaryColor}
        >
          {title ? title.split("-")[0] : "Menu"}
        </Typography>
        <Typography sx={Styles.titleSecondary} variant="h4">
          {title ? title : "-To-Go"}
        </Typography>
      </Box>
      <Box
        sx={{
          ...Styles.backgroundBluredDivStyle2,
          top: 40,
          right: 0,
          width: 70,
          height: 70,
        }}
      ></Box>
    </Box>
  );
}
