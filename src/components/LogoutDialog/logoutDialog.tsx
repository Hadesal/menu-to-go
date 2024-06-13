import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import logoutImg from "../../assets/logoutImg.svg";
import { Styles } from "./logoutDialog.style";
interface LogoutDialogProps {
  showDialog: boolean;
  onLogout: () => void;
  onCancel: () => void;
}

export default function LogoutDialog({
  showDialog,
  onLogout,
  onCancel,
}: LogoutDialogProps) {
  return (
    <Dialog
      sx={{
        borderRadius: "32px", // Set the desired border radius
        "& .MuiDialog-paper": {
          // This targets the dialog paper (the actual dialog box)
          width: "580px",
          height: "500px",
          borderRadius: "32px",
        },
      }}
      onClose={() => onCancel()}
      open={showDialog}
    >
      <DialogContent sx={{ alignContent: "center" }}>
        <img
          style={{ display: "block", margin: "0 auto" }}
          width={170}
          height={211}
          src={logoutImg}
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
          You can always log back in at any time
        </Typography>
        <Box sx={Styles.actionBox} justifyContent={"center"}>
          <Button
            variant="outlined"
            onClick={() => {
              onCancel();
            }}
            sx={Styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onLogout();
            }}
            sx={Styles.logoutButton}
          >
            logout
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
