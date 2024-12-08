// validationSchema.ts
import * as Yup from "yup";
import { ProductData, ExtrasData, IngredientData, VariantData } from "@dataTypes/ProductDataTypes";

const isUniqueAmongProducts = (
  fieldValue: string | undefined,
  fieldName: "name" | "uniqueProductOrderingName",
  existingProducts: ProductData[] | undefined,
  initialData: ProductData | undefined
): boolean => {
  if (!existingProducts || !fieldValue) return true;
  const lowerFieldValue = fieldValue.toLowerCase();
  return !existingProducts.some(
    (product) =>
      product[fieldName]?.toLowerCase() === lowerFieldValue &&
      product.id !== initialData?.id
  );
};

export const createValidationSchema = (existingProducts?: ProductData[], initialData?: ProductData) =>
  Yup.object({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .test("unique-name", "A product with this name already exists.", function (value) {
        return (
          isUniqueAmongProducts(value, "name", existingProducts, initialData) ||
          this.createError({ message: "A product with this name already exists." })
        );
      }),

    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required"),

    isAvailable: Yup.boolean(),

    uniqueProductOrderingName: Yup.string()
      .trim()
      .required("Unique ordering name is required")
      .test(
        "unique-ordering-name",
        "A product with this ordering name already exists.",
        function (value) {
          return (
            isUniqueAmongProducts(value, "uniqueProductOrderingName", existingProducts, initialData) ||
            this.createError({ message: "A product with this ordering name already exists." })
          );
        }
      ),

    details: Yup.object().shape({
      variants: Yup.object().shape({
        name: Yup.string().when("variantList", (variantList: VariantData[] | undefined, schema) => {
          if (Array.isArray(variantList) && variantList.length > 0) {
            return schema.trim().required("Variant group name is required since you have variants");
          }
          return schema.notRequired();
        }),

        variantList: Yup.array().of(
          Yup.object().shape({
            name: Yup.string()
              .trim()
              .required("Variant name is required"),
            price: Yup.number()
              .typeError("Variant price must be a number")
              .positive("Variant price must be greater than zero")
              .required("Variant price is required"),
          })
        ),
      }),

      ingredients: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .trim()
            .required("Ingredient name is required")

        })
      ),

      extras: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .trim()
            .required("Extra name is required")
            .test("unique-extra-name", "Extra names must be unique", function (value) {
              const formValues = (this.options.context || {}) as Partial<ProductData>;
              const extras = formValues.details?.extras ?? [];
              const extraNames = extras.map((ex: ExtrasData) =>
                (ex.name || "").toLowerCase()
              );
              const occurrences = extraNames.filter(
                (name: string) => name === (value || "").toLowerCase()
              ).length;
              return occurrences <= 1 || this.createError({ message: "Extra names must be unique" });
            }),
          price: Yup.number()
            .typeError("Extra price must be a number")
            .positive("Extra price must be greater than zero")
            .required("Extra price is required"),
        })
      ),
    }),
  });
