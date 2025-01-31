import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductData } from "@dataTypes/ProductDataTypes";
import privateApiService from "@api/services/privateApiService";
import {
  addImage,
  deleteImage,
  getFilenameFromUrl,
} from "@api/services/imageService";

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
    let uploadedImageUrl: string | null = null;

    try {
      // Step 1: Prepare the productData by setting images of ingredients to an empty string
      const ingredients = productData.details.ingredients.map((ingredient) => ({
        ...ingredient,
        image: typeof ingredient.image === "string" ? ingredient.image : "", // Clear image if it is a File
      }));

      // Create the new product object with cleared ingredient images
      const productWithoutImages = {
        ...productData,
        details: {
          ...productData.details,
          ingredients,
        },
        image: typeof productData.image === "string" ? productData.image : "", // Clear main product image if it's a File
      };

      // Step 2: Send the product data to the backend without the images
      const response = await privateApiService.post(
        `/categories/${categoryId}/products`,
        productWithoutImages
      );

      const newProduct = response.data;

      // Step 3: Handle image upload for the main product image if it's a file (not already a URL)
      if (productData.image instanceof File) {
        try {
          uploadedImageUrl = await addImage(productData.image as File);
          newProduct.image = uploadedImageUrl; // Update main product image URL
        } catch (imageError) {
          console.error("Main product image upload failed:", imageError);
          // Return the product even if the image upload fails for the main image
        }
      }

      // Step 4: Handle image upload for each ingredient if it's a file (not already a URL)
      for (let i = 0; i < productData.details.ingredients.length; i++) {
        const ingredient = productData.details.ingredients[i];
        if (ingredient.image && typeof ingredient.image !== "string") {
          try {
            // Upload the image for the ingredient
            uploadedImageUrl = await addImage(ingredient.image as File);

            // Update the ingredient image in the new product object
            newProduct.details.ingredients[i].image = uploadedImageUrl;
          } catch (imageError) {
            console.error(
              `Ingredient image upload failed for ${ingredient.name}:`,
              imageError
            );
          }
        }
      }

      // Step 5: After uploading all images, update the product with the new image URLs
      await privateApiService.put(
        `/categories/${categoryId}/products/${newProduct.id}`,
        newProduct
      );

      return { categoryId, product: newProduct, imageError: false };
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
      oldImage,
    }: {
      categoryId: string;
      productId: string;
      updatedProduct: ProductData;
      oldImage?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // Prepare the updated product data by clearing ingredient images if they are Files
      const ingredients = updatedProduct.details.ingredients.map(
        (ingredient) => ({
          ...ingredient,
          image: ingredient.image instanceof File ? "" : ingredient.image,
        })
      );

      const productWithoutImages = {
        ...updatedProduct,
        details: { ...updatedProduct.details, ingredients },
        image: updatedProduct.image instanceof File ? "" : updatedProduct.image,
      };

      // Step 1: Update product data in backend (excluding images)
      const response = await privateApiService.put(
        `/categories/${categoryId}/products/${productId}`,
        productWithoutImages
      );
      const updatedProductData = response.data;

      // Step 2: Handle image update only if new image differs from old one
      if (oldImage !== updatedProduct.image) {
        // Upload new image if it's a File
        if (updatedProduct.image instanceof File) {
          try {
            const uploadedImageUrl = await addImage(updatedProduct.image);
            updatedProductData.image = uploadedImageUrl;
          } catch (imageError) {
            return {
              categoryId,
              productId,
              updatedProduct: updatedProductData,
              imageError: true,
            };
          }
        }
        // Delete old image if it exists and a new one is set
        if (oldImage) {
          try {
            const filename = getFilenameFromUrl(oldImage);
            if (filename) await deleteImage(filename);
          } catch (deleteError) {
            console.error("Failed to delete old image:", deleteError);
          }
        }
      }

      // Step 3: Upload ingredient images if they are Files
      await Promise.all(
        updatedProduct.details.ingredients.map(async (ingredient, index) => {
          if (ingredient.image instanceof File) {
            try {
              const uploadedImageUrl = await addImage(ingredient.image);
              updatedProductData.details.ingredients[index].image =
                uploadedImageUrl;
            } catch (imageError) {
              console.error(
                `Ingredient image upload failed for ${ingredient.name}:`,
                imageError
              );
            }
          }
        })
      );

      // Step 4: Send the final update with images if needed
      await privateApiService.put(
        `/categories/${categoryId}/products/${updatedProductData.id}`,
        updatedProductData
      );

      return {
        categoryId,
        productId,
        updatedProduct: updatedProductData,
        imageError: false,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Remove a product from a specific category
export const removeProductFromCategory = createAsyncThunk(
  "products/removeFromCategory",
  async (
    {
      categoryId,
      productId,
      productImage,
    }: { categoryId: string; productId: string[]; productImage: string[] },
    { rejectWithValue }
  ) => {
    try {
      await privateApiService.delete(`/categories/${categoryId}/products`, {
        data: productId,
      });

      if (productImage) {
        console.log(productImage);
        for (const image of productImage) {
          const filename = getFilenameFromUrl(image);
          if (filename) {
            await deleteImage(filename);
          }
        }
      }
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
