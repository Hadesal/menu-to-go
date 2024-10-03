import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@redux/reduxHooks";
import { setActiveTab, setErrorMessage } from "@slices/mainViewSlice";
import {
  clearSuccessMessage,
  clearRestaurantError,
  setSelectedRestaurant,
} from "@slices/restaurantsSlice";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
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
import { useCategoryPageService } from "./categoryPageService";
import RestaurantIcon from "@assets/restaurant-icon.jpg";
import CategoryBoxComponent from "@components/BoxComponent/categoryBoxComponent";
import BoxComponent from "@components/BoxComponent/BoxComponent";
import Styles from "./CategorySection.styles";
import { useTranslation } from "react-i18next";
import { ProductData } from "@dataTypes/ProductDataTypes";

export default function CategoryPage() {
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const {
    selectedRestaurant,
    restaurantLoading,
    selectedCategory,
    successMessage,
    categoryLoading,
    error: categoryError,
  } = useAppSelector((state) => state.restaurantsData);

  const { productLoading, error: productError } = useAppSelector(
    (state) => state.restaurantsData
  );

  const {
    handleAddCategory,
    handleAddCategories,
    handleEditCategory,
    handleDeleteCategory,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleResetSelection,
    handleDuplicateProduct,
  } = useCategoryPageService();

  // Manage toast visibility
  useEffect(() => {
    if (categoryError || productError) {
      setShowToast(true);
    }
  }, [categoryError, productError]);

  useEffect(() => {
    if (successMessage) {
      setShowSuccessToast(true);
    }
  }, [successMessage]);

  useEffect(() => {
    return () => {
      dispatch(clearSuccessMessage());
      dispatch(clearRestaurantError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!selectedRestaurant && !restaurantLoading) {
      dispatch(setSelectedRestaurant(null));
      dispatch(setActiveTab("dashboard"));
      dispatch(setErrorMessage("Restaurant data could not be loaded in time."));
      navigate("/dashboard");
    }
  }, [dispatch, navigate, selectedRestaurant, restaurantLoading]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!selectedRestaurant) {
        dispatch(setActiveTab("dashboard"));
        dispatch(
          setErrorMessage("Failed to load restaurant data within 30 seconds.")
        );
        navigate("/dashboard");
      }
    }, 30000);

    return () => clearTimeout(timeout); // Cleanup the timer
  }, [dispatch, navigate, selectedRestaurant]);

  const handleCloseErrorToast = () => {
    setShowToast(false);
    setShowSuccessToast(false);
  };

  return (
    <Stack spacing={3} sx={Styles.stack}>
      <Backdrop
        sx={{
          color: "var(--primary-color)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={restaurantLoading || productLoading || categoryLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Error Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showToast}
        autoHideDuration={6000}
        onClose={handleCloseErrorToast}
      >
        <Alert
          onClose={handleCloseErrorToast}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {categoryError || productError}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSuccessToast}
        autoHideDuration={6000}
        onClose={() => setShowSuccessToast(false)}
      >
        <Alert
          onClose={() => setShowSuccessToast(false)}
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
              "&:hover": { background: "#A4755D30" },
            }}
            aria-label="back"
            onClick={handleResetSelection}
          >
            <KeyboardBackspaceIcon fontSize="large" color="primary" />
          </IconButton>
          <Typography variant="h5">{selectedRestaurant?.name}</Typography>
        </Box>
        <Button sx={Styles.previewMenu} variant="contained">
          {getString("categoryPagePreviewMenuText")}
        </Button>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <Box sx={{ flex: 1 }}>
          {/* <BoxComponent
            CardIcon={RestaurantIcon}
            items={selectedRestaurant?.categories}
            addFunction={(category) => {
              if (selectedRestaurant?.id) {
                handleAddCategory(selectedRestaurant.id, category);
              } else {
                console.error("Selected restaurant is not defined");
              }
            }}
            editFunction={(category) => {
              if (selectedRestaurant?.id && selectedCategory?.id) {
                handleEditCategory(
                  selectedRestaurant.id,
                  selectedCategory.id,
                  category
                );
              } else {
                console.error("No restaurant or category selected");
              }
            }}
            deleteFunction={(category) => {
              if (selectedRestaurant?.id) {
                handleDeleteCategory(selectedRestaurant.id, category.id);
              } else {
                console.error("No restaurant selected");
              }
            }}
            styles={Styles}
            emptyStateTitle={getString("categoryEmptyStateTitle")}
            emptyStateMessage={getString("categoryEmptyStateInfo")}
            title={getString("categories")}
            listView={true}
            product={false}
          /> */}
          <CategoryBoxComponent
            CardIcon={RestaurantIcon}
            items={selectedRestaurant?.categories ?? []}
            addFunction={(category) => {
              if (selectedRestaurant?.id) {
                handleAddCategory(selectedRestaurant.id, category);
              } else {
                console.error("Selected restaurant is not defined");
              }
            }}
            editFunction={(category) => {
              if (selectedRestaurant?.id && selectedCategory?.id) {
                handleEditCategory(
                  selectedRestaurant.id,
                  selectedCategory.id,
                  category
                );
              } else {
                console.error("No restaurant or category selected");
              }
            }}
            deleteFunction={(category) => {
              if (selectedRestaurant?.id) {
                handleDeleteCategory(selectedRestaurant.id, category.id);
              } else {
                console.error("No restaurant selected");
              }
            }}
            styles={Styles}
            emptyStateTitle={getString("categoryEmptyStateTitle")}
            emptyStateMessage={getString("categoryEmptyStateInfo")}
            title={getString("categories")}
          />
        </Box>

        <Box sx={{ flex: 2 }}>
          <BoxComponent
            CardIcon={RestaurantIcon}
            items={selectedCategory?.products}
            addFunction={(product: ProductData) =>
              handleAddProduct(selectedCategory!.id!, product)
            }
            editFunction={(product: ProductData) =>
              handleEditProduct(selectedCategory!.id!, product.id!, product)
            }
            deleteFunction={(product: { id: string }) =>
              handleDeleteProduct(selectedCategory!.id!, product.id!)
            }
            duplicateFunction={(product: ProductData) =>
              handleDuplicateProduct(selectedCategory!.id!, product)
            }
            styles={Styles}
            emptyStateTitle={getString("productEmptyStateTitle")}
            emptyStateMessage={getString("productEmptyStateInfo")}
            title={selectedCategory ? selectedCategory?.name : ""}
            listView={true}
            product={true}
          />
        </Box>
      </Box>
    </Stack>
  );
}
