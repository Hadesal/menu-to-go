import React, { useState } from "react";
import {
  Box,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import VegtableEggImg from "../../assets/vegtableegg.jpg";
import SmoothieBowlImg from "../../assets/smoothiebowl.jpg";
import PlaceHolder from "../../assets/catering-item-placeholder-704x520.png";

const products = [
  {
    id: "vegtableEgg",
    label: "Vegtable Egg",
    img: VegtableEggImg,
  },
  {
    id: "smoothieBowl",
    label: "Smoothie Bowl",
    img: SmoothieBowlImg,
  },
];

export default function MenuProductsCard({ product }) {
  return (
    <Card sx={{flex:1, height: "200px", borderRadius: "16px" }}>
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
