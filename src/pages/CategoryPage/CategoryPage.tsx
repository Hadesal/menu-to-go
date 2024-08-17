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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RestaurantIcon from "../../assets/restaurant-icon.jpg";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import CategoryBoxComponent from "../../components/BoxComponent/categoryBoxComponent";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";
import {
  clearSuccessMessage,
  setSelectedRestaurant,
  clearErrorMessage,
} from "../../redux/slices/restaurantsSlice";
import {
  createProduct as addProduct,
  modifyProduct as editProduct,
  removeProduct as deleteProduct,
} from "../../redux/slices/productSlice";
import {
  addCategory,
  deleteCategory,
  setSelectedCategory,
  updateCategory,
} from "../../redux/slices/categorySlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import Styles from "./CategorySection.styles";
import { ProductData } from "../../DataTypes/ProductDataTypes";

export default function CategoryPage() {
  const { selectedRestaurant, loading } = useAppSelector(
    (state) => state.restaurantsData
  );
  const { selectedCategory, successMessage, error } = useAppSelector(
    (state) => state.categoriesData
  );
  const dispatch = useAppDispatch();

  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const { t } = useTranslation();
  const getString = t;

  useEffect(() => {
    if (error) {
      setShowToast(true);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      setShowSuccessToast(true);
    }
  }, [successMessage, selectedRestaurant]);

  useEffect(() => {
    setShowSuccessToast(false);
    setShowToast(false);
    dispatch(clearSuccessMessage(null));
    dispatch(clearErrorMessage(null));
  }, []);

  const handleAddCategory = (category: CategoryData) => {
    dispatch(addCategory({ restaurantId: selectedRestaurant?.id, category }));
  };

  const handleEditCategory = (category: CategoryData) => {
    dispatch(
      updateCategory({
        restaurantId: selectedRestaurant?.id,
        categoryId: selectedCategory?.id,
        category,
      })
    );
  };

  const handleDeleteCategory = (category: { id: string }) => {
    dispatch(
      deleteCategory({
        restaurantId: selectedRestaurant?.id,
        categoryId: category.id,
      })
    );
  };

  const handleAddProduct = (product: ProductData) => {
    dispatch(
      addProduct({
        categoryId: selectedCategory?.id,
        product: product,
      })
    );
  };
  const handleEditProduct = (product: ProductData) => {
    dispatch(
      editProduct({
        categoryId: selectedCategory?.id,
        productId: product.id as string,
        updatedProduct: product,
      })
    );
  };
  const handleDeleteProduct = (product: { id: string }) => {
    dispatch(
      deleteProduct({
        categoryId: selectedCategory?.id,
        productId: product.id,
      })
    );
  };

  return (
    <Stack spacing={3} sx={Styles.stack}>
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
          {error}
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
          <Typography variant="h5">{selectedRestaurant?.name}</Typography>
        </Box>
        <Button sx={Styles.previewMenu} variant="contained">
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
            items={selectedRestaurant.categories}
            addFunction={handleAddCategory}
            editFunction={handleEditCategory}
            deleteFunction={handleDeleteCategory}
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
            addFunction={handleAddProduct}
            editFunction={handleEditProduct}
            deleteFunction={handleDeleteProduct}
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
