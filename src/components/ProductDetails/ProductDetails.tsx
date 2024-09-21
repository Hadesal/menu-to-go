import { Box, Typography } from "@mui/material";
//import productImage from "../../assets/Hawaiian-Chicken.jpg";
//import burger from "../../assets/burger.jpg";
import { Styles } from "./ProductDetails.styles";
// import PlaceHolder from "../../assets/food-placeholder-1.jpg"; // Importing the image as a default export
import { useAppSelector } from "../../utils/hooks";
import PlaceHolder from "../../assets/catering-item-placeholder-704x520.png";

interface productDetailsProps {
  productImg?: string;
  productName: string;
  productDescription: string;
}

export default function ProductDetails({
  productName,
  productDescription,
  productImg,
}: productDetailsProps) {
  const { restaurantData } = useAppSelector((state) => state.menuData);

  return (
    <Box>
      <img
        src={productImg ? productImg : PlaceHolder}
        alt="Product Image"
        style={Styles.productImage}
        width={"100%"}
        height={250}
      />
      <Box sx={Styles.ProductDetailsWrapper}>
        <Typography
          sx={{
            ...Styles.title,
            fontFamily: restaurantData.userUiPreferences.fontType,
          }}
          color={restaurantData.userUiPreferences.colors.primaryColor}
          variant="h5"
        >
          {productName}
        </Typography>
        <Typography
          sx={{
            ...Styles.subTitle,
            fontFamily: restaurantData.userUiPreferences.fontType,
          }}
          variant="body2"
        >
          {productDescription}
        </Typography>
      </Box>
    </Box>
  );
}
