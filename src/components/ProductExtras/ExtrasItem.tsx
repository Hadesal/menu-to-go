import { Paper, Typography } from "@mui/material";
import PlusImage from "../../assets/ph_plus-fill.svg";

interface Extras {
  extrasName: string;
  extrasPrice: string;
}

interface ExtrasItemProps {
  extras: Extras;
}

export default function ExtrasItem({ extras }: ExtrasItemProps) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5rem 0.8rem",
        flex: "0 0 calc(50% - 0.5rem)",
        borderRadius: "8px",
        marginBottom: "0.5rem",
      }}
    >
      <img
        src={PlusImage}
        alt="Bullet"
        style={{
          width: "18px",
          height: "18px",
          marginRight: "0.3rem",
        }}
      />
      <Typography
        component="span"
        color="var(--primary-color)"
        sx={{ fontWeight: "500", fontSize: "16px" }}
      >
        {extras.extrasName}
      </Typography>
      <Typography
        component="span"
        sx={{ fontWeight: "500", fontSize: "16px", marginLeft: "auto" }}
      >
        {extras.extrasPrice}
      </Typography>
    </Paper>
  );
}
