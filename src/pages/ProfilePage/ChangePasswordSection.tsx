import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ChangePasswordDataType } from "../../DataTypes/UserDataTypes";
import { useState } from "react";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const ChangePasswordSection = ({
  onSave,
  onCancel,
}: {
  onSave: (updatedPassword: ChangePasswordDataType) => void;
  onCancel: () => void;
}) => {
  const { t } = useTranslation();
  const getString = t;
  const [formData, setFormData] = useState<ChangePasswordDataType>({
    oldPassword: "",
    newPassword: "",
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
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
          value={formData.oldPassword}
          label={getString("oldPassword")}
          name="old password"
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
          name="new-password"
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
          startIcon={<CloseOutlinedIcon />}
        >
          {getString("cancel")}
        </Button>
        <Button
          sx={{ borderRadius: "1rem", marginRight: "2rem" }}
          variant="outlined"
          startIcon={<DoneOutlineOutlinedIcon />}
          onClick={onCancel}
        >
          {getString("save")}
        </Button>
      </Container>
    </Box>
  );
};

export default ChangePasswordSection;
