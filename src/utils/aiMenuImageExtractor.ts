import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
  dangerouslyAllowBrowser: true,
});

const validateCategoryData = (data: { categories: CategoryData[] }) => {
  if (!data || !Array.isArray(data.categories)) return false;

  return data.categories.every((category: CategoryData) => {
    if (
      typeof category.name !== "string" ||
      (typeof category.image !== "string" && category.image !== null) ||
      typeof category.categoryType !== "string" ||
      !Array.isArray(category.products)
    ) {
      return false;
    }

    return category.products.every((product: ProductData) => {
      if (
        typeof product.name !== "string" ||
        typeof product.price !== "number" ||
        typeof product.isAvailable !== "boolean" ||
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
    console.log("Extracted Text:", extractedText);

    const prompt = `
You are an expert data parser. Given the following menu text, convert it into a structured JSON format that adheres to this schema:

{
  "categories": [
    {
      "name": "string",
      "image": "string | null",
      "categoryType": "food|drinks",
      "products": [
        {
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
- Ensure the JSON is valid and strictly adheres to the JSON format.
- Avoid trailing commas and ensure all keys and string values use double quotes.
- Use only standard ASCII characters.

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
    console.log("Raw JSON from OpenAI:", jsonString);

    try {
      const parsedData = JSON.parse(jsonString);

      if (!validateCategoryData(parsedData)) {
        console.error("Validation Failed for Parsed Data:", parsedData);
        throw new Error("Parsed data does not match the expected schema.");
      }

      console.log("Parsed Categories:", parsedData.categories);
      return parsedData.categories;
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonString);
      if (jsonError instanceof Error) {
        throw new Error(`Failed to parse JSON: ${jsonError.message}`);
      } else {
        throw new Error("Failed to parse JSON: Unknown error");
      }
    }
  } catch (error) {
    console.error("Failed to parse image menu:", error);
    return [];
  }
};

const extractTextFromImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const OCR_BACKEND_URL = "http://46.202.140.217:5001/ocr";

    const response = await fetch(OCR_BACKEND_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`OCR service returned status ${response.status}`);
    }

    const data = await response.json();
    console.log("OCR Response Data:", data);

    return data.text || "";
  } catch (error) {
    console.error("Error extracting text with EasyOCR:", error);
    return "";
  }
};

const extractJSONFromResponse = (responseText: string): string => {
  try {
    let jsonString = responseText.replace(/```json|```/g, "").trim();

    const jsonStart = jsonString.indexOf("{");
    const jsonEnd = jsonString.lastIndexOf("}");

    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd >= jsonStart) {
      jsonString = jsonString.substring(jsonStart, jsonEnd + 1);
    } else {
      throw new Error("No valid JSON object found in the response.");
    }

    // Validate and sanitize JSON
    JSON.parse(jsonString); // Ensure it is a valid JSON string

    return jsonString;
  } catch (error) {
    console.error("Error extracting or validating JSON:", error);
    throw new Error("Invalid JSON format received from OpenAI response.");
  }
};
