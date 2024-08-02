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
      <Container>
        <Typography sx={{ marginLeft: "1vw", color: "#797979" }} variant="h5">
          {getString("changePassword")}
        </Typography>
        <Divider variant="middle" component={"h5"} />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "1rem",
          marginTop: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          variant="outlined"
          value={formData.currentPassword}
          label={getString("oldPassword")}
          name="currentPassword"
          autoComplete="password"
          onChange={handleInputChange}
          sx={{
            width: "45vw",
            marginTop: "1rem",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "0.8rem",
              },
            },
          }}
        />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "2rem",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <TextField
          variant="outlined"
          value={formData.newPassword}
          label={getString("newPassword")}
          name="newPassword"
          autoComplete="password"
          onChange={handleInputChange}
          sx={{
            width: "45vw",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "0.8rem",
              },
            },
          }}
        />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "1rem",
          alignItems: "center",
          justifyContent: "end",
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
          sx={{ borderRadius: "1rem", marginRight: "2rem" }}
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
