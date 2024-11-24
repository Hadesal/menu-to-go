/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import OpenAI from "openai";
import Tesseract from "tesseract.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const validateCategoryData = (
  data: any
): data is { categories: CategoryData[] } => {
  if (!data || !Array.isArray(data.categories)) return false;

  return data.categories.every((category: any) => {
    if (
      typeof category.name !== "string" ||
      (typeof category.image !== "string" && category.image !== null) ||
      typeof category.categoryType !== "string" ||
      !Array.isArray(category.products)
    ) {
      return false;
    }

    return category.products.every((product: any) => {
      if (
        typeof product.name !== "string" ||
        typeof product.price !== "number" ||
        typeof product.isAvailable !== "boolean" ||
        typeof product.uniqueProductOrderingName !== "string" ||
        typeof product.details !== "object"
      ) {
        return false;
      }

      return true;
    });
  });
};

export const parseImageMenu = async (file: File): Promise<CategoryData[]> => {
  try {
    const extractedText = await extractTextFromImage(file);

    const prompt = `
You are an expert data parser. Given the following menu text, convert it into a structured JSON format that adheres to this schema:

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
            "extras": [
              { "id": "string", "name": "string", "price": "number" }
            ],
            "ingredients": [
              { "id": "string", "name": "string", "price": "number", "image": "string | null" }
            ],
            "variants": {
              "name": "string",
              "variantList": [
                { "id": "string", "name": "string", "price": "number" }
              ]
            }
          },
          "isAvailable": "boolean",
          "image": "string | null",
          "uniqueProductOrderingName": "string"
        }
      ]
    }
  ]
}

Here's the menu text:
${extractedText}

**Important Instructions:**
- Output only the JSON data.
- Do not include any explanations, comments, or extra text.
- Do not use code blocks or markdown formatting.
- Ensure the JSON is valid and properly formatted.
- Use double quotes for all JSON keys and string values.
- Avoid including null values; if a field is unknown, use an empty string or omit it.

Begin outputting the JSON now:
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4000,
      temperature: 0,
    });

    const messageContent = response.choices[0]?.message?.content;
    if (!messageContent) {
      throw new Error("No content received from OpenAI.");
    }

    const jsonString = extractJSONFromResponse(messageContent);

    const parsedData = JSON.parse(jsonString);

    if (!validateCategoryData(parsedData)) {
      throw new Error("Parsed data does not match the expected schema.");
    }
    console.log(parsedData.categories);
    return parsedData.categories;
  } catch (error) {
    console.error("Failed to parse image menu:", error);
    return [];
  }
};

const extractTextFromImage = async (file: File): Promise<string> => {
  try {
    const { data } = await Tesseract.recognize(file, "eng");
    return data.text;
  } catch (error) {
    console.error("Error extracting text:", error);
    return "";
  }
};
const extractJSONFromResponse = (responseText: string) => {
  let jsonString = responseText.replace(/```json|```/g, "").trim();

  const jsonStart = jsonString.indexOf("{");
  const jsonEnd = jsonString.lastIndexOf("}");

  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd >= jsonStart) {
    jsonString = jsonString.substring(jsonStart, jsonEnd + 1);
  } else {
    throw new Error("No JSON object found in the response.");
  }

  jsonString = jsonString.replace(/'/g, '"');

  jsonString = jsonString.replace(/}\s*[^}]*$/, "}");

  return jsonString;
};
