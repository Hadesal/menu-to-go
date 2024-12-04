import Styles from "@dataTypes/StylesTypes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

import {
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { t } = useTranslation();
  const getString = t;

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
          slotProps={{ input: { startAdornment: <SearchIcon /> } }}
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
          minWidth: 0,
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography
          title={title}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          variant="h6"
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          {product && selectedProductsIDs.length > 0 && (
            <>
              <Button
                sx={{
                  borderRadius: 10,
                  minWidth: "6vw",
                  display: { xs: "none", sm: "block" },
                }}
                variant="outlined"
                color="primary"
                onClick={onCopyClick}
              >
                {getString("copy")}
              </Button>
              <Button
                sx={{
                  borderRadius: 10,
                  minWidth: "6vw",
                  display: { xs: "none", sm: "block" },
                }}
                variant="outlined"
                color="primary"
                onClick={onMoveClick}
              >
                {getString("move")}
              </Button>
              <Button
                sx={{
                  borderRadius: 10,
                  minWidth: "6vw",
                  background: "red",
                  color: "white",
                  display: { xs: "none", sm: "block" },
                }}
                variant="outlined"
                color="primary"
                onClick={onDeleteClick}
              >
                {getString("delete")}
              </Button>

              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  display: { sm: "none" },
                  minWidth: "6vw",
                  whiteSpace: "nowrap",
                }}
                endIcon={<ExpandMoreIcon />}
              >
                Bulk actions
              </Button>
              <Menu
                id="bulk-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    if (onCopyClick) onCopyClick();
                    handleClose();
                  }}
                >
                  {getString("copy")}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    if (onMoveClick) onMoveClick();
                    handleClose();
                  }}
                >
                  {getString("move")}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    if (onDeleteClick) onDeleteClick();
                    handleClose();
                  }}
                >
                  {getString("delete")}
                </MenuItem>
              </Menu>
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
            {getString("add")}
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default HeaderComponent;
