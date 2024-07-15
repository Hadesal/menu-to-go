// src/pages/SplashScreen/SplashScreen.js
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllRestaurants } from "../../redux/slices/restaurantsSlice";
import { getUserData } from "../../services/api/userCrud";
import { useAppDispatch, useAppSelector } from "../../utils/hooks"; // Adjust the import path
import { fetchUserData } from "../../redux/slices/userSlice";
import Lottie from "lottie-react";
import animationData from "../../assets/Animation - 1721077487203.json"; // Ensure you have the correct path to the animation JSON file

export default function SplashScreen() {
  //   const navigate = useNavigate();
  //   const dispatch = useAppDispatch();
  //   const { loading: restaurantsLoading, error: restaurantsError } =
  //     useAppSelector((state) => state.restaurantsData);
  //   const { loading: userLoading, error: userError } = useAppSelector(
  //     (state) => state.userData
  //   );

  //   const fetchData = async () => {
  //     const userToken = JSON.parse(localStorage.getItem("userToken") as string);
  //     await dispatch(fetchUserData());
  //     const user = await getUserData(userToken.token);
  //     await dispatch(fetchAllRestaurants({ userID: user.id }));
  //     navigate("/dashboard");
  //   };
  //   useEffect(() => {
  //     fetchData();
  //   }, [dispatch, navigate]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Lottie
        animationData={animationData}
        style={{ width: 200, height: 200 }}
      />

      {/* {userError && (
        <Typography variant="body2" color="error">
          {userError}
        </Typography>
      )}
      {restaurantsError && (
        <Typography variant="body2" color="error">
          {restaurantsError}
        </Typography>
      )} */}
    </Stack>
  );
}
