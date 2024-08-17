import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import InputComponent from "../../InputComponent/InputComponent";
import { Styles } from "../AddItemDialog/addItemDialog.styles";

interface ProductDetailsAccordionItemProps {
  onDelete: () => void;
  namePlaceHolder: string;
  showPrice?: boolean;
  nameError?: boolean;
  priceError?: boolean;
  name: string;
  price: number;
  onItemChange: (itemData: {
    name: string;
    price?: number;
    image?: string | null;
  }) => void;
}

const ProductDetailsAccordionItem = ({
  onDelete,
  namePlaceHolder,
  showPrice,
  onItemChange,
  nameError,
  priceError,
  name,
  price,
}: ProductDetailsAccordionItemProps) => {
  const [accordionItemData, setAccordionItemData] = useState({
    name: "",
    price: showPrice ? 0 : undefined,
    image: null,
  });

  const [nameErrorLocal, setNameErrorLocal] = useState<boolean | undefined>(
    false
  );
  const [priceErrorLocal, setPriceErrorLocal] = useState<boolean | undefined>(
    false
  );

  useEffect(() => {
    setNameErrorLocal(nameError);
  }, [nameError]);
  useEffect(() => {
    setPriceErrorLocal(priceError);
  }, [priceError]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <InputComponent
          id="nameField"
          type="Name"
          label=""
          required
          error={nameErrorLocal}
          helperText={nameErrorLocal ? "Name cannot be empty" : ""}
          textFieldStyle={{
            width: "100%",
            background: "white",
          }}
          value={name}
          InputPropStyle={Styles.inputPropStyle}
          placeholder={namePlaceHolder}
          onChange={(e) => {
            const newAccordionItemData = {
              ...accordionItemData,
              name: e.target.value,
            };
            setAccordionItemData(newAccordionItemData);
            onItemChange(newAccordionItemData);
            if (e.target.value.length === 0) {
              setNameErrorLocal(true);
            } else {
              setNameErrorLocal(false);
            }
          }}
        />
        {showPrice && (
          <InputComponent
            id="priceField"
            type="Number"
            label=""
            required
            textFieldStyle={{
              width: "100%",
              marginLeft: "1rem",
              background: "white",
            }}
            value={price === 0 ? "" : price}
            error={priceErrorLocal}
            helperText={priceErrorLocal ? "Price cannot be empty" : ""}
            InputPropStyle={Styles.inputPropStyle}
            placeholder="Price"
            onChange={(e) => {
              const newAccordionItemData = {
                ...accordionItemData,
                price: parseFloat(e.target.value),
              };
              setAccordionItemData(newAccordionItemData);
              onItemChange(newAccordionItemData);
              if (
                parseFloat(e.target.value) <= 0 ||
                isNaN(parseFloat(e.target.value))
              ) {
                setPriceErrorLocal(true);
              } else {
                setPriceErrorLocal(false);
              }
            }}
          />
        )}
      </Box>
      <IconButton onClick={onDelete}>
        <DeleteOutlineIcon
          sx={{ color: "var(--primary-color)" }}
          fontSize="large"
        />
      </IconButton>
    </Box>
  );
};

export default ProductDetailsAccordionItem;
