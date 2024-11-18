/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const validateCategoryData = (data: any): data is CategoryData[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (category) =>
        typeof category.name === "string" &&
        (typeof category.image === "string" || category.image === null) &&
        typeof category.categoryType === "string" &&
        (!category.products ||
          (Array.isArray(category.products) &&
            category.products.every(
              (product: ProductData) =>
                typeof product.name === "string" &&
                typeof product.price === "number" &&
                typeof product.isAvailable === "boolean" &&
                typeof product.uniqueProductOrderingName === "string"
            )))
    )
  );
};

export const parseImageMenu = async (file: File): Promise<CategoryData[]> => {
  try {
    const extractedImage = await extractTextFromImage(file);
    // Prepare the prompt
    const prompt = `You are an expert data parser. Given the following menu text, convert it into a structured JSON format that adheres to this schema:
      {
        "categories": [
          {
            "id": "string",
            "name": "string",
            "image": "string | null",
            "categoryType": "string",
            "products": [
              {
                "id": "string",
                "name": "string",
                "price": "number",
                "details": {
                  "detailsDescription": "string",
                  "extras": [ { "id": "string", "name": "string", "price": "number" } ],
                  "ingredients": [ { "id": "string", "name": "string", "price": "number", "image": "string | null" } ],
                  "variants": { "name": "string", "variantList": [ { "id": "string", "name": "string", "price": "number" } ] }
                },
                "isAvailable": "boolean",
                "image": "string | null",
                "uniqueProductOrderingName": "string"
              }
            ]
          }
        ]
      }

      Here's the menu image :
${extractedImage}
Just return the structured JSON in the specified format without any additional explanation, comments, or text. Please convert this into a valid JSON structure!`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 3000,
    });
    const messageContent = response?.choices[0]?.message?.content;
    if (messageContent) {
      console.log(JSON.parse(messageContent));
    } else {
      throw new Error("No content received from OpenAI.");
    }

    const rawResponse = response.choices[0]?.message?.content?.trim();
    if (!rawResponse) {
      throw new Error("No response text received from OpenAI.");
    }

    console.log(rawResponse);
    // Parse and validate the response
    const categories = JSON.parse(rawResponse);
    if (!validateCategoryData(categories)) {
      throw new Error("Parsed data does not match the expected schema.");
    }

    return categories;
  } catch (error) {
    console.error("Failed to parse PDF menu:", error);
    return [];
  }
};
import Tesseract from "tesseract.js";

const extractTextFromImage = async (file: File) => {
  try {
    const text = await Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    });
    return text.data.text;
  } catch (error) {
    console.error("Error extracting text:", error);
    return "";
  }
};
