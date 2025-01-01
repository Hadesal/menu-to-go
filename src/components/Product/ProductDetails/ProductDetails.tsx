import PlaceHolder from "@assets/catering-item-placeholder-704x520.png";
import { productDefaultData } from "@constants/constants";
import { DietaryOptions, Labels } from "@dataTypes/ProductDataTypes";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Box, IconButton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { setSelectedProduct } from "@redux/slices/menuSlice";
import halalLogo from "../../../assets/Halal_logo.svg.png";
import veganLogo from "../../../assets/vegan.png";
import vegetarianLogo from "../../../assets/veggie.png";
import { Styles } from "./ProductDetails.styles";

interface productDetailsProps {
  productImg?: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productLabels: Labels[];
  productDietaryOption: DietaryOptions;
}

export default function ProductDetails({
  productName,
  productDescription,
  productImg,
  productPrice,
  productLabels,
  productDietaryOption,
}: productDetailsProps) {
  const { restaurantData } = useAppSelector((state) => state.menuData);
  const dispatch = useAppDispatch();

  // Function to determine the dietary option logo
  const getDietaryOptionLogo = (dietaryOption: string) => {
    switch (dietaryOption) {
      case "Halal":
        return halalLogo;
      case "Vegetarian":
        return vegetarianLogo;
      case "Vegan":
        return veganLogo;
      default:
        return "";
    }
  };

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
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <img
          src={productImg ? productImg : PlaceHolder}
          alt="Product Image"
          style={Styles.productImage}
          width={"100%"}
          height={400}
        />

        {productDietaryOption.value.length > 0 && (
          <Box
            sx={{
              position: "absolute",
              right: 10,
              bottom: 15,
              backgroundColor: "white",
              width: 60,
              height: 60,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={getDietaryOptionLogo(productDietaryOption.label)}
              alt={productDietaryOption.value}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
              }}
            />
          </Box>
        )}
      </Box>
      <Box sx={Styles.ProductDetailsWrapper}>
        {productLabels && productLabels.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "flex-start",
            }}
          >
            {productLabels.map((label, index) => {
              let bgColor, textColor;
              switch (label.value) {
                case "Bestseller":
                  bgColor = "#C69328";
                  textColor = "white";
                  break;
                case "New":
                  bgColor = "#4CAF50";
                  textColor = "white";
                  break;
                case "Spicy":
                  bgColor = "#D84315";
                  textColor = "white";
                  break;
                default:
                  bgColor = "black";
                  textColor = "white";
              }

              return (
                <Typography
                  key={index}
                  sx={{
                    fontSize: "14px",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    backgroundColor: bgColor,
                    color: textColor,
                    display: "inline-block",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label.label}
                </Typography>
              );
            })}
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              ...Styles.title,
              wordBreak: "break-word",
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
