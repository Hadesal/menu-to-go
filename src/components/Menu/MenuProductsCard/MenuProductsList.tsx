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

export default function MenuProductsList({ product }) {
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
        height:"150px",
        marginBottom: "10px",
      }}
      elevation={0}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
          justifyContent: "start",
        }}
      >
        <CardMedia
          component="img"
          image={product.image || PlaceHolder}
          alt={product.name}
          sx={{
            width: "40%",
            height:"150px",
            objectFit: "cover",
            objectPosition: "center", 
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxSizing: "border-box",
            height: "100%",
            padding: "10px 0px 10px 10px",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontFamily: restaurantData.userUiPreferences.fontType,
                overflow: "hidden",
                wordBreak:"break-all",
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
                marginTop: 0.2,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
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
