import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import PlaceHolder from "@assets/catering-item-placeholder-704x520.png";
import { setSelectedProduct } from "@redux/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
export default function MenuProductsCard({ product }) {
  const dispatch = useAppDispatch();
  const { restaurantData } = useAppSelector((state) => state.menuData);
  return (
    <Card
      onClick={() => {
        dispatch(setSelectedProduct(product));
      }}
      sx={{
        borderRadius: "5px",
        padding: 0,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          width="100%"
          image={product.image ? product.image : PlaceHolder}
          alt={product.name}
          sx={{objectPosition:product.image ? "top" :"center"}}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 1,
            marginTop: "0.5rem",
            color: "#A4755D",
            justifyContent: "space-between",
          }}
        >
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
