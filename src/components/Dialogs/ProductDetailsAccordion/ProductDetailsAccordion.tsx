import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Box, Button } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import ProductDetailsAccordionItem from "./ProductDetailsAccordionItem";
import InputComponent from "../../InputComponent/InputComponent";
import { Styles } from "../AddItemDialog/addItemDialog.styles";

interface ProductDetailsAccordionProps {
  accordionTitle: string;
  namePlaceHolder: string;
  showPrice?: boolean;
  errors?: { nameError: boolean; priceError?: boolean; index: number }[];
  onItemsChange?: (
    items: { name: string; price?: number; image?: string | null }[]
  ) => void;

  onVariantsChange?: (variantGroup: {
    name: string;
    variants: { name: string; price: number }[];
  }) => void;

  isVariant: boolean;
  initialDataName?: string;
  initialDataList: [];
}

// Styled components for the main accordion
const MainAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&::before": {
    display: "none",
  },
}));

const MainAccordionSummary = styled(
  ({
    items,
    isVariant,
    ...props
  }: AccordionSummaryProps & { items: any[]; isVariant: boolean }) => (
    <MuiAccordionSummary
      expandIcon={
        <ArrowForwardIosSharpIcon
          sx={{
            fontSize: "1.2rem",
            color: "var(--primary-color)",
            display: isVariant
              ? "inherit"
              : items.length === 0
              ? "none"
              : "inherit",
          }}
        />
      }
      {...props}
    />
  )
)(({ theme }) => ({
  borderRadius: "15px 15px 0px 0px",
  padding: "0.5rem 1.5rem",
  backgroundColor: "#E0E4E5",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const MainAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

// Styled components for the nested accordion
const NestedAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  marginTop: theme.spacing(1),
  "&::before": {
    display: "none",
  },
}));

const NestedAccordionSummary = styled(
  ({
    variantItems,
    ...props
  }: AccordionSummaryProps & { variantItems: any[] }) => (
    <MuiAccordionSummary
      expandIcon={
        <ArrowForwardIosSharpIcon
          sx={{
            fontSize: "1rem",
            color: "var(--primary-color)",
            display: variantItems.length === 0 ? "none" : "inherit",
          }}
        />
      }
      {...props}
    />
  )
)(({ theme }) => ({
  borderRadius: "12px",
  padding: "0.5rem 1rem",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const NestedAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ProductDetailsAccordion = ({
  accordionTitle,
  namePlaceHolder,
  showPrice,
  onItemsChange,
  onVariantsChange,
  errors = [],
  isVariant,
  initialDataName,
  initialDataList = [],
}: ProductDetailsAccordionProps) => {
  const [items, setItems] = useState<{ name: string; price?: number }[]>([]);
  const [variants, setVariants] = useState<{
    name: string;
    variants: { name: string; price: number }[];
  }>({ name: "", variants: [] });
  const [expanded, setExpanded] = useState(false);
  const [variantsOptionsExpanded, setVariantsOptionsExpanded] = useState(false);
  const [newErrors, setNewErrors] = useState(errors);

  const handleAddItem = () => {
    if (isVariant) {
      const newVariantItem = {
        ...variants,
        variants: [...variants.variants, { name: "", price: 0 }],
      };
      setVariants(newVariantItem);
      onVariantsChange?.(newVariantItem);
      setVariantsOptionsExpanded(true);
    } else {
      const newItem = { name: "", price: showPrice ? 0 : undefined };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      onItemsChange(updatedItems);
      setExpanded(true);
    }
  };

  useEffect(() => {
    setNewErrors(errors);
  }, [errors]);

  useEffect(() => {
    setItems(initialDataList);
  }, [initialDataList]);

  const handleDeleteItem = (index: number, isVariantItem: boolean) => {
    const newErrorsArr = newErrors.filter((err) => err.index !== index);
    setNewErrors(newErrorsArr);
    if (isVariantItem) {
      setVariants((prevGroup) => {
        const updatedVariants = prevGroup.variants.filter(
          (_, i) => i !== index
        );
        const newGroup = { ...prevGroup, variants: updatedVariants };
        if (updatedVariants.length === 0) {
          setVariantsOptionsExpanded(false);
        }
        onVariantsChange?.(newGroup);
        return newGroup;
      });
    } else {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
      onItemsChange(updatedItems);

      if (updatedItems.length === 0) {
        setExpanded(false);
      }
    }
  };

  const handleItemChange = (
    index: number,
    itemData: { name: string; price?: number; image: string | null }
  ) => {
    const updatedItems = [...items];
    updatedItems[index] = itemData;
    setItems(updatedItems);
    onItemsChange(updatedItems);
  };
  
  const handleVariantItemChange = (
    index: number,
    itemData: { name: string; price: number }
  ) => {
    setVariants((prevGroup) => {
      const updatedVariants = prevGroup.variants.map((variant, i) =>
        i === index ? itemData : variant
      );
      const newGroup = { ...prevGroup, variants: updatedVariants };
      onVariantsChange?.(newGroup);
      return newGroup;
    });
  };

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVariants((prevGroup) => {
      const newGroup = { ...prevGroup, name: event.target.value };
      onVariantsChange?.(newGroup);
      return newGroup;
    });
  };

  const getItemError = (index: number) => {
    const error = newErrors.find((err) => err.index === index);
    return {
      nameError: error?.nameError || false,
      priceError: error?.priceError || false,
    };
  };

  return (
    <MainAccordion
      expanded={isVariant ? expanded : expanded && items.length > 0}
      onChange={(event, isExpanded) => {
        if (isVariant) {
          setExpanded(isExpanded);
        } else {
          if (items.length > 0) setExpanded(isExpanded);
        }
      }}
      sx={{ marginTop: "2rem", borderRadius: "16px 16px 0px 0px" }}
    >
      <MainAccordionSummary
        items={items}
        isVariant={isVariant}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
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
            {accordionTitle}
          </Typography>
          {!isVariant && (
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
              onClick={(e) => {
                e.stopPropagation();
                handleAddItem();
              }}
            >
              Add
            </Button>
          )}
        </Box>
      </MainAccordionSummary>
      <MainAccordionDetails
        sx={{
          background: "#F9FDFE",
          padding: isVariant ? "0 2rem 1rem 2rem" : "0 2rem",
        }}
      >
        {isVariant && (
          <>
            <InputComponent
              id="nameField"
              type="Name"
              label=""
              required
              textFieldStyle={{
                width: "100%",
                background: "white",
              }}
              value={initialDataName}
              InputPropStyle={Styles.inputPropStyle}
              placeholder={namePlaceHolder}
              onChange={handleGroupNameChange}
            />

            <NestedAccordion
              expanded={variantsOptionsExpanded}
              onChange={(event, isExpanded) => {
                if (variants.variants.length > 0)
                  setVariantsOptionsExpanded(isExpanded);
              }}
              sx={{ marginBottom: 1 }}
            >
              <NestedAccordionSummary
                aria-controls="nested-panel-content"
                id="nested-panel-header"
                variantItems={variants.variants}
              >
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
                    Variants Option
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddItem();
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </NestedAccordionSummary>
              <NestedAccordionDetails>
                {/* Content for the nested accordion */}
                {variants.variants.map((item, index) => {
                  const { nameError, priceError } = getItemError(index);
                  return (
                    <ProductDetailsAccordionItem
                      key={index}
                      onDelete={() => handleDeleteItem(index, true)}
                      onItemChange={(itemData) =>
                        handleVariantItemChange(index, itemData)
                      }
                      namePlaceHolder={namePlaceHolder}
                      showPrice={showPrice}
                      name={item.name}
                      price={item.price as number}
                      nameError={nameError}
                      priceError={priceError}
                    />
                  );
                })}
              </NestedAccordionDetails>
            </NestedAccordion>
          </>
        )}
        {!isVariant && (
          <>
            {items.map((item, index) => {
              const { nameError, priceError } = getItemError(index);
              return (
                <ProductDetailsAccordionItem
                  key={index}
                  onDelete={() => handleDeleteItem(index, false)}
                  onItemChange={(itemData) =>
                    handleItemChange(index, itemData)
                  }
                  namePlaceHolder={namePlaceHolder}
                  showPrice={showPrice}
                  name={item.name}
                  price={item.price as number}
                  nameError={nameError}
                  priceError={priceError}
                />
              );
            })}
          </>
        )}
      </MainAccordionDetails>
    </MainAccordion>
  );
};

export default ProductDetailsAccordion;