// AccordionItem.tsx
import { Styles } from "@components/Dialogs/AddItemDialog/addItemDialog.styles";
import InputComponent from "@components/InputComponent/InputComponent";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

interface AccordionItemProps {
  onDelete: () => void;
  namePlaceHolder: string;
  showPrice?: boolean;
  nameError?: boolean;
  priceError?: boolean;
  name: string;
  price?: number;
  onItemChange: (itemData: {
    name: string;
    price?: number;
    image?: string | null;
  }) => void;
}

const AccordionItem = ({
  onDelete,
  namePlaceHolder,
  showPrice,
  onItemChange,
  nameError,
  priceError,
  name,
  price,
}: AccordionItemProps) => {
  const [itemData, setItemData] = useState({
    name: name || "",
    price: showPrice ? price || 0 : undefined,
    image: null,
  });

  useEffect(() => {
    setItemData((prev) => ({
      ...prev,
      name,
      price: showPrice ? price : undefined,
    }));
  }, [name, price, showPrice]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = { ...itemData, name: e.target.value };
    setItemData(updatedData);
    onItemChange(updatedData);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priceValue = parseFloat(e.target.value);
    const updatedData = {
      ...itemData,
      price: isNaN(priceValue) ? 0 : priceValue,
    };
    setItemData(updatedData);
    onItemChange(updatedData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <InputComponent
          id="nameField"
          type="Name"
          label=""
          required
          error={nameError}
          helperText={nameError ? "Name cannot be empty" : ""}
          textFieldStyle={{
            width: "100%",
            background: "white",
          }}
          value={itemData.name}
          InputPropStyle={Styles.inputPropStyle}
          placeholder={namePlaceHolder}
          onChange={handleNameChange}
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
            value={itemData.price === 0 ? "" : itemData.price}
            error={priceError}
            helperText={priceError ? "Price cannot be empty" : ""}
            InputPropStyle={Styles.inputPropStyle}
            placeholder="Price"
            onChange={handlePriceChange}
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

export default AccordionItem;
