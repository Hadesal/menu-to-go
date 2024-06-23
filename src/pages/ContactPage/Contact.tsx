import emailjs from "@emailjs/browser";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fab,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InputComponent from "../../components/InputComponent/InputComponent";
import { validateEmail } from "../../utils/validator";
import { Styles } from "./Contact.style";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [formValues, setFormValues] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const sendEmail = () => {
    setLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_REACT_APP_SERVICE_ID,
        import.meta.env.VITE_REACT_APP_TEMPLATE_ID,
        {
          user_name: formValues.name,
          user_email: formValues.email,
          message: formValues.message,
        },
        import.meta.env.VITE_REACT_APP_PUBLIC_ID
      )
      .then(
        () => {
          setLoading(false);
          setToastMessage("Your request has been submitted successfully!");
          setSeverity("success");
          setShowToast(true);
          setFormValues({
            name: "",
            email: "",
            message: "",
          });
        },
        () => {
          setLoading(false);
          setToastMessage("Failed to submit your request. Please try again.");
          setSeverity("error");
          setShowToast(true);
        }
      );
  };

  const handleFormSubmit = () => {
    const errors = {
      name: !formValues.name ? "Please enter your name." : "",
      email: validateEmail(formValues.email),
      message: !formValues.message ? "Message is required." : "",
    };

    setFormErrors(errors);

    const isFormValid = Object.values(errors).every((error) => !error);

    if (isFormValid) {
      sendEmail();
    }
  };

  return (
    <Box sx={Styles.mainContainer}>
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

      <Typography
        color="var(--primary-color)"
        sx={Styles.title}
        textAlign="center"
        variant="h5"
      >
        Contact Us
      </Typography>
      <Typography variant="h6" textAlign="center" sx={Styles.subTitle}>
        Have a question? Feel free to contact us
        <br />
        We are happy to help you!
      </Typography>

      <Box sx={Styles.formWrapper}>
        <Box sx={Styles.formContainer}>
          <InputComponent
            id="name"
            type="name"
            label="Name"
            InputPropStyle={Styles.InputPropStyle}
            required
            textFieldStyle={Styles.textFieldStyle}
            boxStyle={Styles.textFieldBoxStyle}
            onChange={handleInputChange}
            error={Boolean(formErrors.name)}
            helperText={formErrors.name}
            value={formValues.name}
          />
          <InputComponent
            id="email"
            type="email"
            label="Email"
            InputPropStyle={Styles.InputPropStyle}
            required
            textFieldStyle={Styles.textFieldStyle}
            boxStyle={Styles.textFieldBoxStyle}
            onChange={handleInputChange}
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
            value={formValues.email}
          />
        </Box>
      </Box>
      <TextField
        id="message"
        label="Message"
        multiline
        required
        rows={8}
        sx={Styles.textArea}
        variant="outlined"
        value={formValues.message}
        onChange={handleInputChange}
        error={Boolean(formErrors.message)}
        helperText={formErrors.message}
      />

      <Button variant="contained" sx={Styles.button} onClick={handleFormSubmit}>
        Submit Message
      </Button>

      <Fab color="primary" aria-label="call" sx={Styles.callBtn}>
        <PhoneIcon />
      </Fab>
    </Box>
  );
}
