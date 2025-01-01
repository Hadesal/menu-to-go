import RestaurantIcon from "@assets/restaurant-icon.jpg";
import BoxComponent from "@components/common/BoxComponent/BoxComponent";
import ToastNotification from "@components/common/ToastNotification/ToastNotification.tsx";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import {
  Backdrop,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks.ts";
import {
  addRestaurant,
  editRestaurant,
  removeRestaurant,
} from "@redux/thunks/restaurantThunks.ts";
import {
  clearRestaurantError,
  clearSuccessMessage,
  setSelectedRestaurant,
} from "@slices/restaurantsSlice.ts";
import { useEffect, useState } from "react";
import CategoryPage from "../CategoryPage/CategoryPage";
import styles from "./RestaurantSection.styles";
import { useLanguage } from "src/hooks/useLanguage";

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

  const { getString } = useLanguage();

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
    dispatch(setSelectedRestaurant({} as RestaurantData));
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
    ).catch((error) => {
      console.log(error);
    });
  };

  const handleDeleteRestaurant = (restaurantid: string) => {
    if (restaurantList.length > 1) {
      dispatch(removeRestaurant(restaurantid));
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

      <Typography variant="h5">
        {label}
      </Typography>
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
        category={false}
      />
    </Stack>
  );
};

export default RestaurantSection;
