/* eslint-disable @typescript-eslint/no-explicit-any */
import { Allergies, DietaryOptions, Labels } from "@dataTypes/ProductDataTypes";
import { Form, Select } from "antd";
import { useLanguage } from "src/hooks/useLanguage";
import halalLogo from "../../../../../assets/Halal_logo.svg.png";
import veganLogo from "../../../../../assets/vegan.png";
import vegetarianLogo from "../../../../../assets/veggie.png";

interface ProductLabelsFieldsProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
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
    setFieldValue("details.allergies", selectedAllergens);
  };

  const handleLabelChange = (selectedValues: string[]) => {
    const selectedLabels = labelsOptions.filter((option) =>
      selectedValues.includes(option.value)
    );
    setFieldValue("details.labels", selectedLabels);
  };

  const handleDietaryChange = (selectedValue: string) => {
    setFieldValue(
      "details.dietaryOptions",
      selectedValue
        ? dietaryOptions.find((option) => option.value === selectedValue)
        : { value: "", label: "" }
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
          value={values.details.allergies?.map((item: Allergies) => item.value)} // map to values array
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
          value={values.details.labels?.map((item: Labels) => item.value)} // map to values array
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
            // Determine the image source based on the label
            let imageSrc;
            switch (option.label) {
              case "Halal":
                imageSrc = halalLogo;
                break;
              case "Vegan":
                imageSrc = veganLogo;
                break;
              case "Vegetarian":
                imageSrc = vegetarianLogo;
                break;
              default:
                imageSrc = "";
            }

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
            values.details.dietaryOptions?.value
              ? values.details.dietaryOptions?.value
              : null
          }
          onChange={handleDietaryChange}
        />
      </Form.Item>
    </div>
  );
};

export default ProductLabelsFields;
