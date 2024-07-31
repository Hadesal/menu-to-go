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
  updateCategory,
} from "../../redux/slices/restaurantsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks"; // Adjust the import path
import styles from "./RestaurantSection.styles";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";

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

  const [showError, setShowNameError] = useState<boolean>(false);
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
    if (restaurantList[0]?.category?.length !== 0) {
      dispatch(setSelectedCategory(restaurantList[0]?.category[0]));
    }
    setShowSuccessToast(false);
    setShowToast(false);
    dispatch(clearSuccessMessage(null));
    dispatch(clearCategoryErrorMessage(null));
  }, []);

  const handleAddCategory = (category: CategoryData) => {
    dispatch(
      addCategory({ restaurantId: restaurantList[0]?.id as string, category })
    );
  };

  const handleEditCategory = (category: CategoryData) => {
    dispatch(
      updateCategory({
        restaurantId: restaurantList[0]?.id,
        categoryId: selectedCategory.id,
        category,
      })
    );
  };

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
        <Button sx={styles.previewMenu} variant="contained">
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
            editFunction={handleEditCategory}
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
            items={restaurantList[0]?.category[0]?.product}
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
