import { Email } from "@mui/icons-material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Box, Button, Checkbox, Grid, Link, Typography } from "@mui/material";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useNavigate } from "react-router-dom";
import InputComponent from "../../components/InputComponent/InputComponent";
import { CountryData, UserSignupData } from "../../DataTypes/UserDataTypes";
import { handleSignup } from "../../utils/Validators";
import { Styles } from "./RegisterPage.style";
import style from "./styles.module.css";
export default function LoginPage() {
  const [userData, setUserData] = useState<UserSignupData>({
    userFullName: "",
    email: "",
    phone: { number: "", country: "" },
    password: "",
    rePassword: "",
    image: "",
    agreedTermsAndConditions: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    rePassword: "",
    agreed: false,
    fullName: "",
    phone: "",
  });

  const navigate = useNavigate();

  return (
    <Box sx={Styles.mainBox}>
      <Grid container sx={Styles.grid}>
        <Grid item xs={12} sm={6} md={5} sx={Styles.gridItem1}>
          <Box sx={Styles.gridWrapperBox}>
            <Typography
              variant="h4"
              textAlign={"center"}
              sx={Styles.signUpHeading}
            >
              Sign up
            </Typography>
            <Typography
              variant="body1"
              textAlign={"center"}
              sx={Styles.signUpWelcomeText}
            >
              Welcome! Join us and start your journey today.
            </Typography>
            <InputComponent
              id="nameField"
              RightIcon={PersonRoundedIcon}
              label="Full Name"
              type="text"
              error={errorMessages.fullName ? true : false}
              helperText={errorMessages.fullName}
              required
              boxStyle={Styles.inputBox}
              textFieldStyle={Styles.inputStyle}
              onChange={(e) => {
                setUserData((prevState) => ({
                  ...prevState,
                  userFullName: e.target.value,
                }));
              }}
            />
            <Box sx={Styles.phoneBox}>
              <PhoneInput
                inputClass={
                  errorMessages.phone.length > 2
                    ? style.phoneInputError
                    : style.phoneInput
                }
                placeholder={
                  errorMessages.phone.length > 2
                    ? errorMessages.phone
                    : "Phone Number"
                }
                specialLabel=""
                inputStyle={Styles.phoneInputStyle}
                onChange={(value, data: CountryData) => {
                  setUserData((prevState) => ({
                    ...prevState,
                    phone: {
                      ...prevState.phone,
                      country: data?.name || "",
                      number: value,
                    },
                  }));
                }}
              />
            </Box>
            <InputComponent
              id="emailField"
              type="email"
              label="Email"
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
              label="Password"
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
            <InputComponent
              id="rePasswordField"
              required
              type="password"
              label="re-Password"
              boxStyle={Styles.inputBox}
              textFieldStyle={Styles.inputStyle}
              onChange={(e) => {
                setUserData((prevState) => ({
                  ...prevState,
                  rePassword: e.target.value,
                }));
              }}
              error={errorMessages.rePassword ? true : false}
              helperText={errorMessages.rePassword}
            />
            <Box sx={Styles.checkbox}>
              <Checkbox
                required
                onChange={(e) => {
                  setUserData((prev) => ({
                    ...prev,
                    agreedTermsAndConditions: e.currentTarget.checked,
                  }));
                }}
              />
              <Typography
                variant="overline"
                sx={
                  errorMessages.agreed
                    ? Styles.termsConditionsError
                    : Styles.termsConditions
                }
              >
                I agree to the{" "}
                <Link href="#" underline="hover">
                  terms and conditions
                </Link>
                *
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                handleSignup(userData, setErrorMessages);
              }}
              sx={Styles.button}
            >
              Sign up
            </Button>
            <Box sx={Styles.signInBox}>
              <Typography variant="body2" sx={Styles.signInText}>
                Already have an account?
              </Typography>
              <Button
                variant="text"
                onClick={() => navigate("/login")}
                sx={Styles.signInButton}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={0} sm={6} md={7} sx={Styles.gridItem2}></Grid>
      </Grid>
    </Box>
  );
}
