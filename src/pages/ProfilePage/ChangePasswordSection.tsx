import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ChangePasswordDataType } from "../../DataTypes/UserDataTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { useAppDispatch, useAppSelector } from "../../utils/hooks"; // Adjust the import path
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { userUpdatePassword } from "../../redux/slices/userSlice";
import CheckIcon from "@mui/icons-material/Check";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InputComponent from "../../components/InputComponent/InputComponent";

const ChangePasswordSection = ({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<String>>;
}) => {
  const { userList } = useAppSelector((state) => state.userData);
  const userData = userList[0];
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ChangePasswordDataType>({
    currentPassword: "",
    newPassword: "",
  });
  const [severity, setSeverity] = useState<any>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  useEffect(() => {}, [userList]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(
      userUpdatePassword({
        updatePasswordObject: formData,
        userId: userData.id,
      })
    ).then((value) => {
      const response = value.payload;
      if (response?.body) {
        setToastMessage(response.body);
        setSeverity("success");
        setShowToast(true);
        setActiveTab("profileDetails");
      } else if (response?.message) {
        setToastMessage(response.message);
        setSeverity("warning");
        setShowToast(true);
      }
    });
  };
  const onCancel = () => {
    setActiveTab("profileDetails");
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showToast}
        autoHideDuration={6000}
        onClose={() => {
          setShowToast(false);
        }}
      >
        <Alert
          icon={
            severity === "error" ? (
              <ErrorOutlineOutlinedIcon fontSize="inherit" />
            ) : severity === "success" ? (
              <CheckIcon fontSize="inherit" />
            ) : (
              <WarningAmberOutlinedIcon fontSize="inherit" />
            )
          }
          severity={severity}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h5"> {getString("changePassword")}</Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="subtitle1" sx={{ width: "15%", flexShrink: 0 }}>
          {getString("oldPassword")} :
        </Typography>
        <InputComponent
          name="currentPassword"
          id="currentPasswordField"
          type="password"
          label=""
          textFieldStyle={{ width: "100%", padding: "0" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={formData.currentPassword as string}
          onChange={handleInputChange}
        />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="subtitle1" sx={{ width: "15%", flexShrink: 0 }}>
          {getString("newPassword")} :
        </Typography>
        <InputComponent
          name="newPassword"
          id="newPasswordField"
          type="password"
          label=""
          textFieldStyle={{ width: "100%", padding: "0" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={formData.newPassword as string}
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
          onClick={onCancel}
          startIcon={<CloseOutlinedIcon />}
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
          onClick={handleSave}
        >
          {getString("save")}
        </Button>
      </Container>
    </Box>
  );
};

export default ChangePasswordSection;
