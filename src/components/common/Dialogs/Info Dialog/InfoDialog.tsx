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
}

export const InfoDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  message,
}: IInfoDialog) => {
  const dispatch = useAppDispatch();

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
      <DialogTitle id="alert-dialog-title">Info</DialogTitle>

      <DialogContent>
        <p>{message}</p>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setIsDialogOpen(false);
            dispatch(clearProductActionErrorMessage());
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
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
