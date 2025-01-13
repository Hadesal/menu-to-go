import { InfoDialog } from "@components/common/Dialogs/Info Dialog/InfoDialog";
import InputComponent from "@components/InputComponent/InputComponent";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { resetActiveTab } from "@redux/slices/mainViewSlice";
import { deleteUser } from "@redux/thunks/userThunks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const DeleteAccount = () => {
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const userData = useAppSelector((selector) => selector?.userData?.user);
  const { loading } = useAppSelector((state) => state.userData);
  const [severity, setSeverity] = useState<
    "success" | "warning" | "error" | "info"
  >("info");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const [deleteText, setDeleteText] = useState("");
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Extracted onClick logic
  const handleDeleteClick = () => {
    dispatch(deleteUser(userData.id))
      .then((value) => {
        const response = value.payload; // response will be a string
        console.log(response);

        if (response === "User deleted successfully") {
          setIsInfoDialogOpen(true);
          return;
        } else if (typeof response === "string") {
          setToastMessage(response);
          setSeverity("error");
        } else {
          setToastMessage("An unknown error occurred");
          setSeverity("error");
        }

        setShowToast(true);
      })
      .catch(() => {
        setToastMessage("An error occurred while deleting the account");
        setSeverity("error");
        setShowToast(true);
      });
  };

  return (
    <>
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

      <InfoDialog
        isDialogOpen={isInfoDialogOpen}
        setIsDialogOpen={setIsInfoDialogOpen}
        title={getString("accountDeletedTitle")}
        message={getString("accountDeletedMessage")}
        closeOnBackdropClick={false}
        onClick={() => {
          navigate("/login");
          dispatch(resetActiveTab());
          localStorage.removeItem("userToken");
          localStorage.removeItem("expireTime");
        }}
      />

      <Container>
        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
          {getString("deleteAccount")}
        </Typography>
        <Typography variant="body1">
          {getString("deleteAccountSubTitle")}
        </Typography>

        <Box sx={{ marginTop: "1rem" }}>
          <Typography variant="caption">
            {getString("confirmDeleteText")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <InputComponent
              id="deleteConfirmation"
              name="deleteConfirmation"
              type="text"
              label=""
              textFieldStyle={{
                width: "100%",
                padding: "0",
                marginTop: "0.5rem",
              }}
              onChange={(e) => {
                setDeleteText(e.target.value);
              }}
              InputPropStyle={{ borderRadius: "0.5rem" }}
              boxStyle={{ width: "50%" }}
              value={deleteText}
            />
            <Button
              variant="contained"
              color="error"
              sx={{
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
              disabled={deleteText !== "DELETE"}
              onClick={handleDeleteClick}
            >
              {getString("deleteAccount")}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
