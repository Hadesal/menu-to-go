import {
  Phone,
  SentimentDissatisfied,
  SentimentSatisfied,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
} from "@mui/icons-material";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fab,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InputComponent from "../../components/InputComponent/InputComponent";
import { validateEmail } from "../../utils/validator";
import { Styles } from "./Form.styles";

interface FormProps {
  feedback: boolean;
  title: React.ReactNode; // Allow JSX elements
  subTitle: React.ReactNode; // Allow JSX elements
  textFiledLabel: string;
  loading: boolean;
  handleSubmit: (
    formValues: FormData,
    setFormValuesLocal: React.Dispatch<React.SetStateAction<FormData>>
  ) => void;
  toastMessage: string;
  showToast: boolean;
  severity: "success" | "error";
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormData {
  name?: string;
  email?: string;
  message: string;
  sentiments?: string;
}

const sentiments = [
  { name: "Awful", icon: SentimentVeryDissatisfied },
  { name: "Bad", icon: SentimentDissatisfied },
  { name: "Good", icon: SentimentSatisfied },
  { name: "Great", icon: SentimentVerySatisfied },
];

export default function Form({
  feedback,
  title,
  subTitle,
  textFiledLabel,
  loading,
  severity,
  showToast,
  toastMessage,
  handleSubmit,
  setShowToast,
}: FormProps) {
  const [formValuesLocal, setFormValuesLocal] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    sentiments: "",
  });

  const [formErrors, setFormErrors] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    //sentiments: "",
  });

  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(
    null
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValuesLocal((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleFormSubmit = () => {
    let errors: FormData = {
      message: "",
    };

    if (feedback) {
      errors = {
        message: !formValuesLocal.message ? "Message is required." : "",
        // sentiments: !formValuesLocal.sentiments
        //   ? "Please select a sentiment."
        //   : "",
      };
    } else {
      errors = {
        name: !formValuesLocal.name ? "Please enter your name." : "",
        email: validateEmail(
          formValuesLocal.email !== undefined ? formValuesLocal.email : ""
        ),
        message: !formValuesLocal.message ? "Message is required." : "",
      };
    }

    setFormErrors(errors); // Cast to any to avoid TypeScript error

    const isFormValid = Object.values(errors).every((error) => !error);

    if (isFormValid) {
      handleSubmit(
        {
          ...formValuesLocal,
          sentiments: selectedSentiment !== null ? selectedSentiment : "",
        },
        setFormValuesLocal
      );
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
        {title}
      </Typography>
      <Typography variant="h6" textAlign="center" sx={Styles.subTitle}>
        {subTitle}
      </Typography>

      <Box sx={Styles.formWrapper}>
        {feedback && (
          <Stack
            direction="row"
            justifyContent="center"
            spacing={10}
            mt={2}
            mb={4}
          >
            {sentiments.map((sentiment) => {
              const Icon = sentiment.icon;
              return (
                <Box
                  id="sentiments"
                  sx={{
                    cursor: "pointer",
                    textAlign: "center",
                    color:
                      selectedSentiment === sentiment.name
                        ? "var(--primary-color)"
                        : "inherit",
                  }}
                  key={sentiment.name}
                  onClick={() => setSelectedSentiment(sentiment.name)}
                >
                  <Icon style={{ fontSize: 48 }} />
                  <Typography textAlign="center" variant="body1">
                    {sentiment.name}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        )}
        {!feedback && (
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
              value={formValuesLocal.name}
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
              value={formValuesLocal.email}
            />
          </Box>
        )}
      </Box>
      <TextField
        id="message"
        label="Message"
        placeholder={textFiledLabel}
        multiline
        required
        rows={8}
        sx={Styles.textArea}
        variant="outlined"
        value={formValuesLocal.message}
        onChange={handleInputChange}
        error={Boolean(formErrors.message)}
        helperText={formErrors.message}
      />

      <Button variant="contained" sx={Styles.button} onClick={handleFormSubmit}>
        Submit Message
      </Button>

      {!feedback && (
        <Fab color="primary" aria-label="call" sx={Styles.callBtn}>
          <Phone />
        </Fab>
      )}
    </Box>
  );
}
