import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import PhoneInput from "react-phone-input-2";
import "./ProfilePage.css";
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

// Define props interface
interface EditProfileDetailsSectionProps {
  setToastVisible: Dispatch<SetStateAction<boolean>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}
const EditProfileDetailsSection = ({
  setToastVisible,
  setIsEditing,
}: EditProfileDetailsSectionProps) => {
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
    console.log(value);
    if (name === "") {
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

  const isFormDataChanged = (
    formData: UserUpdateData,
    userData: UserUpdateData
  ) => {
    if (formData.billingData?.phoneNumber !== userData.billingData?.phoneNumber)
      return true;
    for (const key in formData) {
      if (formData[key] !== userData[key]) {
        return true;
      }
    }
    return false;
  };

  const onSave = () => {
    if (isFormDataChanged(formData, userData)) {
      if (formData.name.trim().length === 0) {
        setToastMessage("User name cannot be empty");
        setShowToast(true);
        setSeverity("warning");
        return;
      }
      // Updated regex to match either "+" or country codes like +20, +43, etc.
      const onlyCountryCode = /^\+(\d+)?$/;

      // Check if phone number is only a "+" or a country code and set it to an empty string
      const updatedPhoneNumber = onlyCountryCode.test(
        formData.billingData?.phoneNumber || ""
      )
        ? ""
        : formData.billingData?.phoneNumber;

      // Update formData with the cleaned phone number before saving
      const updatedFormData = {
        ...formData,
        billingData: {
          ...formData.billingData,
          phoneNumber: updatedPhoneNumber,
        },
      };

      dispatch(
        userUpdate({ updatedUser: updatedFormData, userId: userData.id })
      ).then((value) => {
        const response = value.payload;
        // Handle API response
        if (!response.message) {
          setToastVisible(true);
          onCancel();
        } else {
          let errorMessage = response.message;
          if (response.status === 500) {
            errorMessage = getString("updateUserError");
          } else if (response.message === "User not found") {
            errorMessage = getString("userNotFound");
          }

          setToastMessage(errorMessage);
          setSeverity("error");
        }
        setShowToast(true);
      });
    } else {
      setToastMessage(getString("dataNotChanged"));
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
          marginTop: "0.5rem",
        }}
      >
        <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
          {getString("userName")}
        </Typography>
        <InputComponent
          name="name"
          id="nameField"
          type="Name"
          label=""
          textFieldStyle={{ width: "100%", padding: "0", marginTop: "0.5rem" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={formData.name as string}
          onChange={handleInputChange}
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
          name="email"
          id="emailField"
          type="email"
          label=""
          textFieldStyle={{ width: "100%", padding: "0", marginTop: "0.5rem" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={formData.email as string}
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
        <PhoneInput
          country=""
          enableAreaCodes={true}
          value={formData.billingData?.phoneNumber as string}
          onChange={(_, __, ___, formattedValue) => {
            setFormData((prevValue) => ({
              ...prevValue,
              billingData: {
                ...prevValue.billingData!,
                phoneNumber: formattedValue,
              },
            }));
          }}
          specialLabel=""
          containerStyle={{
            marginTop: "0.5rem",
          }}
          inputStyle={{
            width: "100%",
          }}
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
