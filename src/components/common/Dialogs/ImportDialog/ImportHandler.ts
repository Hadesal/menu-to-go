import { CategoryData } from "@dataTypes/CategoryDataTypes";
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
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json<CategoryData>(worksheet);

      try {
        console.log(json);
        const categories = parseJsonObject(json);
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
