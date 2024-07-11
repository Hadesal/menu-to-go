import { Box, Paper, Typography } from "@mui/material";
import BulletImage from "../../assets/tabler_point.svg";
interface Variant {
  variantName: string;
  variantPrice: string;
}

interface VariantListProps {
  variants: Variant[];
}

export default function VariantList({ variants }: VariantListProps) {
  return (
    <Box>
      <Paper
        sx={{
          borderRadius: "16px",
          paddingRight: "1.5rem",
          display: "flex",
          flexDirection: "column",
          background: "#F9FDFE",
        }}
        elevation={3}
      >
        <ul style={{ listStyleType: "none", paddingLeft: "1.5rem" , paddingRight:"0.7rem" }}>
          {variants.map((variant, index) => (
            <li
              key={index}
              style={{
                marginBottom: index === variants.length - 1 ? "0" : "0.5rem", // Apply margin only to non-last items
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={BulletImage}
                  alt="Bullet"
                  style={{
                    width: "25px", // Adjust as needed
                    height: "25px", // Adjust as needed
                    marginRight: "0.5rem", // Adjust spacing between image and content
                  }}
                />
                <Typography
                  component="span"
                  color="var(--primary-color)"
                  sx={{ fontWeight: "500", fontSize: "16px" }}
                >
                  {variant.variantName}
                </Typography>
              </Box>
              <Typography
                component="span"
                sx={{ fontWeight: "500", fontSize: "16px" }}
              >
                {variant.variantPrice}
              </Typography>
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
}
