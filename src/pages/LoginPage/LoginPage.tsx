import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSignInData } from "../../DataTypes/UserDataTypes";
import InputComponent from "../../components/InputComponent/InputComponent";
import { handleSignIn } from "../../utils/auth-handlers";
import { Styles } from "./LoginPage.style";
import { Email } from "@mui/icons-material";

export default function LoginPage() {
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

  const [userData, setUserData] = useState<UserSignInData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <Box sx={Styles.mainBox}>
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
            <Link href="" underline="hover" sx={Styles.forget_password_link}>
              Forget Password!
            </Link>
            <Button
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
