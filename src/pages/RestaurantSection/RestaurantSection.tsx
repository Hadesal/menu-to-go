import {
  Alert,
  Backdrop,
  CircularProgress,
  Divider,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import styles from "./RestaurantSection.styles";
import { useEffect, useState } from "react";
import RestaurantIcon from "../../assets/restaurant-icon.jpg";
import { RestaurantData } from "../../DataTypes/RestaurantObject";
import {
  addRestaurant,
  deleteRestaurant,
  editRestaurant,
} from "../../redux/slices/restaurantsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { useTranslation } from "react-i18next";
interface RestaurantSectionProps {
  label: string;
}

const RestaurantSection = ({ label }: RestaurantSectionProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { restaurantList, loading, error } = useAppSelector(
    (state) => state.restaurantsData
  );
  const [errorMessage, setErrorMessage] = useState(error);
  const [showToast, setShowToast] = useState(false);
  const { t } = useTranslation();
  const getString = t;

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
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
    if (restaurantList.length > 1) {
      dispatch(
        deleteRestaurant({
          restaurantId: restaurant.id as string,
        })
      );
    } else if (restaurantList.length < 2) {
      setErrorMessage(getString("errorDeleteRestaurant"));
      setShowToast(true);
    }
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
          {errorMessage}
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
        emptyStateTitle={getString("noRestaurantsfoundTitle")}
        emptyStateMessage={getString("noRestaurantsfoundMessage")}
      />
    </Stack>
  );
};

export default RestaurantSection;
