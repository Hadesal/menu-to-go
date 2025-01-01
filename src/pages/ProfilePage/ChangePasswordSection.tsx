import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import InputComponent from "../../components/InputComponent/InputComponent";
import { UpdatePasswordDataType } from "../../DataTypes/UserDataTypes";
import { updateUserPassword } from "../../redux/thunks/userThunks";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";

const ChangePasswordSection = () => {
  const { user, loading } = useAppSelector((state) => state.userData);

  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();

  // Separate state for form data and errors
  const [formData, setFormData] = useState<UpdatePasswordDataType>({
    currentPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [severity, setSeverity] = useState<
    "success" | "warning" | "error" | "info"
  >("info");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  // Handle input field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (value.length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    } else
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]:
          name === "currentPassword"
            ? "Please enter current password"
            : "Please enter new password",
      }));
  };

  // Validate form fields and return error messages
  const validatePasswordForm = () => {
    const validationErrors: { [key: string]: string } = {};

    if (formData.currentPassword.length === 0) {
      validationErrors.currentPassword = "Please enter current password";
    }

    if (formData.newPassword.length === 0) {
      validationErrors.newPassword = "Please enter new password";
    } else if (formData.newPassword === formData.currentPassword) {
      validationErrors.newPassword =
        "New password cannot be the same as the current password";
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSave = () => {
    const passwordErrors = validatePasswordForm();

    // If there are validation errors, update state and exit
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }

    // Proceed with password update
    dispatch(
      updateUserPassword({
        updatePasswordObject: formData,
        userId: user!.id,
      })
    ).then((value) => {
      const response = value.payload;

      // Handle API response
      if (typeof response === "string") {
        setToastMessage(response);
        setSeverity("success");
        onReset();
      } else {
        const errorMessage =
          (response as unknown as { message?: string })?.message ||
          getString("unknownError");
        setToastMessage(errorMessage);
        setSeverity("error");
      }
      setShowToast(true);
    });
  };

  // Reset form data and errors
  const onReset = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
    });
    setErrors({});
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Backdrop
        sx={{
          color: "var(--primary-color)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showToast}
        autoHideDuration={6000}
        onClose={() => setShowToast(false)}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>

      <Container
        sx={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">{getString("changePassword")}</Typography>
      </Container>

      <Container
        sx={{
          marginTop: "0.5rem",
        }}
      >
        <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
          {getString("oldPassword")}
        </Typography>
        <InputComponent
          name="currentPassword"
          id="currentPasswordField"
          type="password"
          label=""
          value={formData.currentPassword as string}
          onChange={handleInputChange}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword}
          textFieldStyle={{ width: "100%", padding: "0", marginTop: "0.5rem" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
        />
      </Container>

      <Container
        sx={{
          marginTop: "0.5rem",
        }}
      >
        <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
          {getString("newPassword")}
        </Typography>
        <InputComponent
          name="newPassword"
          id="newPasswordField"
          type="password"
          label=""
          value={formData.newPassword as string}
          onChange={handleInputChange}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          textFieldStyle={{ width: "100%", padding: "0", marginTop: "0.5rem" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
        />
      </Container>

      <Container sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}>
        <Button
          sx={{ borderRadius: "1rem", marginRight: "1rem" }}
          variant="outlined"
          onClick={onReset}
        >
          {getString("reset")}
        </Button>
        <Button
          sx={{
            borderRadius: "1rem",
            backgroundColor: "var(--primary-color)",
            color: "white",
            "&:hover": {
              backgroundColor: "transparent",
              borderColor: "var(--primary-color)",
              color: "var(--primary-color)",
            },
          }}
          variant="outlined"
          onClick={handleSave}
        >
          {getString("changePassword")}
        </Button>
      </Container>
    </Box>
  );
};

export default ChangePasswordSection;
