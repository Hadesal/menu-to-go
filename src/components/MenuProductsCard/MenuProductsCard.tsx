import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import PlaceHolder from "../../assets/catering-item-placeholder-704x520.png";
import { setSelectedProduct } from "../../redux/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
export default function MenuProductsCard({ product }) {
  const dispatch = useAppDispatch();
  const { restaurantData } = useAppSelector((state) => state.menuData);
  return (
    <Card
      onClick={() => {
        dispatch(setSelectedProduct(product));
      }}
      sx={{ height: "200px", borderRadius: "16px" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          width="100%"
          image={product.image ? product.image : PlaceHolder}
          alt={product.name}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: 1,
            marginTop: "0.5rem",
            justifyContent: "space-between",
            color: "#A4755D",
            lineHeight: "1rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              fontFamily: restaurantData.userUiPreferences.fontType,
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
            color={restaurantData.userUiPreferences.colors.primaryColor}
          >
            {product.price}$
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
