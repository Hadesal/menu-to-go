import { Box, Paper, Typography } from "@mui/material";
import BulletImage from "../../assets/tabler_point.svg";
import { Styles } from "./ProductVariants.styles";
import { useAppSelector } from "../../utils/hooks";
import PlusIcon from "../ProductExtras/PlusIcon";
import BulletIcon from "./BulletIcon";

interface Variant {
  name: string;
  price: string;
}

interface VariantListProps {
  variants: Variant[];
}

export default function VariantList({ variants }: VariantListProps) {
  const { restaurantData } = useAppSelector((state) => state.menuData);

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
                <Box sx={{ marginRight: "0.5rem" }}>
                  <BulletIcon
                    width={10}
                    height={10}
                    color={restaurantData.userUiPreferences.primaryColor}
                    style={Styles.bulletImage}
                  />
                </Box>

                <Typography
                  color={restaurantData.userUiPreferences.primaryColor}
                  sx={{
                    ...Styles.VariantName,
                    fontFamily: restaurantData.userUiPreferences.fontType,
                  }}
                >
                  {variant.name}
                </Typography>
              </Box>
              <Typography
                sx={{
                  ...Styles.VariantName,
                  fontFamily: restaurantData.userUiPreferences.fontType,
                }}
              >
                {variant.price}$
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
