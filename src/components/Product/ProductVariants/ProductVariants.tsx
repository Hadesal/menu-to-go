import { Box, Paper, Typography } from "@mui/material";
import { Styles } from "./ProductVariants.styles";
import { useAppSelector } from "../../../redux/reduxHooks";
import BulletIcon from "./BulletIcon";
import { VariantData } from "@dataTypes/ProductDataTypes";
import { currencies } from "@components/common/Dialogs/UserDetailsDialog/Data/userDetailsData";

interface VariantListProps {
  variants: VariantData[];
}

export default function VariantList({ variants }: VariantListProps) {
  const { restaurantData } = useAppSelector((state) => state.menuData);
  const currencyObject = currencies.find(
    (curr) => curr.currency === restaurantData?.currency
  );
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
                    color={restaurantData.userUiPreferences.colors.primaryColor}
                    style={Styles.bulletImage}
                  />
                </Box>

                <Typography
                  color={restaurantData.userUiPreferences.colors.primaryColor}
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
                {variant.price}
                {currencyObject?.symbol}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
