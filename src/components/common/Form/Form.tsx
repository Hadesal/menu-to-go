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
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Styles } from "./Form.styles";
import { useTranslation } from "react-i18next";

interface FormProps {
  feedback: boolean;
  title: React.ReactNode;
  subTitle: React.ReactNode;
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
  typeOfInquiry?: string;
}


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
  const { t } = useTranslation();
  const getString = t;
  const [formValuesLocal, setFormValuesLocal] = useState<FormData>({
    message: "",
    sentiments: "",
    typeOfInquiry: "General Inquiry",
  });
  
  const [formErrors, setFormErrors] = useState<FormData>({
    message: "",
  });
  
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(
    null
  );
  
  const sentiments = [
    { name: getString("sentimentAwful") , icon: SentimentVeryDissatisfied },
    { name: getString("sentimentBad"), icon: SentimentDissatisfied },
    { name: getString("sentimentGood"), icon: SentimentSatisfied },
    { name: getString("sentimentGreat"), icon: SentimentVerySatisfied },
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValuesLocal((prevValues) => ({
      ...prevValues,
      [id]: value.trimStart(),
    }));
  };

  const handleFormSubmit = () => {
    let errors: FormData = {
      message: "",
    };

    if (feedback) {
      errors.message = !formValuesLocal.message.trim()
        ? "Message is required."
        : "";
    } else {
      errors = {
        message: !formValuesLocal.message ? "Message is required." : "",
      };
    }

    setFormErrors(errors);

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
        <Box sx={Styles.selectWrapper}>
          <InputLabel sx={Styles.selectLabel} id="select-label">
            {getString("TypeofInquiry")}
          </InputLabel>
          <Select
            sx={Styles.select}
            labelId="select-label"
            id="typeOfInquiry"
            value={formValuesLocal.typeOfInquiry}
            onChange={(event) => {
              setFormValuesLocal((prevValues) => ({
                ...prevValues,
                typeOfInquiry: event.target.value,
              }));
              setSelectedSentiment("");
            }}
          >
            <MenuItem value={"General Inquiry"}>
              {getString("GeneralInquiry")}
            </MenuItem>
            <MenuItem value={"Feedback"}>{getString("Feedback")}</MenuItem>
            <MenuItem value={"Feature Request"}>
              {getString("FeatureRequest")}
            </MenuItem>
            <MenuItem value={"Bug Report"}>{getString("BugReport")}</MenuItem>
          </Select>
        </Box>
        {formValuesLocal.typeOfInquiry === "Feedback" && (
          <Stack
            direction="row"
            justifyContent="center"
            spacing={10}
            mt={5}
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
      </Box>
      <TextField
        id="message"
        label={getString("contactFormMessage")}
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
        {getString("SubmitMessage")}
      </Button>

      {!feedback && (
        <Fab color="primary" aria-label="call" sx={Styles.callBtn}>
          <Phone />
        </Fab>
      )}
    </Box>
  );
}
