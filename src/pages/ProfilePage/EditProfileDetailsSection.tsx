import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputComponent from "../../components/InputComponent/InputComponent";
import { UserUpdateData } from "../../DataTypes/UserDataTypes";
import { userUpdate } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks"; // Adjust the import path

const EditProfileDetailsSection = ({
  setIsEditing,
}: {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const { userList, loading } = useAppSelector((state) => state.userData);
  const userData = userList[0];
  const [formData, setFormData] = useState<UserUpdateData>(userData);
  const [severity, setSeverity] = useState<
    "success" | "warning" | "error" | "info"
  >("info");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    setFormData(userData);
  }, [userData]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      setFormData((prevValue) => ({
        ...prevValue,
        billingData: {
          ...prevValue.billingData!,
          phoneNumber: value,
        },
      }));
    } else {
      setFormData((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const isFormDataChanged = (formData: any, userData: any) => {
    if (formData.phoneNumber !== userData.phoneNumber) return true;
    for (const key in formData) {
      if (formData[key] !== userData[key]) {
        return true;
      }
    }
    return false;
  };

  const onSave = () => {
    if (isFormDataChanged(formData, userData)) {
      if (formData.name.length === 0) {
        setToastMessage("Data has not been changed");
        setShowToast(true);
        setSeverity("warning");
        return;
      }
      dispatch(userUpdate({ updatedUser: formData, userId: userData.id })).then(
        (value) => {
          const response = value.payload;
          // Handle API response
          if (response?.body) {
            setToastMessage(response.body);
            setSeverity("success");
          } else if (response?.message) {
            setToastMessage(response.message);
            setSeverity("warning");
          }
          setShowToast(true);
        }
      );
    } else {
      setToastMessage("Data has not been changed");
      setShowToast(true);
      setSeverity("warning");
      return;
    }
  };

  const onCancel = () => {
    setIsEditing(false);
  };

  return (
    <Box>
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
          display: "flex",
          flexDirection: "row",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        <Typography variant="h5"> {getString("editPersonalInfo")}</Typography>
      </Container>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "150px 1fr",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="subtitle1">{getString("userName")} :</Typography>
        <InputComponent
          name="name"
          id="nameField"
          type="Name"
          label=""
          textFieldStyle={{ width: "100%", padding: "0" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={formData.name as string}
          onChange={handleInputChange}
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
          name="email"
          id="emailField"
          type="email"
          label=""
          textFieldStyle={{ width: "100%", padding: "0" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={formData.email as string}
          onChange={handleInputChange}
          disabled={true}
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
          {getString("phonenumber")}
          {" :"}
        </Typography>
        <InputComponent
          name="phoneNumber"
          id="emailField"
          type="phoneNumber"
          label=""
          textFieldStyle={{ width: "100%", padding: "0" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={formData.billingData?.phoneNumber as string}
          onChange={handleInputChange}
        />
      </Container>
      <Container
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          alignItems: "center",
          padding: 0,
          marginTop: 2,
        }}
      >
        <Button
          sx={{ borderRadius: "1rem", marginRight: "2rem" }}
          variant="outlined"
          startIcon={<CloseOutlinedIcon />}
          onClick={onCancel}
        >
          {getString("cancel")}
        </Button>
        <Button
          sx={{
            borderRadius: "1rem",
            backgroundColor: "var(--primary-color)",
            color: "white",
            "&:hover": {
              backgroundColor: "transparent",
              borderColor: "var(--primary-color)",
              //boxShadow: "none",
              color: "var(--primary-color)",
            },
          }}
          variant="outlined"
          startIcon={<DoneOutlineOutlinedIcon />}
          onClick={onSave}
        >
          {getString("save")}
        </Button>
      </Container>
    </Box>
  );
};
export default EditProfileDetailsSection;
