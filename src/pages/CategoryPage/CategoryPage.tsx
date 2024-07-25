import {
  Alert,
  Backdrop,
  Box,
  Button,
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
import { useAppDispatch, useAppSelector } from "../../utils/hooks"; // Adjust the import path
import { useTranslation } from "react-i18next";

export default function CategoryPage() {
  //const dispatch = useAppDispatch();

  const { restaurantList, loading, error } = useAppSelector(
    (state) => state.restaurantsData
  );

  const [showToast, setShowToast] = useState(false);
  const { t } = useTranslation();
  const getString = t;

  useEffect(() => {
    if (error) {
      setShowToast(true);
    }
  }, [error]);

  // const handleAddRestaurant = (restaurant: RestaurantData) => {
  //   dispatch(addRestaurant({ restaurant }));
  // };

  // const handleEditRestaurant = (restaurant: RestaurantData) => {
  //   dispatch(editRestaurant({ restaurant }));
  // };

  // const handleDeleteRestaurant = (restaurant: RestaurantData) => {
  //   dispatch(
  //     deleteRestaurant({
  //       restaurantId: restaurant.id as string,
  //     })
  //   );
  // };

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">{getString("categoryPageTitle")}</Typography>
        <Button
          sx={styles.previewMenu}
          variant="contained"
          //color="primary"
          //onClick={handleClickOpen}
        >
          {getString("categoryPagePreviewMenuText")}
        </Button>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          //justifyContent: "space-between",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <BoxComponent
            CardIcon={RestaurantIcon}
            items={restaurantList}
            addFunction={() => {}}
            editFunction={() => {}}
            deleteFunction={() => {}}
            styles={styles}
            emptyStateTitle={getString("noRestaurantsfoundTitle")}
            emptyStateMessage={getString("noRestaurantsfoundMessage")}
            title="Category name"
          />
        </Box>

        <Box sx={{ flex: 2 }}>
          <BoxComponent
            CardIcon={RestaurantIcon}
            items={restaurantList}
            addFunction={() => {}}
            editFunction={() => {}}
            deleteFunction={() => {}}
            styles={styles}
            emptyStateTitle={getString("noRestaurantsfoundTitle")}
            emptyStateMessage={getString("noRestaurantsfoundMessage")}
            title="Category name"
          />
        </Box>
      </Box>
    </Stack>
  );
}
