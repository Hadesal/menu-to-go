import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { Box, Button, Container, Typography } from "@mui/material";
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
  const { userList } = useAppSelector((state) => state.userData);
  const userData = userList[0];
  const [formData, setFormData] = useState<UserUpdateData>(userData);
  useEffect(() => {
    setFormData(userData);
  }, [userData]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target.name);
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
      dispatch(userUpdate({ updatedUser: formData, userId: userData.id })).then(
        () => {
          setIsEditing(false);
        }
      );
    } else {
      setIsEditing(false);
    }
  };

  const onCancel = () => {
    setIsEditing(false);
  };

  return (
    <Box>
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem", // Optional: adjust spacing between Typography and InputComponent
        }}
      >
        <Typography variant="subtitle1" sx={{ width: "20%", flexShrink: 0 }}>
          {getString("userName")} :
        </Typography>
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem", // Optional: adjust spacing between Typography and InputComponent
        }}
      >
        <Typography variant="subtitle1" sx={{ width: "20%", flexShrink: 0 }}>
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem", // Optional: adjust spacing between Typography and InputComponent
        }}
      >
        <Typography variant="subtitle1" sx={{ width: "20%", flexShrink: 0 }}>
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
