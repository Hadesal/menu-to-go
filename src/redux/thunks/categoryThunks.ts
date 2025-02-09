import {
  addImage,
  deleteImage,
  getFilenameFromUrl,
} from "@api/services/imageService";
import privateApiService from "@api/services/privateApiService";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAllCategoryImages } from "./thunks.helpers";

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

export const addCategoryToRestaurant = createAsyncThunk(
  "restaurants/addCategory",
  async (
    {
      restaurantId,
      categoryData,
    }: { restaurantId: string; categoryData: CategoryData },
    { rejectWithValue }
  ) => {
    let uploadedImageUrl: string | null = null;

    try {
      // Step 1: Upload the image if available
      if (categoryData.image) {
        try {
          uploadedImageUrl = await addImage(categoryData.image as File);
          console.log("Uploaded Image URL:", uploadedImageUrl);
          categoryData.image = uploadedImageUrl;
        } catch (imageError) {
          console.error("Image upload failed:", imageError);
          categoryData.image = ""; // Set image to an empty string if upload fails
        }
      }

      // Step 2: Add the category
      const response = await privateApiService.post(
        `/categories/${restaurantId}`,
        categoryData
      );

      const addedCategory = response.data;

      // Step 3: Return the new category and imageError status
      return {
        restaurantId,
        category: addedCategory,
        imageError: !uploadedImageUrl,
      };
    } catch (error) {
      if (uploadedImageUrl) {
        // Clean up the uploaded image if category creation fails
        console.log("Cleaning up uploaded image:", uploadedImageUrl);
        const filename = getFilenameFromUrl(uploadedImageUrl);
        if (filename) {
          await deleteImage(filename); // Clean up the uploaded image if category creation fails
        }
      }
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
      updatedCategory: CategoryData;
      oldCategoryImage: string;
    },
    { rejectWithValue }
  ) => {
    let uploadedImageUrl: string = "";
    let imageError_flag: boolean = false;
    let imageDeleted = false; // Track if image deletion is needed

    try {
      // Step 1: If a new image is provided and is different from the old one, upload it
      if (updatedCategory.image instanceof File) {
        try {
          uploadedImageUrl = await addImage(updatedCategory.image as File);
          console.log("Uploaded Image URL:", uploadedImageUrl);
          updatedCategory.image = uploadedImageUrl;
        } catch (imageError) {
          imageError_flag = true;
          console.error("Image upload failed:", imageError);
          // If image upload fails, set the image to "" and proceed with the update
          updatedCategory.image = "";
        }
      }

      // Step 2: Update the category (whether or not the image was uploaded or removed)
      const response = await privateApiService.put(
        `/categories/${categoryId}/${restaurantId}`,
        updatedCategory
      );
      const updatedCategoryData = response.data;

      // Step 3: If image was uploaded successfully and the category update is successful,
      // check if the old image should be deleted
      if (
        response.status === 200 &&
        uploadedImageUrl &&
        oldCategoryImage &&
        uploadedImageUrl !== oldCategoryImage
      ) {
        console.log(
          "Deleting old image if new image is uploaded:",
          oldCategoryImage
        );
        const filename = getFilenameFromUrl(oldCategoryImage);
        if (filename) {
          // Image deletion should happen only after both image upload and category update
          await deleteImage(filename);
          imageDeleted = true;
        }
      }

      // Step 4: Handle image removal in case the new image is empty (but the category update was successful)
      if (
        response.status === 200 && //if update successful
        !updatedCategory.image && // the image was removed
        oldCategoryImage // and there is an old image
      ) {
        console.log(
          "Deleting old image if new image is empty:",
          oldCategoryImage
        );
        const filename = getFilenameFromUrl(oldCategoryImage);
        if (filename) {
          // Run the image deletion in the background only after the category update
          await deleteImage(filename);
        }
      }

      // Step 5: Return the updated category
      return {
        restaurantId,
        categoryId,
        updatedCategory: updatedCategoryData,
        imageError: imageError_flag, // Indicate if image upload failed
      };
    } catch (error) {
      // Clean up the uploaded image if the category update fails after upload
      if (uploadedImageUrl) {
        const filename = getFilenameFromUrl(uploadedImageUrl);
        if (filename) {
          await deleteImage(filename);
        }
      }

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
      categoryData,
    }: {
      restaurantId: string;
      categoryId: string;
      categoryData: CategoryData;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await privateApiService.delete(
        `/categories/${categoryId}`
      );

      // Only proceed with image deletion if the category was deleted successfully
      if (response.status === 204) {
        // Start image deletion in the background (non-blocking)
        deleteAllCategoryImages(categoryData).catch((err) =>
          console.error("Failed to delete category images:", err)
        );
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
