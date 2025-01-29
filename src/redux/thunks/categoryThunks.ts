/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import privateApiService from "@api/services/privateApiService";
import {
  addImage,
  deleteImage,
  getFilenameFromUrl,
} from "@api/services/imageService";

export const addCategoriesToRestaurant = createAsyncThunk(
  "restaurant/addCategories",
  async (
    {
      restaurantId,
      categoryList,
    }: { restaurantId: string; categoryList: CategoryData[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await privateApiService.post(
        `/categories/${restaurantId}/list`,
        categoryList
      );
      return { categoryList: response.data, restaurantId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Add a single category to a restaurant
export const addCategoryToRestaurant = createAsyncThunk(
  "restaurants/addCategory",
  async (
    { restaurantId, categoryData }: { restaurantId: string; categoryData: any },
    { rejectWithValue }
  ) => {
    let uploadedImageUrl: string | null = null;

    try {
      // Step 1: Add the category (excluding image upload initially)
      const response = await privateApiService.post(
        `/categories/${restaurantId}`,
        { ...categoryData, image: "" }
      );
      const newCategory = response.data;

      // Step 2: Upload the image if available
      if (categoryData.image) {
        try {
          uploadedImageUrl = await addImage(categoryData.image);
          newCategory.image = uploadedImageUrl;

          // Update the category with the uploaded image URL
          await privateApiService.put(
            `/categories/${newCategory.id}/${restaurantId}`,
            newCategory
          );
        } catch (imageError) {
          console.error("Image upload failed:", imageError);
          // Pass the category and the image error to the UI
          return { restaurantId, category: newCategory, imageError: true };
        }
      }

      // Return the new category
      return { restaurantId, category: newCategory, imageError: false };
    } catch (error) {
      //TODO: Remove after testing
      console.error("Category creation failed:", error);
      return rejectWithValue(error);
    }
  }
);

export const editCategoryInRestaurant = createAsyncThunk(
  "restaurants/editCategory",
  async (
    {
      restaurantId,
      categoryId,
      updatedCategory,
      oldCategoryImage,
    }: {
      restaurantId: string;
      categoryId: string;
      updatedCategory: any;
      oldCategoryImage: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // Step 1: Always update first
      const response = await privateApiService.put(
        `/categories/${categoryId}/${restaurantId}`,
        {
          ...updatedCategory,
          image: !updatedCategory.image ? "" : oldCategoryImage,
        }
      );
      const updatedCategoryData = response.data;

      // Step 2: Handle image deletion only if the new image is empty and old image exists
      if (!updatedCategory.image && oldCategoryImage) {
        const filename = getFilenameFromUrl(oldCategoryImage);
        if (filename) {
          await deleteImage(filename);
        }
      }

      // Step 3: If a new image is provided, upload it
      if (updatedCategory.image && updatedCategory.image !== oldCategoryImage) {
        try {
          const uploadedImageUrl = await addImage(
            updatedCategory.image as File
          );
          updatedCategoryData.image = uploadedImageUrl;

          // Step 4: Delete old image if it existed
          if (oldCategoryImage) {
            const filename = getFilenameFromUrl(oldCategoryImage);
            if (filename) {
              await deleteImage(filename);
            }
          }

          // Step 5: Update category with the new image URL
          await privateApiService.put(
            `/categories/${categoryId}/${restaurantId}`,
            updatedCategoryData
          );
        } catch (imageError) {
          console.error("Image operation failed:", imageError);
          return {
            restaurantId,
            categoryId,
            updatedCategory: response.data,
            imageError: true,
          };
        }
      }

      // Step 6: Return the updated category
      return {
        restaurantId,
        categoryId,
        updatedCategory: response.data,
        imageError: false,
      };
    } catch (error) {
      console.error("Category update failed:", error);
      return rejectWithValue("Category update failed. Please try again.");
    }
  }
);

// Remove a category from a restaurant
export const removeCategoryFromRestaurant = createAsyncThunk(
  "restaurants/removeCategory",
  async (
    {
      restaurantId,
      categoryId,
      categoryImage,
    }: { restaurantId: string; categoryId: string; categoryImage: string },
    { rejectWithValue }
  ) => {
    try {
      
      await privateApiService.delete(`/categories/${categoryId}`);
      // If the category has an image, attempt to delete it
      if (categoryImage) {
        //TODO: Remove after testing
        console.log(categoryImage);
        const filename = getFilenameFromUrl(categoryImage); // Extract the filename from the URL
        if (filename) {
          await deleteImage(filename); // Delete the image using the filename
        }
      }
      return { restaurantId, categoryId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Reorder categories for a specific restaurant
export const reorderCategoriesForRestaurant = createAsyncThunk(
  "restaurants/reorderCategories",
  async (
    {
      restaurantId,
      reorderedCategoryIds,
    }: {
      restaurantId: string;
      reorderedCategoryIds: string[];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await privateApiService.put(
        `/categories/${restaurantId}/reorder`,
        reorderedCategoryIds
      );
      return { restaurantId, reorderedCategories: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
