import { Box, Typography } from "@mui/material";
import { Styles } from "./ProductPage.styles";

interface Section {
  name: string;
  children: React.ReactNode;
}
const Section = ({ name, children }: Section) => {
  return (
    <Box sx={Styles.sectionWrapper}>
      <Typography
        color="var(--primary-color)"
        variant="h6"
        sx={Styles.sectionName}
      >
        {name}
      </Typography>
      {children}
    </Box>
  );
};

export default Section;
