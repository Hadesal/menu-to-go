import { Box, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Styles } from "./ProductDetails.styles";
import PlaceHolder from "@assets/catering-item-placeholder-704x520.png";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { setSelectedProduct } from "@redux/slices/menuSlice";
import { productDefaultData } from "@constants/constants";

interface productDetailsProps {
  productImg?: string;
  productName: string;
  productDescription: string;
  productPrice: number;
}

export default function ProductDetails({
  productName,
  productDescription,
  productImg,
  productPrice,
}: productDetailsProps) {
  const { restaurantData } = useAppSelector((state) => state.menuData);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        onClick={() => dispatch(setSelectedProduct(productDefaultData))}
        sx={{
          position: "absolute",
          top: 16,
          left: 12,
          zIndex: 2,
          backgroundColor: "white",
        }}
        aria-label="Go Back"
      >
        <NavigateBeforeIcon
          fontSize="large"
          sx={{ color: restaurantData.userUiPreferences?.colors.primaryColor }}
        />
      </IconButton>
      <img
        src={productImg ? productImg : PlaceHolder}
        alt="Product Image"
        style={Styles.productImage}
        width={"100%"}
        height={400}
      />
      <Box sx={Styles.ProductDetailsWrapper}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
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
              ...Styles.price,
              fontFamily: restaurantData.userUiPreferences.fontType,
            }}
            color={restaurantData.userUiPreferences.colors.secondaryColor}
            variant="h5"
          >
            {productPrice}$
          </Typography>
        </Box>
        <Typography
          sx={{
            ...Styles.subTitle,
            color: restaurantData.userUiPreferences.colors.primaryColor,
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
