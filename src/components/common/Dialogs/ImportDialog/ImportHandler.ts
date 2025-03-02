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
                    image: ingredientRow["Image"] || "",
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
                  allergies: productDetailsRow
                    ? typeof productDetailsRow["Allergies"] === "string"
                      ? productDetailsRow["Allergies"]
                          .split(",")
                          .map((item: string) => item.trim()) // Split and trim each item
                          .filter((item: string) => item !== "") // Remove empty strings
                      : productDetailsRow["Allergies"] || []
                    : [],
                  labels: productDetailsRow
                    ? typeof productDetailsRow["Labels"] === "string"
                      ? productDetailsRow["Labels"]
                          .split(",")
                          .map((item: string) => item.trim()) // Split and trim each item
                          .filter((item: string) => item !== "") // Remove empty strings
                      : productDetailsRow["Labels"] || []
                    : [],
                  dietaryOptionLabel: productDetailsRow
                    ? productDetailsRow["Dietary Options"] || ""
                    : "",
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
                  isSoldOut:
                    productRow["Is Sold Out"].toString().toLowerCase() ===
                    "true",
                  image: productRow["Image"] || "",
                };

                return product;
              }
            );

            const category: CategoryData = {
              name: categoryName,
              image: categoryRow["Image"] || "",
              categoryType: categoryRow["Category Type"].toLowerCase(),
              products,
            };
            return category;
          }
        );

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

export const exportSampleExcel = () => {
  const sampleCategories: CategoryData[] = [
    {
      name: "Beverages",
      categoryType: "Drinks",
      image: "beverages.png",
      products: [
        {
          name: "Coffee",
          price: 2.5,
          isAvailable: true,
          isSoldOut: false,
          image: "",
          details: {
            detailsDescription:
              "A hot beverage made from roasted coffee beans.",
            allergies: [],
            labels: [],
            dietaryOptionLabel: "vegan",
            variants: {
              name: "Size",
              variantList: [
                { name: "Small", price: 2.0 },
                { name: "Medium", price: 2.5 },
                { name: "Large", price: 3.0 },
              ],
            },
            ingredients: [
              { name: "Water", image: "" },
              { name: "Coffee Beans", image: "" },
            ],
            extras: [
              { name: "Milk", price: 0.5 },
              { name: "Sugar", price: 0.2 },
            ],
          },
        },
      ],
      categoryOrder: 1,
    },
    {
      name: "Desserts",
      categoryType: "Food",
      image: "desserts.png",
      products: [
        {
          name: "Chocolate Cake",
          price: 5.0,
          isAvailable: true,
          isSoldOut: false,
          image: "",
          details: {
            detailsDescription: "Delicious chocolate layered cake.",
            allergies: [],
            labels: [],
            dietaryOptionLabel: "vegetarian",
            variants: {
              name: "",
              variantList: [],
            },
            ingredients: [
              { name: "Chocolate", image: "" },
              { name: "Flour", image: "" },
            ],
            extras: [],
          },
        },
      ],
      categoryOrder: 2,
    },
  ];

  // Call the converter with sample data
  categoriesToExcelExporter(sampleCategories);
};

/**
 * Converts an array of CategoryData into an Excel file and triggers a download.
 * @param categories - Array of CategoryData objects to export.
 */
export const categoriesToExcelExporter = (categories: CategoryData[]): void => {
  // Define interfaces for sheet rows
  interface CategoriesSheetRow {
    Name: string;
    "Category Type": string;
    Image: string;
    "Category Order": number | string;
  }

  interface ProductsSheetRow {
    Name: string;
    Category: string;
    Price: number;
    "Is Available": boolean;
    "Is Sold Out": boolean;
    Image: string;
    "Unique Product Ordering Name": string;
  }

  interface ProductDetailsSheetRow {
    "Product Name": string;
    "Details Description": string;
    Allergies: string;
    Labels: string;
    "Dietary Options": string;
  }

  interface IngredientsSheetRow {
    "Product Name": string;
    "Ingredient Name": string;
    Price: number;
    Image: string;
  }

  interface ExtrasSheetRow {
    "Product Name": string;
    "Extra Name": string;
    Price: number;
  }

  interface VariantsSheetRow {
    "Product Name": string;
    "Variant Group Name": string;
    "Variant Name": string;
    Price: number;
  }

  // Initialize arrays to hold sheet data
  const categoriesData: CategoriesSheetRow[] = [];
  const productsData: ProductsSheetRow[] = [];
  const productDetailsData: ProductDetailsSheetRow[] = [];
  const ingredientsData: IngredientsSheetRow[] = [];
  const extrasData: ExtrasSheetRow[] = [];
  const variantsData: VariantsSheetRow[] = [];

  categories.forEach((category) => {
    // Populate Categories Sheet
    categoriesData.push({
      Name: category.name,
      "Category Type": category.categoryType,
      Image: category.image as string,
      "Category Order": category.categoryOrder ?? "",
    });

    // Populate Products and related sheets
    category.products?.forEach((product) => {
      console.log(product.isSoldOut);
      // Products Sheet
      productsData.push({
        Name: product.name,
        Category: category.name,
        Price: product.price,
        "Is Available": product.isAvailable,
        "Is Sold Out": product.isSoldOut,
        Image: (product.image as string) || "",
        "Unique Product Ordering Name": product.id ?? "",
      });
      const allergies =
        product.details.allergies?.map((a) => a || "").join(", ") ?? "";
      const labels =
        product.details.labels?.map((l) => l || "").join(", ") ?? "";

      const dietaryOptions = product.details.dietaryOptionLabel || "";

      productDetailsData.push({
        "Product Name": product.name,
        "Details Description": product.details.detailsDescription,
        Allergies: allergies,
        Labels: labels,
        "Dietary Options": dietaryOptions,
      });

      // Ingredients Sheet
      product.details.ingredients.forEach((ingredient) => {
        ingredientsData.push({
          "Product Name": product.name,
          "Ingredient Name": ingredient.name,
          Price: 0, // Assuming price is not part of IngredientData, set to 0 or handle accordingly
          Image: ingredient.image as string,
        });
      });

      // Extras Sheet
      product.details.extras.forEach((extra) => {
        extrasData.push({
          "Product Name": product.name,
          "Extra Name": extra.name,
          Price: extra.price,
        });
      });

      // Variants Sheet
      product.details.variants.variantList.forEach((variant) => {
        variantsData.push({
          "Product Name": product.name,
          "Variant Group Name": product.details.variants.name,
          "Variant Name": variant.name,
          Price: variant.price,
        });
      });
    });
  });

  // Convert arrays to sheets
  const categoriesSheet = XLSX.utils.json_to_sheet(categoriesData);
  const productsSheet = XLSX.utils.json_to_sheet(productsData);
  const productDetailsSheet = XLSX.utils.json_to_sheet(productDetailsData);
  const ingredientsSheet = XLSX.utils.json_to_sheet(ingredientsData);
  const extrasSheet = XLSX.utils.json_to_sheet(extrasData);
  const variantsSheet = XLSX.utils.json_to_sheet(variantsData);

  // Create a new workbook and append sheets
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, categoriesSheet, "Categories");
  XLSX.utils.book_append_sheet(workbook, productsSheet, "Products");
  XLSX.utils.book_append_sheet(
    workbook,
    productDetailsSheet,
    "Product Details"
  );
  XLSX.utils.book_append_sheet(workbook, ingredientsSheet, "Ingredients");
  XLSX.utils.book_append_sheet(workbook, extrasSheet, "Extras");
  XLSX.utils.book_append_sheet(workbook, variantsSheet, "Variants");

  // Generate Excel file and trigger download
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "categories_export.xlsx";
  anchor.click();

  // Clean up
  URL.revokeObjectURL(url);
};
