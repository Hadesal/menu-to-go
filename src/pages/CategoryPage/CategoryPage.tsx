import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RestaurantIcon from "../../assets/restaurant-icon.jpg";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import CategoryBoxComponent from "../../components/BoxComponent/categoryBoxComponent";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  addCategory,
  deleteCategory,
  setSelectedCategory,
  clearSuccessMessage,
  clearCategoryErrorMessage,
  updateCategory,
  setSelectedRestaurant,
} from "../../redux/slices/restaurantsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks"; // Adjust the import path
import styles from "./RestaurantSection.styles";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";

export default function CategoryPage() {
  const {
    selectedRestaurant,
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
    setShowSuccessToast(false);
    setShowToast(false);
    dispatch(clearSuccessMessage(null));
    dispatch(clearCategoryErrorMessage(null));
  }, []);

  const handleAddCategory = (category: CategoryData) => {
    dispatch(
      addCategory({ restaurantId: selectedRestaurant?.id as string, category })
    );
  };

  const handleEditCategory = (category: CategoryData) => {
    dispatch(
      updateCategory({
        restaurantId: selectedRestaurant?.id,
        categoryId: selectedCategory.id,
        category,
      })
    );
  };

  const handleDeleteCategory = (category: { id: string }) => {
    dispatch(
      deleteCategory({
        restaurantId: selectedRestaurant?.id as string,
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
        {/* <Typography variant="h5">{getString("categoryPageTitle")}</Typography> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton
            sx={{
              background: "#A4755D30",
              "&:hover": {
                background: "#A4755D30",
              },
            }}
            aria-label="back"
            onClick={() => {
              dispatch(setSelectedRestaurant({}));
              dispatch(setSelectedCategory({}));
            }}
          >
            <KeyboardBackspaceIcon fontSize="large" color="primary" />
          </IconButton>
          {/* {getString("categoryPagePreviewMenuText")} */}
          <Typography variant="h5">{selectedRestaurant.name}</Typography>
        </Box>
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
            items={selectedRestaurant?.category}
            addFunction={handleAddCategory}
            editFunction={handleEditCategory}
            deleteFunction={handleDeleteCategory}
            styles={styles}
            emptyStateTitle={getString("categoryEmptyStateTitle")}
            emptyStateMessage={getString("categoryEmptyStateInfo")}
            title={getString("categories")}
          />
        </Box>

        <Box sx={{ flex: 2 }}>
          <BoxComponent
            CardIcon={RestaurantIcon}
            items={selectedCategory.products}
            addFunction={() => {}}
            editFunction={() => {}}
            deleteFunction={() => {}}
            styles={styles}
            emptyStateTitle={getString("productEmptyStateTitle")}
            emptyStateMessage={getString("productEmptyStateInfo")}
            title={selectedCategory ? selectedCategory?.name : ""}
            listView={true}
          />
        </Box>
      </Box>
    </Stack>
  );
}
