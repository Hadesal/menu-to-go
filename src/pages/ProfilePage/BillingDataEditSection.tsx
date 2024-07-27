import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BillingDataType, UserUpdateData } from "../../DataTypes/UserDataTypes";
import { useState } from "react";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const BillingDataEditSection = ({
  onSave,
  onCancel,
  setActiveSection,
  setNewUser,
}) => {
  const { t } = useTranslation();
  const getString = t;
  const [formData, setFormData] = useState<BillingDataType>({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    country: "",
    address: "",
    city: "",
    taxId: "",
    zipCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleOnSave = () => {
    console.log("hey");
  };
  return (
    <>
      <Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          <TextField
            variant="outlined"
            value={formData.fullName}
            label={getString("fullName")}
            name="fullName"
            autoComplete="fullName"
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
            marginTop: "1rem",
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
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          <TextField
            variant="outlined"
            value={formData.phoneNumber}
            label={getString("phoneNumber")}
            name="phoneNumber"
            autoComplete="phone"
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
      </Container>

      <Container sx={{ display: "flex", flexDirection: "row" }}>
        <Container disableGutters>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "1rem",
            }}
          >
            <TextField
              variant="outlined"
              value={formData.companyName}
              label={getString("companyName")}
              name="companyName"
              autoComplete="companyName"
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
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "rem",
              marginTop: "1rem",
            }}
          >
            <TextField
              variant="outlined"
              value={formData.country}
              label={getString("country")}
              name="country"
              autoComplete="country"
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
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "1rem",
            }}
          >
            <TextField
              variant="outlined"
              value={formData.address}
              label={getString("address")}
              name="address"
              autoComplete="address"
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
        </Container>
        <Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "1rem",
            }}
          >
            <TextField
              variant="outlined"
              value={formData.taxId}
              label={getString("taxId")}
              name="taxId"
              autoComplete="taxId"
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
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "1rem",
            }}
          >
            <TextField
              variant="outlined"
              value={formData.city}
              label={getString("city")}
              name="city"
              autoComplete="city"
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
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "2rem",
              marginTop: "1rem",
            }}
          >
            <TextField
              variant="outlined"
              value={formData.zipCode}
              label={getString("zipCode")}
              name="zipCode"
              autoComplete="zipCode"
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
        </Container>
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
          onClick={() => {
            setActiveSection("billingDataText");
          }}
        >
          {getString("cancel")}
        </Button>
        <Button
          sx={{ borderRadius: "1rem", marginRight: "2rem" }}
          variant="outlined"
          startIcon={<DoneOutlineOutlinedIcon />}
          onClick={onSave}
        >
          {getString("save")}
        </Button>
      </Container>
    </>
  );
};
export default BillingDataEditSection;
