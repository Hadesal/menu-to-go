import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import PlaceHolder from "@assets/catering-item-placeholder-704x520.png";
import { setSelectedProduct } from "@redux/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { hexToRgba } from "@utils/colors";
import vegetarianLogo from "../../../assets/veggie.png";
import halalLogo from "../../../assets/Halal_logo.svg.png";
import veganLogo from "../../../assets/vegan.png";
import { ProductData } from "@dataTypes/ProductDataTypes";

interface MenuProductsListProps {
  product: ProductData;
}

export default function MenuProductsList({ product }: MenuProductsListProps) {
  const dispatch = useAppDispatch();
  const { restaurantData } = useAppSelector((state) => state.menuData);

  const lighterOpacityColor = hexToRgba(
    restaurantData.userUiPreferences.colors.primaryColor,
    0.8 // Adjust the opacity here (0 is fully transparent, 1 is fully opaque)
  );

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
        height:
          product.details.labels?.length > 0 &&
          product.details.ingredients?.length > 0
            ? "175px"
            : "155px",
        marginBottom: "10px",
        borderRadius: "15px",
        padding: 2,
        position: "relative", // Required for overlay positioning
        cursor: "pointer",
      }}
      elevation={2}
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
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
          justifyContent: "start",
          position: "relative",
          zIndex: 1,
          opacity: product.isAvailable ? 1 : 0.5,
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            width: "40%",
            padding: "0px 0px 0px 0px",
          }}
        >
          <CardMedia
            component="img"
            image={product.image || PlaceHolder}
            alt={product.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "15px",
            }}
          />

          {product.details.dietaryOptions.value.length > 0 && (
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
                src={getDietaryOptionLogo(product.details.dietaryOptions.label)}
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
            position: "relative",
            boxSizing: "border-box",
            height: "100%",
            padding: "0px 0px 15px 10px",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {product.details.labels?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
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
                      textColor = "white"; // Black text for contrast
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
                fontSize: "16px",
                fontFamily: restaurantData.userUiPreferences.fontType,
                gap: 1,
                overflow: "hidden",
                wordBreak: "break-word",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
              }}
              component="div"
              color={restaurantData.userUiPreferences.colors.primaryColor}
            >
              {product.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 400,
                fontFamily: restaurantData.userUiPreferences.fontType,
                color: lighterOpacityColor,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
              }}
            >
              {product.details.ingredients
                .map((ingredient) => ingredient.name)
                .join(", ")}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: restaurantData.userUiPreferences.colors.secondaryColor,
            }}
          >
            {product.price}€
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
