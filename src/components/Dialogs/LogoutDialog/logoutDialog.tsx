import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import logoutImage from "../../../assets/logoutImg.svg";
import { Styles } from "./logoutDialog.style";

interface LogoutDialogProps {
  isOpen: boolean;
  onLogoutClick: () => void;
  onCancelClick: () => void;
}

const LogoutDialog = ({
  isOpen,
  onLogoutClick,
  onCancelClick,
}: LogoutDialogProps) => {
  const handleCancel = () => onCancelClick();
  const handleLogout = () => onLogoutClick();

  return (
    <Dialog
      PaperProps={{ sx: Styles.dialog }}
      onClose={handleCancel}
      open={isOpen}
    >
      <DialogContent sx={{ alignContent: "center" }}>
        <img
          src={logoutImage}
          alt="Logout Image"
          style={{ display: "block", margin: "0 auto" }}
          width={170}
          height={211}
        />
        <Typography
          width={"100%"}
          variant="h6"
          textAlign={"center"}
          sx={Styles.title}
        >
          Are You Logging Out?
        </Typography>
        <Typography
          width={"100%"}
          variant="subtitle2"
          textAlign={"center"}
          sx={Styles.subTitle}
        >
          You can always log back in at any time.
        </Typography>
        <Box sx={Styles.actionBox} justifyContent={"center"}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={Styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={Styles.logoutButton}
          >
            Logout
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
