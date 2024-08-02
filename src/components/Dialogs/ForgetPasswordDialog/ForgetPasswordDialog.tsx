import React, { SetStateAction, useState } from "react";
import logo from "../../../assets/logo.svg";
import { Dialog, DialogContent, Typography, Box, Button } from "@mui/material";
import InputComponent from "../../InputComponent/InputComponent";
import { Styles } from "../LogoutDialog/confirmDialog.style";
import { Styles as inputStyles } from "../../../pages/LoginPage/LoginPage.style";

const ForgetPasswordDialog = ({
  isOpen,
  setIsOpen,
  width,
  height,
}: {
  isOpen: boolean;
  width: string;
  height: string;
  setIsOpen: (value: SetStateAction<boolean>) => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const onClose = () => {
    setIsOpen(false);
  };
  const handleResetPassword = () => {
    console.log(email);
  };
  return (
    <Dialog
      PaperProps={{ sx: { ...Styles.dialog, width: width, height: height } }}
      onClose={onClose}
      open={isOpen}
    >
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
          {"Please enter your E-mail to reset your password!"}
        </Typography>
        <InputComponent
          id="emailField"
          type="email"
          label="Email"
          required
          value={email}
          InputPropStyle={{ borderRadius: "1rem" }}
          onChange={(e) => {
            setEmail(e.target.value);
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

export default ForgetPasswordDialog;
