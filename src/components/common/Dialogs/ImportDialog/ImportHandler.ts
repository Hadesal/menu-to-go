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
                  allergies: productDetailsRow
                    ? productDetailsRow["Allergies"] || []
                    : [],
                  labels: productDetailsRow
                    ? productDetailsRow["Labels"] || []
                    : [],
                  dietaryOptions: productDetailsRow
                    ? productDetailsRow["Dietary Options"] || []
                    : [],
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

export const exportSampleExcel = () => {
  const categoriesData = [
    {
      Name: "Beverages",
      "Category Type": "Drink",
    },
    {
      Name: "Desserts",
      "Category Type": "Food",
    },
  ];

  const productsData = [
    {
      Name: "Coffee",
      Category: "Beverages",
      Price: 2.5,
      "Is Available": "true",
      "Unique Product Ordering Name": "coffee-001",
    },
    {
      Name: "Chocolate Cake",
      Category: "Desserts",
      Price: 5.0,
      "Is Available": "true",
      "Unique Product Ordering Name": "cake-001",
    },
  ];

  const productDetailsData = [
    {
      "Product Name": "Coffee",
      "Details Description": "A hot beverage made from roasted coffee beans.",
    },
    {
      "Product Name": "Chocolate Cake",
      "Details Description": "Delicious chocolate layered cake.",
    },
  ];

  const ingredientsData = [
    {
      "Product Name": "Coffee",
      "Ingredient Name": "Water",
      Price: 0,
    },
    {
      "Product Name": "Coffee",
      "Ingredient Name": "Coffee Beans",
      Price: 0,
    },
    {
      "Product Name": "Chocolate Cake",
      "Ingredient Name": "Chocolate",
      Price: 0,
    },
    {
      "Product Name": "Chocolate Cake",
      "Ingredient Name": "Flour",
      Price: 0,
    },
  ];

  const extrasData = [
    {
      "Product Name": "Coffee",
      "Extra Name": "Milk",
      Price: 0.5,
    },
    {
      "Product Name": "Coffee",
      "Extra Name": "Sugar",
      Price: 0.2,
    },
  ];

  const variantsData = [
    {
      "Product Name": "Coffee",
      "Variant Group Name": "Size",
      "Variant Name": "Small",
      Price: 2.0,
    },
    {
      "Product Name": "Coffee",
      "Variant Group Name": "Size",
      "Variant Name": "Medium",
      Price: 2.5,
    },
    {
      "Product Name": "Coffee",
      "Variant Group Name": "Size",
      "Variant Name": "Large",
      Price: 3.0,
    },
  ];

  const categoriesSheet = XLSX.utils.json_to_sheet(categoriesData);
  const productsSheet = XLSX.utils.json_to_sheet(productsData);
  const productDetailsSheet = XLSX.utils.json_to_sheet(productDetailsData);
  const ingredientsSheet = XLSX.utils.json_to_sheet(ingredientsData);
  const extrasSheet = XLSX.utils.json_to_sheet(extrasData);
  const variantsSheet = XLSX.utils.json_to_sheet(variantsData);

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

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "sample_menu_template.xlsx";
  anchor.click();

  URL.revokeObjectURL(url);
};
