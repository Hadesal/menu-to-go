import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useAppDispatch } from "@redux/reduxHooks";
import { clearProductActionErrorMessage } from "@redux/slices/restaurantsSlice";
import { Dispatch, SetStateAction } from "react";

interface IInfoDialog {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  title?: string;
  onClick?: () => void; // Optional onClick prop
  closeOnBackdropClick?: boolean; // Optional prop to control backdrop click behavior
}

export const InfoDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  message,
  title = "Info",
  onClick, // Optional onClick prop
  closeOnBackdropClick = true, // Default to closing on backdrop click
}: IInfoDialog) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setIsDialogOpen(false);
    dispatch(clearProductActionErrorMessage());
  };

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
      onClose={closeOnBackdropClick ? handleClose : undefined} // Handle backdrop click based on prop
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <p>{message}</p>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={onClick || handleClose} // Use the passed onClick or default to handleClose
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
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
