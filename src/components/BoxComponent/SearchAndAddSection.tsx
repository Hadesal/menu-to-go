/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, TextField, Button, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { ChangeEvent } from "react";
import { useAppSelector } from "@redux/reduxHooks";

interface ActionHeaderProps {
  onSearch: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleClickOpen: () => void;
  isProduct: boolean;
  selectedCategoryName?: string;
  setIsDeleteDialogOpen: (open: boolean) => void;
  styles: any;
  title: string;
  showSearch?: boolean;
}

export const ActionHeader = ({
  onSearch,
  handleClickOpen,
  isProduct,
  selectedCategoryName,
  setIsDeleteDialogOpen,
  styles,
  title,
  showSearch = true,
}: ActionHeaderProps) => {
  const { t } = useTranslation();
  const getString = t;
  const selectedProductIds = useAppSelector(
    (state) => state.restaurantsData?.selectedProductsIDs
  );
  return (
    <>
      {/* If there's no title */}
      {!title && (
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          {/* Conditionally render search field */}
          {showSearch && (
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
          <Button
            sx={styles.addButton}
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}
            disabled={isProduct && !selectedCategoryName}
          >
            {getString("add")}
          </Button>
        </Stack>
      )}

      {/* If there's a title */}
      {title && (
        <Stack direction="column" spacing={2} mb={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* Display the title */}
            <Typography variant="h6">{title}</Typography>

            {/* Action buttons (Copy, Move, Delete) */}
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              {selectedProductIds.length > 0 && (
                <>
                  <Button
                    sx={{ borderRadius: 10, width: "6vw", height: "5vh" }}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      // Add your copy logic here
                    }}
                  >
                    Copy
                  </Button>
                  <Button
                    sx={{ borderRadius: 10, width: "6vw", height: "5vh" }}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      // Add your move logic here
                    }}
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
                    onClick={() => {
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </>
              )}
              <Button
                sx={{
                  background: "var(--primary-color)",
                  color: "white",
                  borderRadius: 10,
                  width: "6vw",
                  height: "5vh",
                  "&:hover": {
                    backgroundColor: "transparent", // Make background transparent when hovered
                    color: "var(--primary-color)",
                  },
                }}
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                {getString("add")}
              </Button>
            </Box>
          </Box>

          {/* Conditionally render search field under the title */}
          {showSearch && (
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
        </Stack>
      )}
    </>
  );
};
