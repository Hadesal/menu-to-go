// ItemList.tsx
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import AccordionItem from "./AccordionItem";
import AccordionWrapper from "./AccordionWrapper";

interface ItemListProps {
  accordionTitle: string;
  namePlaceHolder: string;
  showPrice?: boolean;
  errors?: { nameError: boolean; priceError?: boolean; index: number }[];
  onItemsChange: (
    items: { name: string; price?: number; image?: string | null }[]
  ) => void;
  initialDataList: { name: string; price?: number }[];
}

const ItemList = ({
  accordionTitle,
  namePlaceHolder,
  showPrice,
  errors = [],
  onItemsChange,
  initialDataList = [],
}: ItemListProps) => {
  const [items, setItems] =
    useState<{ name: string; price?: number }[]>(initialDataList);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    onItemsChange(items);
  }, [items, onItemsChange]);

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { name: "", price: showPrice ? 0 : undefined },
    ]);
    setExpanded(true);
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    if (updatedItems.length === 0) {
      setExpanded(false);
    }
  };

  const handleItemChange = (
    index: number,
    itemData: { name: string; price?: number; image?: string | null }
  ) => {
    const updatedItems = [...items];
    updatedItems[index] = itemData;
    setItems(updatedItems);
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
      hasItems={items.length > 0}
      expanded={expanded && items.length > 0}
      onChange={(event, isExpanded) => {
        if (items.length > 0) setExpanded(isExpanded);
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
            noWrap
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
      }
      detailsContent={items.map((item, index) => {
        const { nameError, priceError } = getItemError(index);
        return (
          <AccordionItem
            key={index}
            onDelete={() => handleDeleteItem(index)}
            onItemChange={(itemData) => handleItemChange(index, itemData)}
            namePlaceHolder={namePlaceHolder}
            showPrice={showPrice}
            name={item.name}
            price={item.price}
            nameError={nameError}
            priceError={priceError}
          />
        );
      })}
      sx={{ marginTop: "2rem", borderRadius: "16px 16px 0px 0px" }}
      detailsSx={{ background: "#F9FDFE", padding: "0 2rem" }}
      children={""}
    />
  );
};

export default ItemList;
