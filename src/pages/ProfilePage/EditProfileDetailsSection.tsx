import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserUpdateData } from "../../DataTypes/UserDataTypes";
import { useState } from "react";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const EditProfileDetailsSection = ({
  userData,
  onSave,
  onCancel,
}: {
  userData: UserUpdateData;
  onSave: (updatedData: UserUpdateData) => void;
  onCancel: () => void;
}) => {
  const { t } = useTranslation();
  const getString = t;
  const [formData, setFormData] = useState<UserUpdateData>({
    email: userData?.email || "",
    name: userData?.name || "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
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
            onClick={handleSave}
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
          value={formData.password}
          label={getString("password")}
          type="password"
          name="password"
          autoComplete="new-password"
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
