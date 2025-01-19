// src/pages/SplashScreen/SplashScreen.js
import { Stack } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "../../assets/Animation - 1721077487203.json"; // Ensure you have the correct path to the animation JSON file

export default function SplashScreen() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%", backgroundColor: "#f5f5f5" }}
    >
      <Lottie
        animationData={animationData}
        style={{ width: 200, height: 200 }}
      />
    </Stack>
  );
}
