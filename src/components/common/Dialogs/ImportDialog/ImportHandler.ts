/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import {
  ExtrasData,
  IngredientData,
  ProductData,
  ProductDetailsData,
  VariantsData,
} from "@dataTypes/ProductDataTypes";
import * as XLSX from "xlsx";

export const parseJsonObject = (categories: CategoryData[]): CategoryData[] => {
  if (!Array.isArray(categories)) {
    throw new Error("Invalid JSON: Expected an array of categories");
  }

  categories.forEach((category) => {
    if (!Object.prototype.hasOwnProperty.call(category, "categoryType")) {
      throw new Error("Invalid JSON: Missing 'categoryType' property");
    }
  });
  return categories;
};

export const parseExcelFile = (file: File): Promise<CategoryData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        console.log(workbook);

        const categoriesSheet = XLSX.utils.sheet_to_json<any>(
          workbook.Sheets["Categories"]
        );
        const productsSheet = XLSX.utils.sheet_to_json<any>(
          workbook.Sheets["Products"]
        );
        const productDetailsSheet = XLSX.utils.sheet_to_json<any>(
          workbook.Sheets["Product Details"]
        );
        const ingredientsSheet = XLSX.utils.sheet_to_json<any>(
          workbook.Sheets["Ingredients"]
        );
        const extrasSheet = XLSX.utils.sheet_to_json<any>(
          workbook.Sheets["Extras"]
        );
        const variantsSheet = XLSX.utils.sheet_to_json<any>(
          workbook.Sheets["Variants"]
        );

        const categories: CategoryData[] = categoriesSheet.map(
          (categoryRow: any) => {
            const categoryName = categoryRow["Name"];
            const categoryProducts = productsSheet.filter(
              (productRow: any) => productRow["Category"] === categoryName
            );

            const products: ProductData[] = categoryProducts.map(
              (productRow: any) => {
                const productName = productRow["Name"];

                const productDetailsRow = productDetailsSheet.find(
                  (detailsRow: any) =>
                    detailsRow["Product Name"] === productName
                );

                const ingredientsRows = ingredientsSheet.filter(
                  (ingredientRow: any) =>
                    ingredientRow["Product Name"] === productName
                );
                const ingredients: IngredientData[] = ingredientsRows.map(
                  (ingredientRow: any) => ({
                    name: ingredientRow["Ingredient Name"],
                    price: parseFloat(ingredientRow["Price"]),
                    image: ingredientRow["Image"] || null,
                  })
                );

                const extrasRows = extrasSheet.filter(
                  (extraRow: any) => extraRow["Product Name"] === productName
                );
                const extras: ExtrasData[] = extrasRows.map(
                  (extraRow: any) => ({
                    name: extraRow["Extra Name"],
                    price: parseFloat(extraRow["Price"]),
                  })
                );

                const variantRows = variantsSheet.filter(
                  (variantRow: any) =>
                    variantRow["Product Name"] === productName
                );
                const variants: VariantsData = {
                  name:
                    variantRows.length > 0
                      ? variantRows[0]["Variant Group Name"]
                      : "",
                  variantList: variantRows.map((variantRow: any) => ({
                    name: variantRow["Variant Name"],
                    price: parseFloat(variantRow["Price"]),
                  })),
                };

                const productDetails: ProductDetailsData = {
                  detailsDescription: productDetailsRow
                    ? productDetailsRow["Details Description"]
                    : "",
                  extras,
                  ingredients,
                  variants,
                };

                const product: ProductData = {
                  name: productName,
                  price: parseFloat(productRow["Price"]),
                  details: productDetails,
                  isAvailable:
                    productRow["Is Available"].toString().toLowerCase() ===
                    "true",
                  image: productRow["Image"] || null,
                  uniqueProductOrderingName:
                    productRow["Unique Product Ordering Name"],
                };

                return product;
              }
            );

            const category: CategoryData = {
              name: categoryName,
              image: categoryRow["Image"] || null,
              categoryType: categoryRow["Category Type"],
              products,
            };
            return category;
          }
        );
        console.log(categories);

        resolve(categories);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
};
