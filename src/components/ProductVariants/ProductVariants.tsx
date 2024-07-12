import { Box, Paper, Typography } from "@mui/material";
import BulletImage from "../../assets/tabler_point.svg";
import { Styles } from "./ProductVariants.styles";

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
      <Paper sx={Styles.VariantsListWrapper} elevation={3}>
        <Box component="ul" sx={Styles.variantsList}>
          {variants.map((variant, index) => (
            <Box
              component="li"
              key={index}
              sx={{
                ...Styles.variantItem,
                marginBottom: index === variants.length - 1 ? "0" : "0.5rem",
              }}
            >
              <Box sx={Styles.VariantBox}>
                <Box
                  component="img"
                  src={BulletImage}
                  alt="Bullet"
                  sx={Styles.bulletImage}
                />
                <Typography
                  color="var(--primary-color)"
                  sx={Styles.VariantName}
                >
                  {variant.variantName}
                </Typography>
              </Box>
              <Typography sx={Styles.VariantName}>
                {variant.variantPrice}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}