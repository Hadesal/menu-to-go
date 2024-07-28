import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserUpdateData } from "../../DataTypes/UserDataTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAppDispatch, useAppSelector } from "../../utils/hooks"; // Adjust the import path
import { userUpdate } from "../../redux/slices/userSlice";

const EditProfileDetailsSection = ({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<String>>;
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
          setActiveTab("profileDetails");
        }
      );
    } else {
      setActiveTab("profileDetails");
    }
  };

  const onCancel = () => {
    setActiveTab("profileDetails");
  };

  return (
    <Box>
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
        <Typography sx={{ width: "100%", color: "#797979" }} variant="h5">
          {getString("editPersonalInfo")}
        </Typography>
        <Container
          disableGutters
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            padding: 0,
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
            sx={{ borderRadius: "1rem" }}
            variant="outlined"
            startIcon={<DoneOutlineOutlinedIcon />}
            onClick={onSave}
          >
            {getString("save")}
          </Button>
        </Container>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "1rem",
        }}
      >
        <TextField
          variant="outlined"
          value={formData.name}
          label={getString("userName")}
          name="name"
          autoComplete="name"
          onChange={handleInputChange}
          sx={{
            width: "25vw",
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
          marginBottom: "1rem",
        }}
      >
        <TextField
          variant="outlined"
          value={formData.email}
          label={getString("email")}
          name="email"
          autoComplete="email"
          onChange={handleInputChange}
          sx={{
            width: "25vw",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "0.8rem",
              },
            },
          }}
        />
      </Container>
      <Container sx={{ display: " flex", flexDirection: "row" }}>
        <TextField
          variant="outlined"
          value={formData.billingData?.phoneNumber}
          label={getString("phonenumber")}
          type="phoneNumber"
          name="phoneNumber"
          autoComplete="phoneNumber"
          onChange={handleInputChange}
          sx={{
            width: "25vw",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "0.8rem",
              },
            },
          }}
        />
      </Container>
    </Box>
  );
};
export default EditProfileDetailsSection;
