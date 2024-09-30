import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useAppSelector } from "../../redux/reduxHooks";
import EditProfileDetailsSection from "./EditProfileDetailsSection";

const ProfileDetailsSection = () => {
  const { user } = useAppSelector((state) => state.userData);
  const { t } = useTranslation();
  const getString = t;
  useEffect(() => {}, [user]);

  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  if (isEditing) {
    return (
      <EditProfileDetailsSection
        setToastVisible={setShowToast}
        setIsEditing={setIsEditing}
      />
    );
  }
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showToast}
        autoHideDuration={6000}
        onClose={() => setShowToast(false)}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {getString("userUpdateSuccess")}
        </Alert>
      </Snackbar>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">
          {getString("profileDetailsButton")}
        </Typography>
        <Button
          sx={{ borderRadius: "1rem" }}
          variant="outlined"
          startIcon={<EditOutlinedIcon />}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {getString("edit")}
        </Button>
      </Container>

      <Container
        sx={{
          marginTop: "0.5rem",
        }}
      >
        <Typography variant="subtitle1">{getString("userName")} :</Typography>
        <InputComponent
          id="nameField"
          type="Name"
          label=""
          readOnly={true}
          textFieldStyle={{ width: "100%", padding: "0" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={user?.name}
        />
      </Container>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "150px 1fr",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="subtitle1">
          {getString("email")}
          {" :"}
        </Typography>
        <InputComponent
          id="nameField"
          type="Name"
          label=""
          readOnly={true}
          textFieldStyle={{ width: "100%", padding: "0", marginTop: "0.5rem" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={user?.name}
          disabled={true}
        />
      </Container>
      <Container
        sx={{
          marginTop: "0.5rem",
        }}
      >
        <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
          {getString("email")}
        </Typography>
        <InputComponent
          id="nameField"
          type="Name"
          label=""
          readOnly={true}
          textFieldStyle={{ width: "100%", padding: "0", marginTop: "0.5rem" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={user?.email}
          disabled={true}
        />
      </Container>

      <Container
        sx={{
          marginTop: "0.5rem",
        }}
      >
        <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
          {getString("phonenumber")}
        </Typography>
        <InputComponent
          id="nameField"
          type="Name"
          label=""
          readOnly={true}
          textFieldStyle={{ width: "100%", padding: "0", marginTop: "0.5rem" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={user?.billingData?.phoneNumber?.trim()}
          disabled={true}
        />
      </Container>
    </Box>
  );
};
export default ProfileDetailsSection;
