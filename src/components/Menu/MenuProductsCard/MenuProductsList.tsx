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
import { ProductData } from "@dataTypes/ProductDataTypes";

export default function MenuProductsList({
  product,
}: {
  product: ProductData;
}) {
  const dispatch = useAppDispatch();
  const { restaurantData } = useAppSelector((state) => state.menuData);

  const lighterOpacityColor = hexToRgba(
    restaurantData.userUiPreferences.colors.primaryColor,
    0.8 // Adjust the opacity here (0 is fully transparent, 1 is fully opaque)
  );
  return (
    <Card
      onClick={() => {
        dispatch(setSelectedProduct(product));
      }}
      sx={{
        height: product.details.ingredients.length > 0 ? "110px" : "100px",
        borderRadius: "16px",
        marginBottom: "10px",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          image={product.image || PlaceHolder} // Use a default placeholder if no image exists
          alt={product.name}
          sx={{
            width: "115px",
            height: "125px",
            borderRadius: "16px 0 0 16px",
            objectFit: "cover", // Ensures the image scales properly within the dimensions
            objectPosition: "center", // Centers the image
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxSizing: "border-box", // Ensure padding is included in the width/height
            flex: 1, // Fill the remaining space in the row layout
            padding: "10px", // Apply desired padding
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                fontFamily: restaurantData.userUiPreferences.fontType,
                overflow: "hidden",
                width: "calc(100% - 50px)", // Ensure it doesn't exceed parent width
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
                fontSize: "16px",
                fontWeight: 600,
                color: restaurantData.userUiPreferences.colors.secondaryColor,
              }}
            >
              {product.price}€
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              fontFamily: restaurantData.userUiPreferences.fontType,
              color: lighterOpacityColor,
              marginTop: 0.5,
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
