// categoryPageService.ts
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { useAppDispatch } from "@redux/reduxHooks";
import {
  addCategoryToRestaurant as addCategory,
  removeCategoryFromRestaurant as deleteCategory,
  editCategoryInRestaurant as updateCategory,
  addCategoriesToRestaurant as addCategories,
} from "@redux/thunks/categoryThunks";
import {
  addProductToCategory as addProduct,
  updateProductInCategory as editProduct,
  removeProductFromCategory as deleteProduct,
} from "@redux/thunks/productThunks";
import {
  setSelectedRestaurant,
  setSelectedCategory,
} from "@slices/restaurantsSlice";

// Hook to handle category and product operations
export function useCategoryPageService() {
  const dispatch = useAppDispatch();

  // Handle adding a single category
  const handleAddCategory = (restaurantId: string, category: CategoryData) => {
    dispatch(
      addCategory({
        restaurantId,
        categoryData: category,
      })
    );
  };

  // Handle adding multiple categories
  const handleAddCategories = (
    restaurantId: string,
    categories: CategoryData[]
  ) => {
    dispatch(
      addCategories({
        restaurantId,
        categoriesData: categories,
      })
    );
  };

  // Handle editing a category
  const handleEditCategory = (
    restaurantId: string,
    categoryId: string,
    updatedCategory: CategoryData
  ) => {
    dispatch(
      updateCategory({
        restaurantId,
        categoryId,
        updatedCategory,
      })
    );
  };

  // Handle deleting a category
  const handleDeleteCategory = async (
    restaurantId: string,
    categoryId: string
  ) => {
    await dispatch(
      deleteCategory({
        restaurantId,
        categoryId,
      })
    );
  };

  // Handle adding a product to a category
  const handleAddProduct = (categoryId: string, product: ProductData) => {
    dispatch(
      addProduct({
        categoryId,
        productData: product,
      })
    );
  };

  // Handle editing a product in a category
  const handleEditProduct = (
    categoryId: string,
    productId: string,
    updatedProduct: ProductData
  ) => {
    dispatch(
      editProduct({
        categoryId,
        productId,
        updatedProduct,
      })
    );
  };

  // Handle deleting a product from a category
  const handleDeleteProduct = (categoryId: string, productId: string) => {
    dispatch(
      deleteProduct({
        categoryId,
        productId: [productId],
      })
    );
  };

  const handleDuplicateProduct = (categoryId: string, product: ProductData) => {
    dispatch(
      addProduct({
        categoryId: categoryId,
        productData: product,
      })
    );
  };

  // Handle resetting selection (for back button)
  const handleResetSelection = () => {
    dispatch(setSelectedRestaurant(null));
    dispatch(setSelectedCategory(null));
  };

  return {
    handleAddCategory,
    handleAddCategories,
    handleDuplicateProduct,
    handleEditCategory,
    handleDeleteCategory,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleResetSelection,
  };
}
