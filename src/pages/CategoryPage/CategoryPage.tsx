import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RestaurantIcon from "@assets/restaurant-icon.jpg";
import BoxComponent from "@components/common/BoxComponent/BoxComponent";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import {
  clearSuccessMessage,
  setSelectedRestaurant,
  clearRestaurantError,
  setSelectedCategory,
  setSelectedProductsIDs,
} from "@slices/restaurantsSlice";
import {
  addProductToCategory as addProduct,
  updateProductInCategory as editProduct,
  removeProductFromCategory as deleteProduct,
} from "@redux/thunks/productThunks";
import {
  addCategoryToRestaurant as addCategory,
  removeCategoryFromRestaurant as deleteCategory,
  editCategoryInRestaurant as updateCategory,
} from "@redux/thunks/categoryThunks";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import Styles from "./CategorySection.styles";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { itemType } from "@utils/dataTypeCheck";

export default function CategoryPage() {
  const {
    selectedRestaurant,
    restaurantLoading,
    // error: restaurantError,
  } = useAppSelector((state) => state.restaurantsData);
  const {
    selectedCategory,
    successMessage,
    categoryLoading,
    error: categoryError,
  } = useAppSelector((state) => state.restaurantsData);
  const { error: productError, productLoading } = useAppSelector(
    (state) => state.restaurantsData
  );
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const { t } = useTranslation();
  const getString = t;

  useEffect(() => {
    if (categoryError || productError) {
      setShowToast(true);
    }
  }, [categoryError, productError]);

  useEffect(() => {
    setShowSuccessToast(false);
    setShowToast(false);
    dispatch(clearSuccessMessage());
    dispatch(clearRestaurantError());
  }, []);

  useEffect(() => {
    if (successMessage) {
      setShowSuccessToast(true);
    }
  }, [successMessage, selectedRestaurant]);

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
      // Clear success and error messages on unmount
      dispatch(clearSuccessMessage());
      dispatch(clearRestaurantError());
    };
  }, [dispatch]);
  const handleAddCategory = (category: itemType) => {
    if (selectedRestaurant?.id) {
      dispatch(
        addCategory({
          restaurantId: selectedRestaurant.id,
          categoryData: category,
        })
      );
    }
  };
  const handleEditCategory = (category: itemType) => {
    if (selectedRestaurant?.id && selectedCategory?.id) {
      dispatch(
        updateCategory({
          restaurantId: selectedRestaurant.id,
          categoryId: selectedCategory.id,
          updatedCategory: category as CategoryData,
        })
      );
    } else {
      console.error("No restaurant or category selected");
    }
  };
  const handleDeleteCategory = (id: string) => {
    if (selectedRestaurant?.id) {
      dispatch(
        deleteCategory({
          restaurantId: selectedRestaurant.id,
          categoryId: id,
        })
      );
    } else {
      console.error("No restaurant selected");
    }
  };

  const handleAddProduct = (product: ProductData) => {
    if (selectedCategory?.id) {
      dispatch(
        addProduct({
          categoryId: selectedCategory.id,
          productData: product,
        })
      );
    } else {
      console.error("No category selected");
    }
  };
  const handleDuplicateProduct = (product: ProductData) => {
    dispatch(
      addProduct({
        categoryId: selectedCategory!.id as string,
        productData: product,
      })
    );
  };
  const handleEditProduct = (product: ProductData) => {
    if (selectedCategory?.id && product?.id) {
      dispatch(
        editProduct({
          categoryId: selectedCategory.id,
          productId: product.id,
          updatedProduct: product,
        })
      );
    } else {
      console.error("No category or product selected");
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (selectedCategory?.id) {
      dispatch(
        deleteProduct({
          categoryId: selectedCategory.id,
          productId: [id],
        })
      );
    } else {
      console.error("No category selected");
    }
  };

  const handleCloseErrorToast = () => {
    setShowToast(false);
    setShowSuccessToast(false);
  };

  return (
    <>
      <Drawer anchor="right" open={open}></Drawer>
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
                "&:hover": {
                  background: "#A4755D30",
                },
              }}
              aria-label="back"
              onClick={() => {
                dispatch(setSelectedRestaurant(null));
                dispatch(setSelectedCategory(null));
                dispatch(setSelectedProductsIDs([]));
              }}
            >
              <KeyboardBackspaceIcon fontSize="large" color="primary" />
            </IconButton>
            <Typography variant="h5">{selectedRestaurant?.name}</Typography>
          </Box>
          <Box>
            <Button sx={Styles.importBtn} variant="outlined">
              {getString("import")}
            </Button>
            <Button sx={Styles.previewMenu} variant="contained">
              {getString("categoryPagePreviewMenuText")}
            </Button>
          </Box>
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
            <BoxComponent
              CardIcon={RestaurantIcon}
              items={selectedRestaurant?.categories ?? []}
              addFunction={handleAddCategory}
              editFunction={handleEditCategory}
              deleteFunction={handleDeleteCategory}
              styles={Styles}
              emptyStateTitle={getString("categoryEmptyStateTitle")}
              emptyStateMessage={getString("categoryEmptyStateInfo")}
              title={getString("categories")}
              listView={true}
              category={true}
              product={false}
            />
          </Box>

          <Box sx={{ flex: 2 }}>
            <BoxComponent
              CardIcon={RestaurantIcon}
              items={selectedCategory?.products ?? []}
              addFunction={handleAddProduct}
              editFunction={handleEditProduct}
              deleteFunction={handleDeleteProduct}
              duplicateFunction={handleDuplicateProduct}
              styles={Styles}
              emptyStateTitle={getString("productEmptyStateTitle")}
              emptyStateMessage={getString("productEmptyStateInfo")}
              title={selectedCategory ? selectedCategory?.name : ""}
              listView={true}
              product={true}
              category={false}
            />
          </Box>
        </Box>
      </Stack>
    </>
  );
}
