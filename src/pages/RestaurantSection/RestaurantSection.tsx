import {
  Backdrop,
  CircularProgress,
  Divider,
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
  clearErrorMessage,
  clearSuccessMessage,
  deleteRestaurant,
  editRestaurant,
  setSelectedRestaurant,
} from "../../redux/slices/restaurantsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { useTranslation } from "react-i18next";
import CategoryPage from "../CategoryPage/CategoryPage";
import ToastNotification from "../../components/ToastNotification/ToastNotification.tsx";

interface RestaurantSectionProps {
  label: string;
}

const RestaurantSection = ({ label }: RestaurantSectionProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { restaurantList, loading, error, selectedRestaurant, successMessage } =
    useAppSelector((state) => state.restaurantsData);
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
    console.log(selectedRestaurant);
    if (!selectedRestaurant || Object.keys(selectedRestaurant).length === 0) {
      setShowSuccessToast(false);
      setShowToast(false);
      dispatch(clearErrorMessage(null));
      dispatch(clearSuccessMessage(null));
    }
  }, [selectedRestaurant, dispatch]);

  useEffect(() => {
    dispatch(setSelectedRestaurant({}));
  }, []);

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

  if (Object.keys(selectedRestaurant).length !== 0) {
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
      />
    </Stack>
  );
};

export default RestaurantSection;
