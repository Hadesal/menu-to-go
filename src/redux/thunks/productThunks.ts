import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductData } from "@dataTypes/ProductDataTypes";
import privateApiService from "@api/services/privateApiService";
import {
  addImage,
  deleteImage,
  getFilenameFromUrl,
} from "@api/services/imageService";
import {
  handleImageUpload,
  removeFileReferences,
  updateProductWithNewImageUrls,
  uploadIngredientImages,
} from "./thunks.helpers";

// Fetch all products by category ID
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await privateApiService.get(
        `/categories/${categoryId}/products`
      );
      return { categoryId, products: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addProductToCategory = createAsyncThunk(
  "products/addToCategory",
  async (
    {
      categoryId,
      productData,
    }: { categoryId: string; productData: ProductData },
    { rejectWithValue }
  ) => {
    try {
      let imageError = false;
      const newProduct = { ...productData };

      try {
        await handleImageUpload(productData, newProduct);
      } catch (error) {
        newProduct.image = "";
        imageError = true;
      }

      try {
        await uploadIngredientImages(productData, newProduct);
      } catch (error) {
        newProduct.details.ingredients.forEach((ingredient) => {
          ingredient.image = "";
        });
        imageError = true;
      }

      const response = await privateApiService.post(
        `/categories/${categoryId}/products`,
        newProduct
      );

      return { categoryId, product: response.data, imageError };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addProductListToCategory = createAsyncThunk(
  "products/addListToCategory",
  async (
    {
      categoryId,
      productList,
    }: {
      categoryId: string;
      productList: ProductData[];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await privateApiService.post(
        `/categories/${categoryId}/products/list`,
        productList
      );
      return { categoryId, product: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProductInCategory = createAsyncThunk(
  "products/updateInCategory",
  async (
    {
      categoryId,
      productId,
      updatedProduct,
      oldProduct,
    }: {
      categoryId: string;
      productId: string;
      updatedProduct: ProductData;
      oldProduct?: ProductData;
    },
    { rejectWithValue }
  ) => {
    try {
      //TODO: Remove after testing
      const addedImagesLog: string[] = [];
      const removedImagesLog: string[] = [];

      // Remove File references from ingredients and product image
      const productWithoutImages = removeFileReferences(updatedProduct);

      // Step 1: Update product data (without images)
      const response = await privateApiService.put(
        `/categories/${categoryId}/products/${productId}`,
        productWithoutImages
      );
      const updatedProductData = response.data;

      const imageOperations: Promise<string | void>[] = [];

      // Step 2: Handle product image changes
      if (oldProduct?.image !== updatedProduct.image) {
        if (updatedProduct.image instanceof File) {
          imageOperations.push(
            addImage(updatedProduct.image).then((uploadedImageUrl) => {
              updatedProductData.image = uploadedImageUrl;
              addedImagesLog.push(uploadedImageUrl); // Log added image
            })
          );
        }
        if (oldProduct?.image) {
          const filename = getFilenameFromUrl(oldProduct.image as string);
          if (filename) {
            imageOperations.push(deleteImage(filename));
            removedImagesLog.push(oldProduct.image as string);
          }
        }
      }

      // Step 3: Handle ingredient image changes
      updatedProduct.details.ingredients.forEach((ingredient, index) => {
        const oldIngredient = oldProduct?.details.ingredients.find(
          (oldIng) => oldIng.id === ingredient.id
        );
        const oldIngredientImage = oldIngredient?.image;

        // If the ingredient is new or its image changed, upload new image
        if (!oldIngredient || oldIngredientImage !== ingredient.image) {
          if (ingredient.image instanceof File) {
            imageOperations.push(
              addImage(ingredient.image).then((uploadedImageUrl) => {
                updatedProductData.details.ingredients[index].image =
                  uploadedImageUrl;
                addedImagesLog.push(uploadedImageUrl); // Log added image
              })
            );
          }
        }

        // If the old ingredient had an image but is now removed or changed, delete it
        if (oldIngredientImage && oldIngredientImage !== ingredient.image) {
          const filename = getFilenameFromUrl(oldIngredientImage as string);
          if (filename) {
            imageOperations.push(deleteImage(filename));
            removedImagesLog.push(oldIngredientImage as string); // Log removed image
          }
        }
      });

      // Step 4: Delete images of removed ingredients
      if (oldProduct) {
        oldProduct.details.ingredients.forEach((oldIngredient) => {
          const stillExists = updatedProduct.details.ingredients.some(
            (ing) => ing.id === oldIngredient.id
          );
          if (!stillExists && oldIngredient.image) {
            const filename = getFilenameFromUrl(oldIngredient.image as string);
            if (filename) {
              imageOperations.push(deleteImage(filename));
              removedImagesLog.push(oldIngredient.image as string); // Log removed image
            }
          }
        });
      }

      // Wait for all image operations to complete
      await Promise.allSettled(imageOperations);

      // Step 5: Final update (if image was modified)
      if (imageOperations.length > 0) {
        await privateApiService.put(
          `/categories/${categoryId}/products/${updatedProductData.id}`,
          updatedProductData
        );
      }

      //TODO: Remove after testing

      // Log added and removed images
      console.log("Added Images:", addedImagesLog);
      console.log("Removed Images:", removedImagesLog);

      return {
        categoryId,
        productId,
        updatedProduct: updatedProductData,
        imageError: false,
        logs: {
          addedImages: addedImagesLog,
          removedImages: removedImagesLog,
        },
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeProductFromCategory = createAsyncThunk(
  "products/removeFromCategory",
  async (
    {
      categoryId,
      productId,
      productImage,
      ingredientImages,
    }: {
      categoryId: string;
      productId: string[];
      productImage: string[];
      ingredientImages: string[];
    },
    { rejectWithValue }
  ) => {
    try {
      // Step 1: Delete product from category
      await privateApiService.delete(`/categories/${categoryId}/products`, {
        data: productId,
      });

      // Step 2: Only start deleting images if the API request was successful
      if (productImage?.length) {
        console.log("Starting background image deletion:", productImage);

        const deletePromises = productImage
          .map(getFilenameFromUrl)
          .filter((filename): filename is string => Boolean(filename))
          .map(deleteImage);

        // Run in background (no await, so function does not wait)
        Promise.all(deletePromises).catch((error) =>
          console.error("Image deletion failed:", error)
        );
      }
      if (ingredientImages?.length) {
        console.log("Starting background image deletion:", ingredientImages);

        const deletePromises = ingredientImages
          .map(getFilenameFromUrl)
          .filter((filename): filename is string => Boolean(filename))
          .map(deleteImage);

        // Run in background (no await, so function does not wait)
        Promise.all(deletePromises).catch((error) =>
          console.error("Image deletion failed:", error)
        );
      }

      // Step 3: Return immediately without waiting for image deletion
      return { categoryId, productId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Reorder categories for a specific restaurant
export const reorderProductsForRestaurant = createAsyncThunk(
  "restaurants/reorderProducts",
  async (
    {
      categoryId,
      reorderedProductIds: reorderedCategoryIds,
    }: {
      categoryId: string;
      reorderedProductIds: string[];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await privateApiService.put(
        `/categories/${categoryId}/products/reorder`,
        reorderedCategoryIds
      );
      return { categoryId, reorderedProducts: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Move products to another category
export const moveProductsToCategory = createAsyncThunk(
  "products/moveToCategory",
  async (
    {
      sourceCategoryId,
      targetCategoryId,
      productIds,
    }: {
      sourceCategoryId: string;
      targetCategoryId: string;
      productIds: string[];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await privateApiService.put(
        `/categories/${sourceCategoryId}/products/move`, // Ensure sourceCategoryId is part of the URL
        {
          productIds, // Send productIds in the request body
          targetCategoryId, // Send targetCategoryId in the request body
        }
      );
      return {
        sourceCategoryId,
        targetCategoryId,
        productIds,
        movedProducts: response.data.moved, // List of products that were successfully moved
        notMovedProductNames: response.data.notMoved, // List of product names that couldn't be moved
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Copy products to another category
export const copyProductsToCategory = createAsyncThunk(
  "products/copyToCategory",
  async (
    {
      sourceCategoryId,
      targetCategoryId,
      productIds,
    }: {
      sourceCategoryId: string;
      targetCategoryId: string;
      productIds: string[];
    },
    { rejectWithValue }
  ) => {
    try {
      // Call the API to copy the products
      const response = await privateApiService.post(
        `/categories/${sourceCategoryId}/products/copy`,
        {
          productIds,
          targetCategoryId,
        }
      );

      return {
        sourceCategoryId,
        targetCategoryId,
        productIds,
        copiedProducts: response.data.copied || [], // Products that were successfully copied
        notCopiedProductNames: response.data.notCopied || [], // Product names that couldn't be copied
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
