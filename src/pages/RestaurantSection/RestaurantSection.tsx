import {
  Alert,
  Backdrop,
  CircularProgress,
  Divider,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./RestaurantSection.styles";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
// import RestaurantIcon from "@mui/icons-material/Restaurant";
import RestaurantIcon from "../../assets/restaurant-icon.jpg";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks"; // Adjust the import path
import {
  addRestaurant,
  deleteRestaurant,
  editRestaurant,
  setRestaurantList,
} from "../../redux/slices/restaurantsSlice";
import { getAllRestaurantsByUserId } from "../../services/api/restaurantCrud";
import { getUserData } from "../../services/api/userCrud";
import { RestaurantData } from "../../DataTypes/RestaurantObject";

interface RestaurantSectionProps {
  label: string;
}

const RestaurantSection = ({ label }: RestaurantSectionProps): JSX.Element => {
  const userToken = localStorage.getItem("userToken");
  const dispatch = useAppDispatch();
  const { restaurantList, loading, error } = useAppSelector(
    (state) => state.restaurantsData
  );

  const [showToast, setShowToast] = useState(false);

  const retriveUserAndRestaurantsdata = async () => {
    const user = await getUserData(userToken);
    const restaurantData = await getAllRestaurantsByUserId(
      user.id,
      userToken as string
    );
    dispatch(setRestaurantList(restaurantData));
  };

  useEffect(() => {
    //retriveUserAndRestaurantsdata();
  }, []);

  useEffect(() => {
    if (error) {
      setShowToast(true);
    }
  }, [error]);

  const handleAddRestaurant = (restaurant: RestaurantData) => {
    dispatch(addRestaurant({ restaurant, token: userToken as string }));
  };

  const handleEditRestaurant = (restaurant: RestaurantData) => {
    dispatch(editRestaurant({ restaurant, token: userToken as string }));
  };

  const handleDeleteRestaurant = (restaurant: RestaurantData) => {
    dispatch(
      deleteRestaurant({
        restaurantId: restaurant.id,
        token: userToken as string,
      })
    );
  };

  return (
    <Stack spacing={3} sx={styles.stack}>
      <Backdrop
        sx={{
          color: "var(--primary-color)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showToast}
        autoHideDuration={6000}
        onClose={() => setShowToast(false)}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Typography variant="h5">{label}</Typography>
      <Divider />
      <BoxComponent
        CardIcon={RestaurantIcon}
        items={restaurantList}
        addFunction={handleAddRestaurant}
        editFunction={handleEditRestaurant}
        deleteFunction={handleDeleteRestaurant}
        styles={styles}
      />
    </Stack>
  );
};

export default RestaurantSection;
