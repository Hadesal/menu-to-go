// ToastNotification.tsx
import { Alert, Snackbar } from "@mui/material";

interface ToastNotificationProps {
  message: string | null;
  severity: "success" | "error";
  show: boolean;
  onClose: () => void;
}

const ToastNotification = ({
  message,
  severity,
  show,
  onClose,
}: ToastNotificationProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={show}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
