import {
  Backdrop,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import BoxComponent from "@components/BoxComponent/BoxComponent";
import styles from "./RestaurantSection.styles";
import { useEffect, useState } from "react";
import RestaurantIcon from "@assets/restaurant-icon.jpg";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import {
  clearRestaurantError,
  clearSuccessMessage,
  setSelectedRestaurant,
} from "@slices/restaurantsSlice.ts";
import {
  addRestaurant,
  editRestaurant,
  removeRestaurant,
} from "@redux/thunks/restaurantThunks.ts";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks.ts";
import { useTranslation } from "react-i18next";
import CategoryPage from "../CategoryPage/CategoryPage";
import ToastNotification from "@components/ToastNotification/ToastNotification.tsx";

interface RestaurantSectionProps {
  label: string;
}

const RestaurantSection = ({ label }: RestaurantSectionProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    restaurantList,
    restaurantLoading: loading,
    error,
    selectedRestaurant,
    successMessage,
  } = useAppSelector((state) => state.restaurantsData);
  const [errorMessage, setErrorMessage] = useState(error);
  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const { t } = useTranslation();
  const getString = t;

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setShowToast(true);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      setShowSuccessToast(true);
    }
  }, [successMessage]);

  useEffect(() => {
    // Check if selectedRestaurant exists before accessing its properties
    if (!selectedRestaurant || Object.keys(selectedRestaurant).length === 0) {
      setShowSuccessToast(false);
      setShowToast(false);
      dispatch(clearRestaurantError());
      dispatch(clearSuccessMessage());
    }
  }, [selectedRestaurant, dispatch]);

  useEffect(() => {
    dispatch(setSelectedRestaurant(null));
  }, [dispatch]);

  const handleAddRestaurant = (restaurant: RestaurantData) => {
    dispatch(addRestaurant(restaurant));
  };

  const handleEditRestaurant = (restaurant: RestaurantData) => {
    dispatch(
      editRestaurant({
        restaurantId: restaurant.id as string,
        updatedRestaurant: restaurant,
      })
    );
  };

  const handleDeleteRestaurant = (restaurant: RestaurantData) => {
    if (restaurantList.length > 1) {
      dispatch(removeRestaurant(restaurant.id as string));
    } else if (restaurantList.length < 2) {
      setErrorMessage(getString("errorDeleteRestaurant"));
      setShowToast(true);
    }
  };

  if (selectedRestaurant && Object.keys(selectedRestaurant).length !== 0) {
    return <CategoryPage />;
  }

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

      <ToastNotification
        message={errorMessage}
        severity="error"
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <ToastNotification
        message={successMessage}
        severity="success"
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />

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
        product={false}
      />
    </Stack>
  );
};

export default RestaurantSection;
