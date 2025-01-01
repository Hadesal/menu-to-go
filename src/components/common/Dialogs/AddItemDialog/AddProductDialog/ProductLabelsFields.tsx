import { Allergies, DietaryOptions, Labels } from "@dataTypes/ProductDataTypes";
import { Form, Select } from "antd";
import vegetarianLogo from "../../../../../assets/veggie.png";
import halalLogo from "../../../../../assets/Halal_logo.svg.png";
import veganLogo from "../../../../../assets/vegan.png";

interface ProductLabelsFieldsProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
}

const allergensOptions: Allergies[] = [
  { label: "🍞 Gluten (G)", value: "gluten" },
  { label: "🥚 Eggs (E)", value: "eggs" },
  { label: "🧀 Milk (M)", value: "milk" },
  { label: "🌰 Nuts (N)", value: "nuts" }, // Almonds, hazelnuts, walnuts, etc.
  { label: "🥜 Peanuts (P)", value: "peanuts" },
  { label: "🐟 Fish (F)", value: "fish" },
  { label: "🦐 Crustaceans (C)", value: "crustaceans" }, // Shrimp, crab, lobster, etc.
  { label: "🐌 Molluscs (M)", value: "molluscs" }, // Snails, squid, mussels, etc.
  { label: "🌾 Sesame Seeds (S)", value: "sesame" },
  { label: "🍯 Lupin (L)", value: "lupin" }, // A type of legume often found in flour
  { label: "🍷 Sulphur Dioxide (SD)", value: "sulphites" }, // Used as a preservative
  { label: "🥛 Soybeans (S)", value: "soy" },
  { label: "🍚 Celery (C)", value: "celery" }, // Includes celeriac
  { label: "🍂 Mustard (M)", value: "mustard" },
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
        label="Allergens"
        layout="vertical"
        style={{
          padding: "0.5rem",
        }}
      >
        <Select
          placeholder="Select allergens for this product"
          mode="multiple"
          options={allergensOptions}
          value={values.details.allergies?.map((item) => item.value)} // map to values array
          onChange={handleAllergyChange}
        />
      </Form.Item>
      <Form.Item
        label="Labels"
        layout="vertical"
        style={{
          padding: "0.5rem",
        }}
      >
        <Select
          placeholder="Select labels for this product"
          mode="multiple"
          options={labelsOptions}
          value={values.details.labels?.map((item) => item.value)} // map to values array
          onChange={handleLabelChange}
        />
      </Form.Item>

      <Form.Item
        label="Dietary Option"
        layout="vertical"
        style={{ padding: "0.5rem" }}
      >
        <Select
          allowClear
          placeholder="Select a dietary option"
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
                imageSrc = ""; // Provide a default image or leave it empty
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
