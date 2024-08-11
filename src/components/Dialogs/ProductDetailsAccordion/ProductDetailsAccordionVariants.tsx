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

interface ProductDetailsAccordionProps {
  accordionTitle: string;
  namePlaceHolder: string;
  showPrice?: boolean;
  errors?: { nameError: boolean; priceError?: boolean; index: number }[];
  onItemsChange: (
    items: { name: string; price?: number; image?: string | null }[]
  ) => void;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled(
  ({ items, ...props }: AccordionSummaryProps & { items: any[] }) => (
    <MuiAccordionSummary
      expandIcon={
        <ArrowForwardIosSharpIcon
          sx={{
            fontSize: "1.2rem",
            color: "var(--primary-color)",
            display: items.length === 0 ? "none" : "inherit",
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

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ProductDetailsAccordion = ({
  accordionTitle,
  namePlaceHolder,
  showPrice,
  onItemsChange,
  errors = [],
}: ProductDetailsAccordionProps) => {
  const [items, setItems] = useState<{ name: string; price?: number }[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [newErrors, setNewErrors] = useState(errors);

  const handleAddItem = () => {
    const newItem = { name: "", price: showPrice ? 0 : undefined };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    onItemsChange(updatedItems);
    setExpanded(true);
  };

  useEffect(() => {
    setNewErrors(errors);
  }, [errors]);

  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onItemsChange(updatedItems);

    const updatedErrors = newErrors.filter((err) => err.index !== index);
    setNewErrors(updatedErrors);

    if (updatedItems.length === 0) {
      setExpanded(false);
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

  const getItemError = (index: number) => {
    const error = newErrors.find((err) => err.index === index);
    return {
      nameError: error?.nameError || false,
      priceError: error?.priceError || false,
    };
  };

  return (
    <Accordion
      expanded={expanded && items.length > 0}
      onChange={(event, isExpanded) => {
        if (items.length > 0) setExpanded(isExpanded);
      }}
      sx={{ marginTop: "2rem", borderRadius: "16px 16px 0px 0px" }}
    >
      <AccordionSummary
        items={items}
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
      </AccordionSummary>
      <AccordionDetails sx={{ background: "#F9FDFE", padding: "0 2rem" }}>
        {items.map((item, index) => {
          const { nameError, priceError } = getItemError(index);
          return (
            <ProductDetailsAccordionItem
              key={index}
              onDelete={() => handleDeleteItem(index)}
              onItemChange={(itemData) => handleItemChange(index, itemData)}
              namePlaceHolder={namePlaceHolder}
              showPrice={showPrice}
              name={item.name}
              price={item.price as number}
              nameError={nameError}
              priceError={priceError}
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductDetailsAccordion;