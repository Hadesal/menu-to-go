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
  fetchAllRestaurants,
} from "../../redux/slices/restaurantsSlice";
import { getUserData } from "../../services/api/userCrud";
import { RestaurantData } from "../../DataTypes/RestaurantObject";

interface RestaurantSectionProps {
  label: string;
}

const RestaurantSection = ({ label }: RestaurantSectionProps): JSX.Element => {
  const userToken = JSON.parse(localStorage.getItem("userToken") as string);
  const dispatch = useAppDispatch();
  const { restaurantList, loading, error } = useAppSelector(
    (state) => state.restaurantsData
  );

  const [showToast, setShowToast] = useState(false);

  const retriveUserAndRestaurantsdata = async () => {
    const user = await getUserData(userToken.token);
    console.log(user);
    dispatch(fetchAllRestaurants({ userID: user.id }));
  };

  useEffect(() => {
    retriveUserAndRestaurantsdata();
  }, []);

  useEffect(() => {
    if (error) {
      setShowToast(true);
    }
  }, [error]);

  const handleAddRestaurant = (restaurant: RestaurantData) => {
    dispatch(addRestaurant({ restaurant }));
  };

  const handleEditRestaurant = (restaurant: RestaurantData) => {
    dispatch(editRestaurant({ restaurant }));
  };

  const handleDeleteRestaurant = (restaurant: RestaurantData) => {
    dispatch(
      deleteRestaurant({
        restaurantId: restaurant.id as string,
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
        emptyText={"No Restaurants found"}
      />
    </Stack>
  );
};

export default RestaurantSection;
