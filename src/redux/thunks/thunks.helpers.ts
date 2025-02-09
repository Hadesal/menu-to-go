import {
  addImage,
  deleteImage,
  getFilenameFromUrl,
  getImageFile,
} from "@api/services/imageService";
import privateApiService from "@api/services/privateApiService";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";

const removeFileReferences = (product: ProductData): ProductData => {
  const ingredients = product.details.ingredients.map((ingredient) => ({
    ...ingredient,
    image: ingredient.image instanceof File ? "" : ingredient.image,
  }));

  return {
    ...product,
    details: { ...product.details, ingredients },
    image: product.image instanceof File ? "" : product.image,
  };
};
const uploadIngredientImages = async (
  productData: ProductData,
  newProduct: ProductData
): Promise<void> => {
  for (let i = 0; i < productData.details.ingredients.length; i++) {
    const ingredient = productData.details.ingredients[i];

    if (ingredient.image) {
      try {
        if (typeof ingredient.image !== "string") {
          // If image is already a File, upload it directly
          const uploadedImageUrl = await addImage(ingredient.image as File);
          newProduct.details.ingredients[i].image = uploadedImageUrl;
        } else if (ingredient.image.trim() !== "") {
          // If image is a string (URL) and not empty, retrieve and upload
          const filename = getFilenameFromUrl(ingredient.image);
          if (filename) {
            const imageFile = await getImageFile(filename);
            const uploadedImageUrl = await addImage(imageFile);
            newProduct.details.ingredients[i].image = uploadedImageUrl;
          }
        }
      } catch (imageError) {
        console.error(
          `Ingredient image upload failed for ${ingredient.name}:`,
          imageError
        );
        throw imageError;
      }
    }
  }
};

const updateProductWithNewImageUrls = async (
  categoryId: string,
  newProduct: ProductData
): Promise<void> => {
  await privateApiService.put(
    `/categories/${categoryId}/products/${newProduct.id}`,
    newProduct
  );
};

const handleImageUpload = async (
  productData: ProductData,
  newProduct: ProductData
): Promise<void> => {
  if (productData.image instanceof File) {
    try {
      const uploadedImageUrl = await addImage(productData.image as File);
      newProduct.image = uploadedImageUrl;
    } catch (imageError) {
      console.error("Main product image upload failed:", imageError);
      throw imageError;
    }
  } else if (
    typeof productData.image === "string" &&
    productData.image !== ""
  ) {
    try {
      const filename = getFilenameFromUrl(productData.image as string);
      if (filename) {
        const imageFile = await getImageFile(filename);
        const uploadedImageUrl = await addImage(imageFile as File);
        newProduct.image = uploadedImageUrl;
      }
    } catch (imageError) {
      console.error("Main product image upload failed:", imageError);
      throw imageError;
    }
  }
};

async function deleteAllCategoryImages(categoryData: CategoryData) {
  const imagesToDelete: Promise<void>[] = [];

  // Log and delete category image
  if (categoryData?.image) {
    const filename = getFilenameFromUrl(categoryData.image as string);
    if (filename) {
      const deletePromise = deleteImage(filename).catch((err) => {
        console.error(
          `Failed to delete category image: ${categoryData.image}`,
          err
        );
      });
      imagesToDelete.push(deletePromise);
    }
  }

  // Log and delete product and ingredient images only if they exist
  categoryData?.products?.forEach((product) => {
    // Deleting product image
    if (product.image && product.image !== "") {
      const filename = getFilenameFromUrl(product.image as string);
      if (filename) {
        const deletePromise = deleteImage(filename).catch((err) => {
          console.error(
            `Failed to delete product image: ${product.image}`,
            err
          );
        });
        imagesToDelete.push(deletePromise);
      }
    }

    // Deleting ingredient images
    product.details?.ingredients?.forEach((ingredient) => {
      if (ingredient.image && ingredient.image !== "") {
        const filename = getFilenameFromUrl(ingredient.image as string);
        if (filename) {
          const deletePromise = deleteImage(filename).catch((err) => {
            console.error(
              `Failed to delete ingredient image: ${ingredient.image}`,
              err
            );
          });
          imagesToDelete.push(deletePromise);
        }
      }
    });
  });

  // Run all deletions in parallel without blocking execution
  await Promise.allSettled(imagesToDelete);
}

export {
  deleteAllCategoryImages, handleImageUpload,
  removeFileReferences,
  updateProductWithNewImageUrls,
  uploadIngredientImages
};
