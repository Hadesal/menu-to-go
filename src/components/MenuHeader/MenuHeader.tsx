import { Box, Typography } from "@mui/material";
import { Styles } from "./MenuHeader.styles";

export default function MenuHeader() {
  const title: string = "";

  return (
    <Box sx={{ marginBottom: "2rem" }}>
      <Box sx={Styles.backgroundBluredDivStyle}></Box>
      <div
        className="titleContainer"
        style={{ display: "flex", marginTop: "1rem" }}
      >
        <Typography
          sx={{ fontWeight: "600", fontSize: "32px" }}
          variant="h4"
          color="var(--primary-color)"
        >
          {title ? title.split("-")[0] : "MENU"}
        </Typography>
        <Typography sx={{ fontWeight: "600", fontSize: "32px" }} variant="h4">
          {title ? title : "-TO-GO"}
        </Typography>
      </div>

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
