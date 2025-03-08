/* eslint-disable @typescript-eslint/no-explicit-any */
import { dietaryOptionsMap } from "@constants/productLabels";
import { Form, Select } from "antd";
import { useLanguage } from "src/hooks/useLanguage";

interface ProductLabelsFieldsProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
}

export interface Allergies {
  label: string;
  value: string;
}
export interface Labels {
  label: string;
  value: string;
}
export interface DietaryOptions {
  label: string;
  value: string;
}

const allergensOptions: Allergies[] = [
  { label: "🍞 Gluten (A)", value: "gluten" },
  { label: "🦐 Crustaceans (B)", value: "crustaceans" },
  { label: "🥚 Eggs (C)", value: "eggs" },
  { label: "🐟 Fish (D)", value: "fish" },
  { label: "🥜 Peanuts (E)", value: "peanuts" },
  { label: "🌱 Soybeans (F)", value: "soy" },
  { label: "🥛 Milk (G)", value: "milk" },
  { label: "🌰 Nuts (H)", value: "nuts" },
  { label: "🍲 Celery (L)", value: "celery" },
  { label: "🍯 Mustard (M)", value: "mustard" },
  { label: "🌾 Sesame Seeds (N)", value: "sesame" },
  { label: "🍷 Sulphur Dioxide (O)", value: "sulphites" },
  { label: "🍚 Lupin (P)", value: "lupin" },
  { label: "🐌 Molluscs (R)", value: "molluscs" },
];

const labelsOptions: Labels[] = [
  { label: "⭐ Bestseller", value: "Bestseller" },
  { label: "🆕 New", value: "New" },
];

const dietaryOptions: DietaryOptions[] = [
  {
    label: "Halal",
    value: "halal",
  },
  {
    label: "Vegan",
    value: "vegan",
  },
  {
    label: "Vegetarian",
    value: "vegetarian",
  },
];

const ProductLabelsFields = ({
  values,
  setFieldValue,
}: ProductLabelsFieldsProps) => {
  const { getString } = useLanguage();

  const handleAllergyChange = (selectedValues: string[]) => {
    const selectedAllergens = allergensOptions.filter((option) =>
      selectedValues.includes(option.value)
    );

    const selectedAllergenValues = selectedAllergens.map(
      (allergen) => allergen.value
    );
    setFieldValue("details.allergies", selectedAllergenValues);
  };

  const handleLabelChange = (selectedValues: string[]) => {
    const selectedLabels = labelsOptions.filter((option) =>
      selectedValues.includes(option.value)
    );
    const selectedLabelsValues = selectedLabels.map((label) => label.value);
    setFieldValue("details.labels", selectedLabelsValues);
  };

  const handleDietaryChange = (selectedValue: string) => {
    setFieldValue(
      "details.dietaryOptionLabel",
      selectedValue
        ? dietaryOptions.find((option) => option.value === selectedValue)?.value
        : ""
    );
  };

  return (
    <div className="productLabelsFields">
      <Form.Item
        label={getString("allergensLabel")}
        layout="vertical"
        style={{
          padding: "0.5rem",
        }}
      >
        <Select
          placeholder={getString("allergensPlaceholder")}
          mode="multiple"
          options={allergensOptions}
          value={values.details.allergies?.map((item: string[]) => item)}
          onChange={handleAllergyChange}
        />
      </Form.Item>
      <Form.Item
        label={getString("labelsLabel")}
        layout="vertical"
        style={{
          padding: "0.5rem",
        }}
      >
        <Select
          placeholder={getString("labelsPlaceholder")}
          mode="multiple"
          options={labelsOptions}
          value={values.details.labels?.map((label: string[]) => label)}
          onChange={handleLabelChange}
        />
      </Form.Item>

      <Form.Item
        label={getString("dietaryOptionsLabel")}
        layout="vertical"
        style={{ padding: "0.5rem" }}
      >
        <Select
          allowClear
          placeholder={getString("dietaryOptionsPlaceholder")}
          options={dietaryOptions.map((option) => {
            const imageSrc =
              dietaryOptionsMap[option.value as keyof typeof dietaryOptionsMap]
                ?.image;

            return {
              label: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={imageSrc}
                    alt={option.label}
                    style={{ width: "20px", marginRight: "8px" }}
                  />
                  {option.label}
                </div>
              ),
              value: option.value,
            };
          })}
          value={
            values.details.dietaryOptionLabel
              ? values.details.dietaryOptionLabel
              : null
          }
          onChange={handleDietaryChange}
        />
      </Form.Item>
    </div>
  );
};

export default ProductLabelsFields;
