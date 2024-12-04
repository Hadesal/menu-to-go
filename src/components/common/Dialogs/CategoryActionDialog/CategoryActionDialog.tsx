import { CategoryData } from "@dataTypes/CategoryDataTypes";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ICategoryActionDialog {
  categories: CategoryData[];
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  onConfirmClick: (selectedCategory: string) => void;
  selectedCategory: CategoryData;
  actionTitle: string;
  buttonLabel: string;
  selectLabel: string;
}

export const CategoryActionDialog = ({
  categories,
  isDialogOpen,
  setIsDialogOpen,
  onConfirmClick,
  selectedCategory,
  actionTitle,
  buttonLabel,
  selectLabel,
}: ICategoryActionDialog) => {
  const filteredCategories: CategoryData[] = categories.filter(
    (cat) => selectedCategory.id !== cat.id
  );

  const [selectedCategoryTarget, setSelectedCategoryTarget] = useState<string>(
    filteredCategories[0]?.id || ""
  );

  return (
    <Dialog
      disableRestoreFocus
      PaperProps={{
        sx: {
          borderRadius: "24px",
          padding: "10px 20px",
          width: "36.25rem",
        },
      }}
      open={isDialogOpen}
      onClose={() => {
        setIsDialogOpen(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{actionTitle}</DialogTitle>

      <DialogContent>
        <InputLabel id="select-label">{selectLabel}</InputLabel>
        <Select
          sx={{
            width: "100%",
            borderRadius: "1rem",
            marginTop: "0.5rem",
          }}
          labelId="select-label"
          id="category-select"
          value={selectedCategoryTarget}
          onChange={(event) => {
            setSelectedCategoryTarget(event.target.value);
          }}
        >
          {filteredCategories.map((category, index) => (
            <MenuItem key={index} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>

      <DialogActions>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              setIsDialogOpen(false);
            }}
            sx={{
              marginRight: 2,
              borderRadius: "20px",
              padding: "5px 25px 5px 25px",
              borderColor: "var(--primary-color)",
              "&:hover": {
                borderColor: "var(--primary-color)",
                boxShadow: "none",
                color: "var(--primary-color)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onConfirmClick(selectedCategoryTarget);
            }}
            sx={{
              borderRadius: "20px",
              padding: "5px 25px 5px 25px",
              backgroundColor: "var(--primary-color)",
              border: "1px solid transparent",
              "&:hover": {
                backgroundColor: "transparent",
                borderColor: "var(--primary-color)",
                boxShadow: "none",
                color: "var(--primary-color)",
              },
            }}
          >
            {buttonLabel} {/* Use the dynamic button label */}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
