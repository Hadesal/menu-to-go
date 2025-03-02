import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from "@mui/material";
import PlaceHolder from "@assets/catering-item-placeholder-704x520.png";
import { setSelectedProduct } from "@redux/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { hexToRgba } from "@utils/colors";
import vegetarianLogo from "../../../assets/veggie.png";
import halalLogo from "../../../assets/Halal_logo.svg.png";
import veganLogo from "../../../assets/vegan.png";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { useLanguage } from "src/hooks/useLanguage";
import { currencies } from "../../common/Dialogs/UserDetailsDialog/Data/userDetailsData";
import { dietaryOptionsMap, labelsOptions } from "@constants/productLabels";

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
  const { currentLanguage } = useLanguage();

  const currencyObject = currencies.find(
    (curr) => curr.currency === restaurantData?.currency
  );
  // Function to determine the dietary option logo
  const getDietaryOptionLogo = (dietaryOption: string) => {
    return dietaryOptionsMap[dietaryOption as keyof typeof dietaryOptionsMap]
      ?.image;
  };

  return (
    <Card
      onClick={() => {
        dispatch(setSelectedProduct(product));
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
      {/* Sold Out Chip */}
      {product.isSoldOut && (
        <Chip
          label="Sold Out"
          variant="filled"
          sx={{
            position: "absolute",
            top: 22,
            left: 22,
            fontWeight: "bold",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            zIndex: 10,
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
          filter: product.isSoldOut ? "grayscale(100%)" : "none",
          opacity: product.isSoldOut ? 0.8 : 1,
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
            image={(product.image as string) || PlaceHolder}
            onError={(e) => ((e.target as HTMLImageElement).src = PlaceHolder)}
            alt={product.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "15px",
            }}
          />

          {product.details.dietaryOptionLabel &&
            product.details.dietaryOptionLabel.length > 0 && (
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
                  src={getDietaryOptionLogo(product.details.dietaryOptionLabel)}
                  alt={product.details.dietaryOptionLabel}
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
            padding:
              currentLanguage === "ar"
                ? "0px 10px 15px 0px"
                : "0px 0px 15px 10px",
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
                  switch (label) {
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
                      {labelsOptions[label as keyof typeof labelsOptions]}
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
            {product.price}
            {currencyObject?.symbol}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
