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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RestaurantIcon from "../../assets/restaurant-icon.jpg";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import CategoryBoxComponent from "../../components/BoxComponent/categoryBoxComponent";
import {
  addCategory,
  deleteCategory,
  setSelectedCategory,
  clearSuccessMessage,
  clearCategoryErrorMessage,
} from "../../redux/slices/restaurantsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks"; // Adjust the import path
import styles from "./RestaurantSection.styles";

export default function CategoryPage() {
  const {
    restaurantList,
    selectedCategory,
    loading,
    successMessage,
    categoryError,
  } = useAppSelector((state) => state.restaurantsData);
  const dispatch = useAppDispatch();

  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const { t } = useTranslation();
  const getString = t;

  const [showError, setShowError] = useState<boolean>(false);
  const [showCategoryError, setShowCategoryError] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);
  useEffect(() => {
    if (categoryError) {
      setShowToast(true);
    }
  }, [categoryError]);

  useEffect(() => {
    if (successMessage) {
      setShowSuccessToast(true);
    }
  }, [successMessage]);

  useEffect(() => {
    console.log(restaurantList);
    if (restaurantList[0]?.category?.length !== 0) {
      dispatch(setSelectedCategory(restaurantList[0]?.category[0]));
    }
    setShowSuccessToast(false);
    setShowToast(false);
    dispatch(clearSuccessMessage(null)); // Ensure you have this action in your slice
    dispatch(clearCategoryErrorMessage(null)); // Ensure you have this action in your slice
  }, []);

  const handleAddCategory = (category: any) => {
    let hasError = false;

    if (category.name.length === 0) {
      setShowError(true);
      hasError = true;
    }

    if (category.categoryType.length === 0) {
      setShowCategoryError(true);
      hasError = true;
    }

    //  if (fileUpload && imageError) {
    //    hasError = true;
    //  }
    dispatch(addCategory({ restaurantId: restaurantList[0]?.id, category }));
  };

  // const handleEditRestaurant = (restaurant: RestaurantData) => {
  //   dispatch(editRestaurant({ restaurant }));
  // };

  const handleDeleteCategory = (category: { id: string }) => {
    dispatch(
      deleteCategory({
        restaurantId: restaurantList[0]?.id as string,
        categoryId: category?.id as string,
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
        onClose={() => {
          setShowToast(false);
        }}
      >
        <Alert
          onClose={() => {
            setShowToast(false);
          }}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {categoryError}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSuccessToast}
        autoHideDuration={6000}
        onClose={() => {
          console.log("clear it");
          setShowSuccessToast(false);
        }}
      >
        <Alert
          onClose={() => {
            setShowSuccessToast(false);
            console.log("clear it");
          }}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMessage}
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
        }}
      >
        <Box sx={{ flex: 1 }}>
          <CategoryBoxComponent
            CardIcon={RestaurantIcon}
            items={restaurantList[0]?.category}
            addFunction={handleAddCategory}
            editFunction={() => {}}
            deleteFunction={handleDeleteCategory}
            styles={styles}
            emptyStateTitle={"Your category list is empty."}
            emptyStateMessage={"Start by adding a new categories."}
            title="Categories"
          />
        </Box>

        <Box sx={{ flex: 2 }}>
          <BoxComponent
            CardIcon={RestaurantIcon}
            items={restaurantList[1]?.category}
            addFunction={() => {}}
            editFunction={() => {}}
            deleteFunction={() => {}}
            styles={styles}
            //emptyStateTitle={getString("noRestaurantsfoundTitle")}
            //emptyStateMessage={getString("noRestaurantsfoundMessage")}
            title={selectedCategory ? selectedCategory?.name : ""}
          />
        </Box>
      </Box>
    </Stack>
  );
}
