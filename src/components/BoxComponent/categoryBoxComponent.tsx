/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";
import Styles from "../../DataTypes/StylesTypes";
import { useAppSelector } from "../../redux/reduxHooks";
import AddCategoryDialog from "../Dialogs/AddItemDialog/addCategoryDialog";
import EmptyState from "../EmptyStateComponet/EmptyState";
import ItemsListView from "../ItemViews/listView";
import { itemsType } from "@utils/dataTypeCheck";
import CategoryListView from "@components/ItemViews/CategoryListView";

interface CategoryBoxComponentProps {
  items: CategoryData[];
  styles: Styles;
  editFunction: (item: CategoryData) => void;
  deleteFunction: (item: any) => void;
  addFunction: (item: CategoryData) => void;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
  CardIcon: string;
  title?: string;
}

const CategoryBoxComponent = ({
  CardIcon,
  items,
  styles,
  editFunction,
  deleteFunction,
  addFunction,
  emptyStateTitle,
  emptyStateMessage,
  title,
}: CategoryBoxComponentProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const getString = t;
  const { selectedRestaurant } = useAppSelector(
    (state) => state.restaurantsData
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={3} sx={{ ...styles.categoryPaper, borderRadius: "24px" }}>
      <Stack direction="column" spacing={2} mb={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "30px 20px 0 20px",
          }}
        >
          <Typography variant="h6">{title}</Typography>

          <Button
            sx={{ ...styles.addButtonCategory }}
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}
          >
            Add
          </Button>
        </Box>
      </Stack>

      {items?.length > 0 ? (
        <>
          <CategoryListView
            items={items}
            editFunction={editFunction}
            deleteFunction={deleteFunction}
            styles={styles}          />
        </>
      ) : (
        <EmptyState
          emptyStateTitle={emptyStateTitle}
          emptyStateMessage={emptyStateMessage}
        />
      )}
      <AddCategoryDialog
        dialogTitle={getString("addCategoryText")}
        errorMessage={getString("addCategoryInfoText")}
        cancelText={getString("cancel")}
        confirmText={getString("add")}
        isDialogOpen={open}
        onCancelClick={handleClose}
        onConfirmClick={addFunction}
        data={selectedRestaurant?.categories}
      />
    </Paper>
  );
};

export default CategoryBoxComponent;
