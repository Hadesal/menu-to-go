import { Box, Typography } from "@mui/material";
import { Styles } from "./ProductPage.styles";
import { useAppSelector } from "../../utils/hooks";

interface Section {
  name: string;
  children: React.ReactNode;
}
const Section = ({ name, children }: Section) => {
  const { restaurantData } = useAppSelector((state) => state.menuData);

  return (
    <Box sx={Styles.sectionWrapper}>
      <Typography
        color={restaurantData.userUiPreferences.primaryColor}
        variant="h6"
        sx={{
          ...Styles.sectionName,
          fontFamily: restaurantData.userUiPreferences.fontType,
        }}
      >
        {name}
      </Typography>
      {children}
    </Box>
  );
};

export default Section;
