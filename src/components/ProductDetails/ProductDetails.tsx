import { Box, Typography } from "@mui/material";
//import productImage from "../../assets/Hawaiian-Chicken.jpg";
//import burger from "../../assets/burger.jpg";
import { Styles } from "./ProductDetails.styles";
import Latte from "../../assets/latte.jpg"; // Importing the image as a default export

interface productDetailsProps {
  productImg: string;
  productName: string;
  productDescription: string;
}

export default function ProductDetails() {
  return (
    <Box>
      <img
        src={Latte}
        alt="Product Image"
        style={Styles.productImage}
        width={"100%"}
        height={200}
      />
      <Box sx={Styles.ProductDetailsWrapper}>
        <Typography sx={Styles.title} color="var(--primary-color)" variant="h6">
          {/* Turkey Burger */}
          Cafe latte
        </Typography>
        <Typography sx={Styles.subTitle} variant="body2">
          Enjoy a delicious Turkey Burger served with curly fries and a drink of
          your choice. Quick to prepare and rich in vitamins and minerals, this
          meal offers a balanced preparation of protein, carbohydrates, and
          fibers. A classic blend of espresso and steamed milk, offering a
          smooth and creamy coffee experience.
        </Typography>
      </Box>
    </Box>
  );
}
