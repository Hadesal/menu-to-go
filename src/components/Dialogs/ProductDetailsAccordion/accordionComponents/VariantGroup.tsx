// VariantGroup.tsx
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import AccordionItem from "./AccordionItem";
import AccordionWrapper from "./AccordionWrapper";
import InputComponent from "@components/InputComponent/InputComponent";
import { Styles } from "@components/Dialogs/AddItemDialog/addItemDialog.styles";
import { useTranslation } from "react-i18next";

interface VariantGroupProps {
  namePlaceHolder: string;
  showPrice?: boolean;
  errors?: { nameError: boolean; priceError?: boolean; index: number }[];
  onVariantsChange: (variantGroup: {
    name: string;
    variants: { name: string; price: number }[];
  }) => void;
  initialDataName?: string;
  initialDataList: { name: string; price: number }[];
}

const VariantGroup = ({
  namePlaceHolder,
  showPrice,
  errors = [],
  onVariantsChange,
  initialDataName = "",
  initialDataList = [],
}: VariantGroupProps) => {
  const [groupName, setGroupName] = useState(initialDataName);
  const [variants, setVariants] =
    useState<{ name: string; price: number }[]>(initialDataList);
  const [expanded, setExpanded] = useState(false);
  const MAXCHARSLENGTH = 30;
  const { t } = useTranslation();
  const getString = t;
  useEffect(() => {
    onVariantsChange({ name: groupName, variants });
  }, [groupName, variants, onVariantsChange]);

  const handleAddVariant = () => {
    setVariants((prevVariants) => [...prevVariants, { name: "", price: 0 }]);
    setExpanded(true);
  };

  const handleDeleteVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
    if (updatedVariants.length === 0) {
      setExpanded(false);
    }
  };

  const handleVariantChange = (
    index: number,
    variantData: { name: string; price?: number; image?: string | null }
  ) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = {
      name: variantData.name,
      price: variantData.price || 0,
    };
    setVariants(updatedVariants);
  };

  const getItemError = (index: number) => {
    const error = errors.find((err) => err.index === index);
    return {
      nameError: error?.nameError || false,
      priceError: error?.priceError || false,
    };
  };

  return (
    <AccordionWrapper
      hasItems={true}
      expanded={expanded}
      onChange={(event, isExpanded) => {
        setExpanded(isExpanded);
      }}
      summaryContent={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: "17px", color: "var(--primary-color)" }}
          >
            {getString("variants")}
          </Typography>
        </Box>
      }
      detailsContent={
        <Box>
          <InputComponent
            id="groupNameField"
            type="Name"
            label=""
            required
            textFieldStyle={{
              width: "100%",
              background: "white",
              marginBottom: "1rem",
            }}
            value={groupName}
            InputPropStyle={Styles.inputPropStyle}
            placeholder={namePlaceHolder}
            onChange={(e) => setGroupName(e.target.value)}
            MAXCHARSLENGTH={MAXCHARSLENGTH}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "17px", color: "var(--primary-color)" }}
            >
              {getString("variantsOption")}
            </Typography>
            <Button
              sx={{
                borderRadius: 16,
                color: "var(--primary-color)",
                "&:hover": {
                  color: "var(--primary-color)",
                },
              }}
              variant="outlined"
              color="primary"
              onClick={handleAddVariant}
            >
              {getString("add")}
            </Button>
          </Box>
          {variants.map((variant, index) => {
            const { nameError, priceError } = getItemError(index);
            return (
              <AccordionItem
                key={index}
                onDelete={() => handleDeleteVariant(index)}
                onItemChange={(itemData) =>
                  handleVariantChange(index, itemData)
                }
                namePlaceHolder={namePlaceHolder}
                showPrice={showPrice}
                name={variant.name}
                price={variant.price}
                nameError={nameError}
                priceError={priceError}
              />
            );
          })}
        </Box>
      }
      summarySx={{ borderRadius: "15px", padding: "0.5rem 1.5rem" }}
      detailsSx={{ padding: "1rem 2rem" }}
      sx={{ marginTop: "2rem", borderRadius: "15px" }}
      children={""}
    />
  );
};

export default VariantGroup;
