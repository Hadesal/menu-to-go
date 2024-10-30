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

export default function MenuProductsList({ product }) {
  const dispatch = useAppDispatch();
  const { restaurantData } = useAppSelector((state) => state.menuData);

  return (
    <Card
      onClick={() => {
        dispatch(setSelectedProduct(product));
      }}
      sx={{ height: "90px", borderRadius: "16px", marginBottom: "10px" }}
    >
      <CardActionArea
        sx={{ display: "flex", flexDirection: "row", height: "100%" }}
      >
        <CardMedia
          component="img"
          height="100%"
          width="100%"
          image={product.image ? product.image : PlaceHolder}
          alt={product.name}
          sx={{ width: "100px", borderRadius: "16px 0 0 16px" }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem 1rem", // Use only this padding value
            color: "#A4755D",
            flex: 1,
            height: "100%",
            // justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                fontFamily: restaurantData.userUiPreferences.fontType,
              }}
              component="div"
              color={restaurantData.userUiPreferences.colors.primaryColor}
            >
              {product.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                color: restaurantData.userUiPreferences.colors.primaryColor,
              }}
            >
              {product.price}$
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              fontFamily: restaurantData.userUiPreferences.fontType,
              color: "#BCB8B1",
              marginTop: 1,
              width: "250px",
              height: "20px",
              overflow: "hidden",
              whiteSpace: "nowrap",
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
