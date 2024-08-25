import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSignInData } from "../../DataTypes/UserDataTypes";
import InputComponent from "../../components/InputComponent/InputComponent";
import { handleSignIn } from "../../utils/auth-handlers";
import { Styles } from "./LoginPage.style";
import { Email } from "@mui/icons-material";
import ForgetPasswordDialog from "../../components/Dialogs/ForgetPasswordDialog/ForgetPasswordDialog";
import ResetPasswordDialog from "../../components/Dialogs/ResetPasswordDialog/ResetPasswordDialog";
import CheckIcon from "@mui/icons-material/Check";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
export default function LoginPage() {
  const [pathToken, setPathToken] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [severity, setSeverity] = useState<any>("");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] =
    useState<boolean>(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<UserSignInData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("signInButton")?.click();
    }
  };
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (token) {
      setPathToken(token);
      setIsResetPasswordOpen(true);
    }
    const message = query.get("message");
    if (message) {
      const messageToShow = message.split("_").join(" ");
      if (messageToShow.endsWith("successful")) {
        setSeverity("success");
        setToastMessage(messageToShow);
        setShowToast(true);
      } else if (messageToShow.endsWith("token")) {
        setSeverity("warning");
        setToastMessage(messageToShow);
        setShowToast(true);
      } else if (messageToShow.endsWith("expired")) {
        setSeverity("error");
        setToastMessage(messageToShow);
        setShowToast(true);
      }
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <Box sx={Styles.mainBox}>
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
      <Backdrop
        sx={{
          color: "var(--primary-color)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container sx={Styles.grid}>
        <Grid item xs={12} md={5} sx={Styles.grid_item_1}>
          <Box sx={Styles.grid1WrapperBox}>
            <Typography
              variant="h4"
              textAlign={"center"}
              sx={Styles.sign_in_heading}
            >
              Sign in
            </Typography>
            <Typography
              variant="body1"
              textAlign={"center"}
              sx={Styles.sign_in_welcome_text}
            >
              Hi Welcome Back, You’ve been Missed
            </Typography>

            <InputComponent
              id="emailField"
              type="email"
              label="Email"
              RightIcon={Email}
              error={errorMessages.email ? true : false}
              helperText={errorMessages.email}
              required
              boxStyle={Styles.input_box}
              textFieldStyle={Styles.inputStyle}
              onChange={(e) => {
                setUserData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
            />
            <InputComponent
              id="passwordField"
              required
              type="password"
              label="Password"
              textFieldStyle={Styles.inputStyle}
              boxStyle={Styles.input_box}
              onChange={(e) => {
                setUserData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
              error={errorMessages.password ? true : false}
              helperText={errorMessages.password}
            />
            <Button
              variant="text"
              sx={Styles.forget_password_link}
              onClick={() => {
                setIsForgetPasswordOpen(true);
              }}
            >
              Forget Password!
            </Button>
            <ForgetPasswordDialog
              isOpen={isForgetPasswordOpen}
              setIsOpen={setIsForgetPasswordOpen}
              height="50vh"
              width="60vw"
            />
            <ResetPasswordDialog
              isOpen={isResetPasswordOpen}
              setIsOpen={setIsResetPasswordOpen}
              height="50vh"
              width="60vw"
              resetPasswordToken={pathToken}
            />
            <Button
              id="signInButton"
              variant="contained"
              fullWidth
              onClick={() => {
                handleSignIn(userData, setErrorMessages, setLoading, navigate);
              }}
              sx={Styles.button}
            >
              Sign in
            </Button>
            <Box sx={Styles.signUpBox}>
              <Typography variant="body2" sx={Styles.signUpText}>
                Don't have an account?
              </Typography>
              <Button
                variant="text"
                onClick={() => navigate("/register")}
                sx={Styles.signUpButton}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={0} md={7} sx={Styles.grid_item_2}></Grid>
      </Grid>
    </Box>
  );
}
