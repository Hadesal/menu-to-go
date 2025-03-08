import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const validateCategoryData = (data: {
  categories: CategoryData[];
}): boolean => {
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
    const base64Image = await fileToBase64(file);
    const dataUri = `data:image/jpeg;base64,${base64Image}`;
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "You are a helpful assistant that analyzes images and answers questions.",
          },
          {
            type: "text",
            text: `Convert the image menu content into a structured JSON format that adheres exactly to the following schema:
{
  "categories": [
    {
      "name": "string",
      "image": "string | null",
      "categoryType": "food|drinks",
      "products": [
        { "name": "string",
          "price": "number",
          "details": {
            "detailsDescription": "string",
            "extras": [
              { "id": "string",
                "name": "string",
                "price": "number"
              }
            ],
            "ingredients": [ 
              { "id": "string",
                "name": "string",
                "price": "number",
                "image": "string | null"
              }
            ],
            "variants": {
              "name": "string",
              "variantList": [
                { "id": "string",
                  "name": "string",
                  "price": "number"
                }
              ]
            }
          },
          "isAvailable": "boolean",
          "isSoldOut": "boolean",
          "image": "string | null",
          "uniqueProductOrderingName": "string"
        }
      ]
    }
  ]
}

Instructions:
1. Analyze the content and structure of the image menu.
2. Extract the information for each category and product accurately.
3. Ensure that all string values are quoted, numerical values are represented as numbers, and boolean values are accurately indicated.
4. If any category or product does not have an image, use 'null' for the image field.
5. Maintain the hierarchy and relationships between categories and products as described in the provided schema.
6. Validate the final JSON structure for correctness before outputting.
- Output only the JSON data.
- Do not include any explanations, comments, or extra text.
- Do not use code blocks or markdown formatting.
- Ensure the JSON is valid and strictly adheres to the JSON format.
- Avoid trailing commas and ensure all keys and string values use double quotes.
- Use only standard ASCII characters.

Output only valid JSON data with no extra text.
Begin outputting the JSON now:`.trim(),
          },
          {
            type: "image_url",
            image_url: { url: dataUri },
          },
        ],
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      max_tokens: 4000,
      temperature: 0,
      store: true,
    });

    const rawText = response.choices[0]?.message?.content;
    if (!rawText) {
      throw new Error("No content received from GPT-4 Vision.");
    }

    const jsonString = extractJSONFromResponse(rawText);
    console.log("Raw JSON from GPT-4 Vision:", jsonString);

    const parsedData = JSON.parse(jsonString);
    if (!validateCategoryData(parsedData)) {
      console.error("Validation Failed for Parsed Data:", parsedData);
      throw new Error("Parsed data does not match the expected schema.");
    }

    console.log("Parsed Categories:", parsedData.categories);
    return parsedData.categories;
  } catch (error) {
    console.error("Failed to parse image menu:", error);
    throw error;
  }
};

async function fileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

function extractJSONFromResponse(responseText: string): string {
  // Try to extract a JSON block from markdown fences
  const regex = /```json\s*([\s\S]*?)\s*```/i;
  const match = regex.exec(responseText);
  if (match && match[1]) {
    try {
      const candidate = match[1].trim();
      JSON.parse(candidate); // Validate
      return candidate;
    } catch (e) {
      // Fall through if parsing fails
    }
  }
  // Fallback: extract text between the first "{" and the last "}"
  const jsonStart = responseText.indexOf("{");
  const jsonEnd = responseText.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd < jsonStart) {
    throw new Error("No valid JSON object found in the response.");
  }
  const jsonString = responseText.substring(jsonStart, jsonEnd + 1).trim();
  try {
    JSON.parse(jsonString); // Validate JSON
    return jsonString;
  } catch (e) {
    throw new Error("Extracted string is not valid JSON.");
  }
}
