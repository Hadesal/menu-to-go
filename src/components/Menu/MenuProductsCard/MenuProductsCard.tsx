import PlaceHolder from "@assets/catering-item-placeholder-704x520.png";
import { ProductData } from "@dataTypes/ProductDataTypes";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { setSelectedProduct } from "@redux/slices/menuSlice";
import halalLogo from "../../../assets/Halal_logo.svg.png";
import veganLogo from "../../../assets/vegan.png";
import vegetarianLogo from "../../../assets/veggie.png";

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
        if (!product.isSoldOut) {
          dispatch(setSelectedProduct(product));
        }
      }}
      sx={{
        borderRadius: "5px",
        padding: 0,
        height: "263px",
        position: "relative",
      }}
    >
      {/* Sold Out Chip */}
      {product.isSoldOut && (
        <Chip
          label="Sold Out"
          variant="filled"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            fontWeight: "bold",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            zIndex: 10,
          }}
        />
      )}
      <CardActionArea
        sx={{
          height: "100%",
          filter: product.isSoldOut ? "grayscale(100%)" : "none",
          opacity: product.isSoldOut ? 0.8 : 1,
        }}
      >
        <Box
          sx={{ position: "relative", margin: 0, padding: 0, height: "55%" }}
        >
          <CardMedia
            component="img"
            width="100%"
            height="100%"
            image={product.image ? product.image : PlaceHolder}
            onError={(e) => ((e.target as HTMLImageElement).src = PlaceHolder)}
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
