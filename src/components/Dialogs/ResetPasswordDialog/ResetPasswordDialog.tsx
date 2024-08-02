import { SetStateAction, useState } from "react";
import logo from "../../../assets/logo.svg";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import InputComponent from "../../InputComponent/InputComponent";
import { Styles } from "../LogoutDialog/confirmDialog.style";
import { Styles as inputStyles } from "../../../pages/LoginPage/LoginPage.style";
import { resetPassword } from "../../../services/api/userCrud";
import CheckIcon from "@mui/icons-material/Check";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
const ResetPasswordDialog = ({
  isOpen,
  setIsOpen,
  width,
  height,
  resetPasswordToken,
}: {
  isOpen: boolean;
  width: string;
  height: string;
  setIsOpen: (value: SetStateAction<boolean>) => void;
  resetPasswordToken: string;
}) => {
  const [inputFieldValue, setInputfieldValue] = useState<string>("");
  const onClose = () => {
    setIsOpen(false);
  };
  const [severity, setSeverity] = useState<any>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const handleResetPassword = () => {
    const request = resetPassword(inputFieldValue, resetPasswordToken);
    request.then((value) => {
      if (value.status) {
        if (value.status === 500) {
          setSeverity("error");
          setToastMessage(value.message);
          setShowToast(true);
        } else if (value.status === 400) {
          setSeverity("warning");
          setToastMessage(value.message);
          setShowToast(true);
        }
      } else if (typeof value === "string") {
        setSeverity("success");
        setToastMessage(value);
        setShowToast(true);

        setIsOpen(false);
      }
    });
  };
  return (
    <Dialog
      PaperProps={{ sx: { ...Styles.dialog, width: width, height: height } }}
      onClose={onClose}
      open={isOpen}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showToast}
        autoHideDuration={6000}
        onClose={() => {
          setShowToast(false);
        }}
      >
        <Alert
          icon={
            severity === "error" ? (
              <ErrorOutlineOutlinedIcon fontSize="inherit" />
            ) : severity === "success" ? (
              <CheckIcon fontSize="inherit" />
            ) : (
              <WarningAmberOutlinedIcon fontSize="inherit" />
            )
          }
          severity={severity}
        >
          {toastMessage}
        </Alert>
      </Snackbar>

      <DialogContent sx={{ alignContent: "center" }}>
        <img
          style={{ display: "block", margin: "0 auto" }}
          src={logo}
          alt="logo"
        />
        <Typography
          width={"100%"}
          variant="subtitle2"
          textAlign={"center"}
          sx={Styles.subTitle}
        >
          {"Please enter your new Password to reset the password!"}
        </Typography>
        <InputComponent
          id={"newPasswordField"}
          type={"password"}
          label={"New Password"}
          required
          value={inputFieldValue}
          InputPropStyle={{ borderRadius: "1rem" }}
          onChange={(e) => {
            setInputfieldValue(e.target.value);
          }}
          boxStyle={inputStyles.input_box}
          textFieldStyle={inputStyles.inputStyle}
        />

        <Box sx={Styles.actionBox} justifyContent={"center"}>
          <Button
            variant="contained"
            onClick={handleResetPassword}
            sx={Styles.secondaryActionButton}
          >
            {"Reset Password"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordDialog;
