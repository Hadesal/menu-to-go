import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { useState } from "react";
import SignUpImage from "../../assets/signup.jpg";
import InputComponent from "../../components/InputComponent/InputComponent";
import { UserSignInData } from "../../DataTypes/UserDataTypes";
import { handleSignIn } from "../../utils/Validators";
import { Styles } from "./LoginPage.style";

export default function LoginPage() {
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

  const [userData, setUserData] = useState<UserSignInData>({
    email: "",
    password: "",
  });

  return (
    <Box sx={Styles.wrapper_box}>
      <Grid container sx={Styles.grid}>
        <Grid item xs={12} sm={6} md={5} sx={Styles.grid_item_1}>
          <Box sx={{ width: "100%", maxWidth: 400 }}>
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
              id="nameField"
              label="Email"
              type="text"
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
            <Link href="#" underline="hover" sx={Styles.forget_password_link}>
              Forget Password!
            </Link>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                handleSignIn(userData, setErrorMessages);
              }}
              sx={Styles.button}
            >
              Sign in
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={Styles.register_text}
            >
              Not Registered?{" "}
              <Link href="/register" underline="hover" sx={Styles.sign_up_link}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={0} sm={6} md={7} sx={Styles.grid_item_2}>
          <img src={SignUpImage} alt="SignUpImage" />
        </Grid>
      </Grid>
    </Box>
  );
}
