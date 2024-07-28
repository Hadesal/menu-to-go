import { Button, Container, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserUpdateData } from "../../DataTypes/UserDataTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { userUpdate } from "../../redux/slices/userSlice";
const BillingDataEditSection = ({
  setActiveSection,
}: {
  setActiveSection: Dispatch<SetStateAction<String>>;
}) => {
  const { t } = useTranslation();
  const getString = t;
  const { userList } = useAppSelector((state) => state.userData);
  const userData = userList[0];
  const [formData, setFormData] = useState<UserUpdateData>(userData);
  const dispatch = useAppDispatch();
  useEffect(() => {}, [userList]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setFormData((prevValue) => ({ ...prevValue, email: value }));
    } else {
      setFormData((prevValue) => ({
        ...prevValue,
        billingData: { ...prevValue.billingData!, [name]: value },
      }));
    }
  };

  const isFormDataChanged = (formData: any, userData: any) => {
    if (formData.email !== userData.email) return true;
    for (const key in formData.billingData) {
      if (formData.billingData[key] !== userData.billingData[key]) {
        return true;
      }
    }
    return false;
  };

  const handleOnSave = () => {
    if (isFormDataChanged(formData, userData)) {
      dispatch(userUpdate({ updatedUser: formData, userId: userData.id })).then(
        () => {
          setActiveSection("billingDataText");
        }
      );
    } else {
      setActiveSection("billingDataText");
    }
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
            value={formData?.billingData?.fullName}
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
            value={formData?.email}
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
            value={formData?.billingData?.phoneNumber}
            label={getString("phonenumber")}
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
              value={formData?.billingData?.companyName}
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
              value={formData?.billingData?.country}
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
              value={formData?.billingData?.address}
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
              value={formData?.billingData?.taxId}
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
              value={formData?.billingData?.city}
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
              value={formData?.billingData?.zipCode}
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
          onClick={handleOnSave}
        >
          {getString("save")}
        </Button>
      </Container>
    </>
  );
};
export default BillingDataEditSection;
