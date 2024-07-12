import { Box, Typography } from "@mui/material";
import { Styles } from "./MenuHeader.styles";

export default function MenuHeader() {
  const title: string = "";

  return (
    <Box sx={Styles.container}>
      <Box sx={Styles.backgroundBluredDivStyle}></Box>
      <Box sx={Styles.titleContainer}>
        <Typography
          sx={Styles.titlePrimary}
          variant="h4"
          color="var(--primary-color)"
        >
          {title ? title.split("-")[0] : "MENU"}
        </Typography>
        <Typography sx={Styles.titleSecondary} variant="h4">
          {title ? title : "-TO-GO"}
        </Typography>
      </Box>
      <Box
        sx={{
          ...Styles.backgroundBluredDivStyle2,
          top: 40,
          right: 0,
          width: 100,
          height: 100,
        }}
      ></Box>
    </Box>
  );
}
