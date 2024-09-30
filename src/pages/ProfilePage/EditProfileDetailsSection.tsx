/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { UserDataType } from "../../DataTypes/UserDataTypes";
import { updateUser } from "../../redux/thunks/userThunks";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { defaultUserData } from "@constants/defaultObjects";

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
  const { user, loading } = useAppSelector((state) => state.userData);

  const [formData, setFormData] = useState<UserDataType>(
    user ?? defaultUserData
  );
  const [severity, setSeverity] = useState<
    "success" | "warning" | "error" | "info"
  >("info");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    setFormData(user!);
  }, [user]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
    formData: UserDataType,
    userData: UserDataType
  ) => {
    if (formData.billingData?.phoneNumber !== userData.billingData?.phoneNumber)
      return true;

    for (const key of Object.keys(formData) as (keyof UserDataType)[]) {
      if (formData[key] !== userData[key]) {
        return true;
      }
    }
    return false;
  };
  function isUserDataType(response: any): response is UserDataType {
    return typeof response === "object" && "id" in response;
  }
  const onSave = () => {
    if (user && isFormDataChanged(formData, user)) {
      if (formData.name.trim().length === 0) {
        setToastMessage("User name cannot be empty");
        setShowToast(true);
        setSeverity("warning");
        return;
      }
      const onlyCountryCode = /^\+(\d+)?$/;

      const updatedPhoneNumber = onlyCountryCode.test(
        formData.billingData?.phoneNumber || ""
      )
        ? ""
        : formData.billingData?.phoneNumber;

      const updatedFormData = {
        ...formData,
        billingData: {
          ...formData.billingData,
          phoneNumber: updatedPhoneNumber,
        },
      };

      dispatch(
        updateUser({ updatedUser: updatedFormData, userId: user!.id })
      ).then((value) => {
        const response = value.payload;

        if (typeof response === "string") {
          setToastMessage(response);
          setSeverity("error");
        } else if (isUserDataType(response)) {
          setToastVisible(true);
          onCancel();
        } else {
          const errorMessage =
            (response as any)?.message || getString("unknownError");
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
