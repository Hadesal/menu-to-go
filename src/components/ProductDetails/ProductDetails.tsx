import { Box, Typography } from "@mui/material";
import productImage from "../../assets/Hawaiian-Chicken.jpg";
import { Styles } from "./ProductDetails.styles";

interface productDetailsProps {
  productImg: string;
  productName: string;
  productDescription: string;
}

export default function ProductDetails() {
  return (
    <Box>
      <img
        src={productImage}
        alt="Product Image"
        style={{ borderRadius: "24px", backgroundSize: "contain" }}
        width={"100%"}
        height={168}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" , marginTop:"0.3rem" }}>
        <Typography sx={Styles.title} color="var(--primary-color)" variant="h6">
          Hawaiian Chicken Pizza Smoked
        </Typography>
        <Typography sx={Styles.subTitle} variant="body2">
          It is quick to prepare and rich in etamins and ninerals with a
          balanced preparation of protein -carbohydrates, and libbers
        </Typography>
      </Box>
    </Box>
  );
}
