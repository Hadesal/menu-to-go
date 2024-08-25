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

export default function MenuProductsCard() {
  return (
    <Card sx={{ width: "145px", height: "200px", borderRadius: "16px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={VegtableEggImg}
          alt="Vegtable Egg"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: 1,
            marginTop: "0.5rem",
            justifyContent: "space-between",
            color: "#A4755D",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", lineHeight: "12px", fontWeight: 400 }}
            gutterBottom
            component="div"
          >
            Vegetable Egg
          </Typography>
          <Typography
            sx={{ fontSize: "14px", lineHeight: "12px", fontWeight: 500 }}
            component="div"
          >
            50$
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
