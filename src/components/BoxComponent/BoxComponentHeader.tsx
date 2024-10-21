import Styles from "@dataTypes/StylesTypes";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";

interface HeaderComponentProps {
  title?: string;
  onSearch: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onAddClick: () => void;
  onCopyClick?: () => void;
  onMoveClick?: () => void;
  onDeleteClick?: () => void;
  selectedProductsIDs: string[];
  addButtonDisabled?: boolean;
  styles: Styles;
  category: boolean;
  product: boolean;
}

const HeaderComponent = ({
  title,
  onSearch,
  onAddClick,
  onCopyClick,
  onMoveClick,
  onDeleteClick,
  selectedProductsIDs,
  addButtonDisabled,
  styles,
  category,
  product,
}: HeaderComponentProps) => {
  return (
    <Stack
      direction={title ? "column-reverse" : "row"}
      spacing={2}
      alignItems="center"
      mb={3}
      sx={{ padding: category ? "30px 20px 0 20px" : undefined }}
    >
      {!category && (
        <TextField
          sx={styles.searchField}
          variant="outlined"
          placeholder="   Search"
          color="primary"
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          fullWidth
          onChange={onSearch}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: title ? "100%" : "inherit",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          {product && selectedProductsIDs.length > 0 && (
            <>
              <Button
                sx={{ borderRadius: 10, width: "6vw", height: "5vh" }}
                variant="outlined"
                color="primary"
                onClick={onCopyClick}
              >
                Copy
              </Button>
              <Button
                sx={{ borderRadius: 10, width: "6vw", height: "5vh" }}
                variant="outlined"
                color="primary"
                onClick={onMoveClick}
              >
                Move
              </Button>
              <Button
                sx={{
                  borderRadius: 10,
                  width: "6vw",
                  height: "5vh",
                  background: "red",
                  color: "white",
                }}
                variant="outlined"
                color="primary"
                onClick={onDeleteClick}
              >
                Delete
              </Button>
            </>
          )}
          <Button
            sx={{
              background: title ? "var(--primary-color)" : "transparent",
              color: title ? "white" : "var(--primary-color)",
              borderRadius: 10,
              minWidth: "6vw",
              "&:hover": {
                backgroundColor: "transparent",
                color: "var(--primary-color)",
              },
            }}
            variant="outlined"
            onClick={onAddClick}
            disabled={addButtonDisabled}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default HeaderComponent;
