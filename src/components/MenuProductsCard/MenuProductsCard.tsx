import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PlaceHolder from "../../assets/catering-item-placeholder-704x520.png";
import { setSelectedProduct } from "../../redux/slices/menuSlice";
import { useAppDispatch } from "../../utils/hooks";

export default function MenuProductsCard({ product }) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  return (
    <Card
      onClick={() => {
        dispatch(setSelectedProduct(product));
        navigate("/product");
      }}
      sx={{ width: "170px", height: "200px", borderRadius: "16px" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
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
            sx={{ fontSize: "14px", fontWeight: 400 }}
            gutterBottom
            component="div"
          >
            {product.name}
          </Typography>
          <Typography
            sx={{ fontSize: "14px", fontWeight: 500 }}
            component="div"
          >
            {product.price}$
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
