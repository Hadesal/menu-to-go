import RestaurantIcon from "@assets/restaurant-icon.jpg";
import BoxComponent from "@components/common/BoxComponent/BoxComponent";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import ImportDialog from "@components/common/Dialogs/ImportDialog/ImportDialog";
import { InfoDialog } from "@components/common/Dialogs/Info Dialog/InfoDialog";
import PreviewMenu from "@components/PreviewMenu/PreviewMenu";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import {
  addCategoryToRestaurant as addCategory,
  removeCategoryFromRestaurant as deleteCategory,
  editCategoryInRestaurant as updateCategory,
} from "@redux/thunks/categoryThunks";
import {
  addProductToCategory as addProduct,
  removeProductFromCategory as deleteProduct,
  updateProductInCategory as editProduct,
} from "@redux/thunks/productThunks";
import {
  clearRestaurantError,
  clearSuccessMessage,
  setSelectedCategory,
  setSelectedProductsIDs,
  setSelectedRestaurant,
} from "@slices/restaurantsSlice";
import { itemType } from "@utils/dataTypeCheck";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Styles from "./CategorySection.styles";

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
    productActionErrorMessage,
    importingLoading,
  } = useAppSelector((state) => state.restaurantsData);
  const { error: productError, productLoading } = useAppSelector(
    (state) => state.restaurantsData
  );
  const dispatch = useAppDispatch();
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [openPreviewMenu, setOpenPreviewMenu] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const { t } = useTranslation();
  const getString = t;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    if (productActionErrorMessage) {
      setIsInfoDialogOpen(true);
    }
  }, [productActionErrorMessage]);

  //TODO: We need a proper way of managing the toast clearing
  useEffect(() => {
    return () => {
      // Clear success and error messages on unmount
      dispatch(clearSuccessMessage());
      dispatch(clearRestaurantError());
    };
  }, [dispatch]);

  const handleImportDialogClose = () => {
    setOpenImportDialog(false);
  };
  const handleAddCategory = (category: itemType) => {
    if (selectedRestaurant?.id) {
      dispatch(
        addCategory({
          restaurantId: selectedRestaurant.id,
          categoryData: category as CategoryData,
        })
      );
    }
  };
  const handleEditCategory = (category: CategoryData) => {
    if (selectedRestaurant?.id && selectedCategory?.id) {
      dispatch(
        updateCategory({
          restaurantId: selectedRestaurant.id,
          categoryId: selectedCategory.id,
          updatedCategory: category as CategoryData,
          oldCategoryImage: selectedCategory.image
            ? (selectedCategory.image as string)
            : "",
        })
      );
    } else {
      console.error("No restaurant or category selected");
    }
  };
  const handleDeleteCategory = (id: string, itemData?: CategoryData) => {
    if (selectedRestaurant?.id) {
      dispatch(
        deleteCategory({
          restaurantId: selectedRestaurant.id,
          categoryId: id,
          categoryData: itemData as CategoryData,
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

  const handleEditProduct = (product: ProductData) => {
    if (!selectedCategory?.id || !product?.id) {
      console.error("No category or product selected");
      return;
    }

    const oldProductData = selectedCategory.products?.find(
      (updated_product: ProductData) => updated_product.id === product.id
    );

    dispatch(
      editProduct({
        categoryId: selectedCategory.id,
        productId: product.id,
        updatedProduct: product,
        oldProduct: oldProductData,
      })
    );
  };

  const handleDeleteProduct = (
    id: string,
    productImage?: string[] | string,
    ingredientImages?: string[]
  ) => {
    if (selectedCategory?.id) {
      dispatch(
        deleteProduct({
          categoryId: selectedCategory.id,
          productId: [id],
          productImage: productImage ? (productImage as string[]) : [],
          ingredientImages: ingredientImages
            ? (ingredientImages as string[])
            : [],
        })
      );
    } else {
      console.error("No category selected");
    }
  };

  return (
    <>
      <ImportDialog
        handleClose={handleImportDialogClose}
        isOpen={openImportDialog}
        title={getString("importFileMessage")}
      />
      {productActionErrorMessage && (
        <InfoDialog
          isDialogOpen={isInfoDialogOpen}
          setIsDialogOpen={setIsInfoDialogOpen}
          message={productActionErrorMessage}
        />
      )}

      <PreviewMenu
        openPreviewMenu={openPreviewMenu}
        setOpenPreviewMenu={setOpenPreviewMenu}
      />
      <Stack spacing={3} sx={Styles.stack}>
        <Backdrop
          sx={{
            color: "var(--primary-color)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={
            restaurantLoading ||
            productLoading ||
            categoryLoading ||
            importingLoading
          }
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CircularProgress color="inherit" />
            {importingLoading ? (
              <Typography sx={{ color: "white", fontWeight: 500 }}>
                Importing in progress...
              </Typography>
            ) : (
              ""
            )}
          </Box>
        </Backdrop>
        {/* Error Snackbar */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={showToast}
          autoHideDuration={6000}
          onClose={(e) => {
            e.stopPropagation();
            setShowToast(false);
            dispatch(clearRestaurantError());
          }}
        >
          <Alert
            onClose={(e) => {
              e.stopPropagation();
              setShowToast(false);
              dispatch(clearRestaurantError());
            }}
            severity="error"
            variant="filled"
            sx={{
              width: "100%",
              marginTop: showSuccessToast ? "3.5rem" : "0",
            }}
          >
            {categoryError || productError}
          </Alert>
        </Snackbar>

        {/* Success Snackbar */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={showSuccessToast}
          autoHideDuration={6000}
          onClose={() => {
            setShowSuccessToast(false);
          }}
        >
          <Alert
            onClose={(e) => {
              e.stopPropagation();
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
            gap: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              flex: 1,
              minWidth: 0, // Prevents expansion beyond parent
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
                dispatch(setSelectedRestaurant({} as RestaurantData));
                dispatch(setSelectedCategory(null));
                dispatch(setSelectedProductsIDs([]));
              }}
            >
              <KeyboardBackspaceIcon fontSize="large" color="primary" />
            </IconButton>
            <Tooltip arrow title={selectedRestaurant?.name}>
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                variant="h5"
              >
                {selectedRestaurant?.name}
              </Typography>
            </Tooltip>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexShrink: 0, // Ensures button doesn't shrink
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{ ...Styles.importBtn, display: { xs: "none", sm: "block" } }}
              variant="outlined"
              onClick={() => {
                setOpenImportDialog(true);
              }}
            >
              {getString("categoryPageImportLabel")}
            </Button>
            <Button
              sx={{
                ...Styles.previewMenu,
                display: { xs: "none", sm: "block" },
              }}
              variant="contained"
              onClick={() => {
                setOpenPreviewMenu(true);
              }}
            >
              {getString("categoryPagePreviewMenuText")}
            </Button>

            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                ...Styles.previewMenu,
                display: { xs: "flex", sm: "none" },
              }}
              variant="contained"
              endIcon={<ExpandMoreIcon />}
            >
              Options
            </Button>
            <Menu
              id="bulk-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  setOpenImportDialog(true);
                }}
              >
                {getString("categoryPageImportLabel")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOpenPreviewMenu(true);
                }}
              >
                {getString("categoryPagePreviewMenuText")}
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 5,
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              flex: 1,
              minWidth: 0, // Prevents expansion beyond parent
            }}
          >
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

          <Box
            sx={{
              flex: 2,
              minWidth: 0, // Prevents expansion beyond parent
            }}
          >
            <BoxComponent
              CardIcon={RestaurantIcon}
              items={selectedCategory?.products ?? []}
              addFunction={handleAddProduct}
              editFunction={handleEditProduct}
              deleteFunction={handleDeleteProduct}
              duplicateFunction={handleAddProduct}
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
