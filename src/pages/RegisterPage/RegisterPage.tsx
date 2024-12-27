import { Email, Person } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "react-phone-input-2/lib/material.css";
import { useNavigate } from "react-router-dom";
import InputComponent from "../../components/InputComponent/InputComponent";
import { UserSignupDataType } from "../../DataTypes/UserDataTypes";
import { handleSignup } from "../../utils/auth-handlers";
import { Styles } from "./RegisterPage.style";
import { useLanguage } from "src/hooks/useLanguage";
import LanguageMenu from "@components/AppBar/LanguageMenuComponent";
export default function LoginPage() {
  const { getString, currentLanguage } = useLanguage();

  const [userData, setUserData] = useState<UserSignupDataType>({
    name: "",
    email: "",
    password: "",
    agreedTermsAndConditions: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    password: "",
    agreed: false,
  });

  const [lastAttemptedEmail, setLastAttemptedEmail] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  return (
    <Box dir={currentLanguage === "ar" ? "rtl" : ""} sx={Styles.mainBox}>
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
        <Grid item xs={0} md={7} sx={Styles.gridItem2}></Grid>
        <Grid item xs={12} md={5} sx={Styles.gridItem1}>
          <Box sx={Styles.gridWrapperBox}>
            <Box sx={{ position: "absolute", top: 5, right: 10 }}>
              <LanguageMenu hideBorder={true} color="#000000" />
            </Box>
            <Typography
              variant="h4"
              textAlign={"center"}
              sx={Styles.signUpHeading}
            >
              {getString("signUpLabel")}
            </Typography>
            <Typography
              variant="body1"
              textAlign={"center"}
              sx={Styles.signUpWelcomeText}
            >
              {getString("signUpMessage")}
            </Typography>
            <InputComponent
              id="nameField"
              type="name"
              label={getString("name")}
              RightIcon={Person}
              required
              onChange={(e) => {
                setUserData((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
              boxStyle={Styles.inputBox}
              textFieldStyle={Styles.inputStyle}
              error={errorMessages.name ? true : false}
              helperText={errorMessages.name}
            />
            <InputComponent
              id="emailField"
              type="email"
              label={getString("email")}
              RightIcon={Email}
              required
              onChange={(e) => {
                setUserData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
              boxStyle={Styles.inputBox}
              textFieldStyle={Styles.inputStyle}
              error={errorMessages.email ? true : false}
              helperText={errorMessages.email}
            />
            <InputComponent
              id="passwordField"
              required
              type="password"
              label={getString("signInPasswordLabel")}
              boxStyle={Styles.inputBox}
              textFieldStyle={Styles.inputStyle}
              onChange={(e) => {
                setUserData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
              error={errorMessages.password ? true : false}
              helperText={errorMessages.password}
            />

            <Box sx={Styles.checkbox_wrapper}>
              <Checkbox
                sx={{
                  ...Styles.checkbox,
                  color: errorMessages.agreed
                    ? "#d32f2f"
                    : "var(--primary-color)",
                }}
                required
                onChange={(e) => {
                  setUserData((prev) => ({
                    ...prev,
                    agreedTermsAndConditions: e.currentTarget.checked,
                  }));
                }}
              />
              <Typography variant="body2">
                {getString("agreementText")}{" "}
                <Link
                  href=""
                  sx={
                    errorMessages.agreed
                      ? Styles.termsConditionsError
                      : Styles.termsConditions
                  }
                  underline="hover"
                >
                  {getString("termsOfService")}{" "}
                </Link>
                {getString("and")}{" "}
                <Link
                  href=""
                  sx={
                    errorMessages.agreed
                      ? Styles.termsConditionsError
                      : Styles.termsConditions
                  }
                  underline="hover"
                >
                  {getString("termsOfService")}{" "}
                </Link>
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                handleSignup(
                  userData,
                  setErrorMessages,
                  setLastAttemptedEmail,
                  lastAttemptedEmail,
                  setApiError,
                  apiError,
                  setLoading,
                  navigate
                );
              }}
              sx={Styles.button}
            >
              {getString("signUpButtonLabel")}
            </Button>
            <Box sx={Styles.signInBox}>
              <Typography variant="body2" sx={Styles.signInText}>
                {getString("signUpAlreadyHaveAnAccount")}
              </Typography>
              <Button
                variant="text"
                onClick={() => navigate("/login")}
                sx={Styles.signInButton}
              >
                {getString("signInTextLabel")}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
