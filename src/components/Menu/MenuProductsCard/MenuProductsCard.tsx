import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import PlaceHolder from "@assets/catering-item-placeholder-704x520.png";
import { setSelectedProduct } from "@redux/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import vegetarianLogo from "../../../assets/veggie.png";
import halalLogo from "../../../assets/Halal_logo.svg.png";
import veganLogo from "../../../assets/vegan.png";
import { ProductData } from "@dataTypes/ProductDataTypes";

export default function MenuProductsCard({
  product,
}: {
  product: ProductData;
}) {
  const dispatch = useAppDispatch();
  const { restaurantData } = useAppSelector((state) => state.menuData);

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
    <Card
      onClick={() => {
        if (product.isAvailable) {
          dispatch(setSelectedProduct(product));
        }
      }}
      sx={{
        borderRadius: "5px",
        padding: 0,
        pointerEvents: product.isAvailable ? "auto" : "none",
        cursor: product.isAvailable ? "pointer" : "not-allowed",
        height: "263px",
        position: "relative",
      }}
    >
      {!product.isAvailable && (
        <Box
          sx={{
            position: "absolute",
            top: "18px",
            right: "-20px",
            backgroundColor: "red",
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
            padding: "5px 15px",
            borderRadius: "5px",
            transform: "rotate(45deg)", // Gives the banner effect
            zIndex: 10, // Ensure banner stays above everything
          }}
        >
          Out of Stock
        </Box>
      )}

      {/* Overlay for dimming the background */}
      {!product.isAvailable && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(rgba(255, 255, 255, 0.051), rgba(255, 255, 255, 0.051))", // Optional gradient
            zIndex: 5, // Below the banner
            borderRadius: "15px", // Matches Card's border radius
          }}
        />
      )}
      <CardActionArea
        sx={{
          opacity: product.isAvailable ? 1 : 0.5,
          height: "100%",
        }}
      >
        <Box
          sx={{ position: "relative", margin: 0, padding: 0, height: "55%" }}
        >
          <CardMedia
            component="img"
            width="100%"
            height="100%"
            image={product.image ? (product.image as string) : PlaceHolder}
            alt={product.name}
          />
          {product.details.dietaryOptions &&
            product.details.dietaryOptions.value.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  right: 5,
                  bottom: 5,
                  backgroundColor: "white",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={getDietaryOptionLogo(
                    product.details.dietaryOptions.label
                  )}
                  alt={product.details.dietaryOptions.value}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
              </Box>
            )}
        </Box>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 1,
            // marginTop: "0.5rem",
            color: "#A4755D",
            justifyContent: "space-between",
            height: "45%",
          }}
        >
          {product.details.labels && product.details.labels.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                marginBottom: 1,
                justifyContent: "flex-start",
              }}
            >
              {product.details.labels.map((label, index) => {
                let bgColor, textColor;
                switch (label.value) {
                  case "Bestseller":
                    bgColor = "#C69328"; // Darker gold for bestseller
                    textColor = "white"; // White text for contrast
                    break;
                  case "New":
                    bgColor = "#4CAF50"; // Green for new
                    textColor = "black"; // Black text for contrast
                    break;
                  case "Spicy":
                    bgColor = "#D84315"; // Dark red for spicy
                    textColor = "white"; // White text for contrast
                    break;
                  default:
                    bgColor = "black";
                    textColor = "white";
                }

                return (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: "10px",
                      padding: "5px",
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
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              fontFamily: restaurantData.userUiPreferences.fontType,
              wordBreak: "break-word",
              height: "40px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2, // Number of lines to show before ellipsis
              WebkitBoxOrient: "vertical",
            }}
            gutterBottom
            component="div"
            color={restaurantData.userUiPreferences.colors.primaryColor}
          >
            {product.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: restaurantData.userUiPreferences.fontType,
            }}
            component="div"
            color={restaurantData.userUiPreferences.colors.secondaryColor}
          >
            {product.price}$
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
