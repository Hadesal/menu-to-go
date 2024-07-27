import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useAppSelector } from "../../utils/hooks";
import { useEffect, useState } from "react";
import pic from "../../assets/omarselfie.jpeg";
import {
  BillingDataType,
  ChangePasswordDataType,
  UserUpdateData,
} from "../../DataTypes/UserDataTypes";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const ProfilePage = () => {
  const { t } = useTranslation();
  const getString = t;
  const { userList } = useAppSelector((state) => state.userData);
  const userData = userList[0];
  const [activeTab, setActiveTab] = useState<String>("profileDetails");
  const [base64String, setBase64String] = useState("");
  const [userDataNewValues, setUserDataNewValues] = useState<UserUpdateData>({
    email: userData?.email,
    name: userData?.name,
    password: "",
  });
  const convertImageTobase64 = async (imageUrl: any) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        setBase64String(reader.result as string);
      };
    } catch (error) {
      console.error("Failed to convert image", error);
    }
  };
  useEffect(() => {
    console.log(userList);
    console.log(userData);
    convertImageTobase64(pic);
    setUserDataNewValues({
      email: userData?.email,
      name: userData?.name,
      password: "",
    });
  }, [userData]);

  const onSave = (formData: UserUpdateData) => {
    console.log(formData);
    setActiveTab("profileDetails");
  };
  const onCancel = () => {
    setActiveTab("profileDetails");
    setUserDataNewValues({
      email: userData?.email || "",
      name: userData?.name || "",
      password: "",
    });
  };

  const RenderProfileDetails = () => {
    return (
      <Box>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">{getString("personalInfo")}</Typography>
          <Button
            sx={{ borderRadius: "1rem" }}
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            onClick={() => {
              setActiveTab("edit");
            }}
          >
            {getString("edit")}
          </Button>
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "1rem",
          }}
        >
          <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
            {getString("userName")}
            {" :"}
          </Typography>
          <Typography variant="subtitle1" color={"#A4755D"}>
            {userDataNewValues?.name}
          </Typography>
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "1rem",
          }}
        >
          <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
            {getString("email")}
            {" :"}
          </Typography>
          <Typography variant="subtitle1" color={"#A4755D"}>
            {userDataNewValues?.email}
          </Typography>
        </Container>
        <Container sx={{ display: " flex", flexDirection: "row" }}>
          <Typography variant="subtitle1">
            {getString("phonenumber")}
            {" :"}
          </Typography>
        </Container>
      </Box>
    );
  };
  const RenderChangePassword = ({
    onSave,
    onCancel,
  }: {
    onSave: (updatedPassword: ChangePasswordDataType) => void;
    onCancel: () => void;
  }) => {
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
  const RenderEditProfileDetails = ({
    userData,
    onSave,
    onCancel,
  }: {
    userData: UserUpdateData;
    onSave: (updatedData: UserUpdateData) => void;
    onCancel: () => void;
  }) => {
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

  const RenderBillingData = ({
    onSave,
    onCancel,
  }: {
    onSave: (updatedBillingData: BillingDataType) => void;
    onCancel: () => void;
  }) => {
    const [activeSection, setActiveSection] =
      useState<String>("billingDataText");
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

    const handleSave = () => {
      onSave(formData);
    };

    const RenderBillingDataEdit = () => {
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
              onClick={onCancel}
            >
              {getString("save")}
            </Button>
          </Container>
        </>
      );
    };

    const RenderBillingDataText = () => {
      return (
        <Container className="billingDataTextMainContainer">
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ marginLeft: "2.5vw", color: "#797979" }}
            >
              {getString("billingDataPageDescription")}
            </Typography>
            <Button
              sx={{ borderRadius: "1rem" }}
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              onClick={() => {
                setActiveSection("editBillingData");
              }}
            >
              {getString("edit")}
            </Button>
          </Container>
          <Container>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            >
              <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
                {getString("fullName")}
                {" :"}
              </Typography>
              <Typography variant="subtitle1" color={"#A4755D"}>
                {userDataNewValues?.billingData?.fullName}
              </Typography>
            </Container>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "1rem",
              }}
            >
              <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
                {getString("email")}
                {" :"}
              </Typography>
              <Typography variant="subtitle1" color={"#A4755D"}>
                {userDataNewValues?.email}
              </Typography>
            </Container>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            >
              <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
                {getString("phoneNumber")}
                {" :"}
              </Typography>
              <Typography variant="subtitle1" color={"#A4755D"}>
                {userDataNewValues?.billingData?.phoneNumber}
              </Typography>
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
                <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
                  {getString("companyName")}
                  {" :"}
                </Typography>
                <Typography variant="subtitle1" color={"#A4755D"}>
                  {userDataNewValues?.billingData?.companyName}
                </Typography>
              </Container>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "rem",
                  marginTop: "1rem",
                }}
              >
                <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
                  {getString("country")}
                  {" :"}
                </Typography>
                <Typography variant="subtitle1" color={"#A4755D"}>
                  {userDataNewValues?.billingData?.country}
                </Typography>
              </Container>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "1rem",
                }}
              >
                <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
                  {getString("address")}
                  {" :"}
                </Typography>
                <Typography variant="subtitle1" color={"#A4755D"}>
                  {userDataNewValues?.billingData?.address}
                </Typography>
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
                <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
                  {getString("taxId")}
                  {" :"}
                </Typography>
                <Typography variant="subtitle1" color={"#A4755D"}>
                  {userDataNewValues?.billingData?.taxId}
                </Typography>
              </Container>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "1rem",
                }}
              >
                <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
                  {getString("city")}
                  {" :"}
                </Typography>
                <Typography variant="subtitle1" color={"#A4755D"}>
                  {userDataNewValues?.billingData?.city}
                </Typography>
              </Container>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "2rem",
                  marginTop: "1rem",
                }}
              >
                <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
                  {getString("zipCode")}
                  {" :"}
                </Typography>
                <Typography variant="subtitle1" color={"#A4755D"}>
                  {userDataNewValues?.billingCode?.zipCode}
                </Typography>
              </Container>
            </Container>
          </Container>
        </Container>
      );
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
            {getString("billingData")}
          </Typography>
          <Divider variant="middle" component={"h5"} />
        </Container>
        {activeSection === "billingDataText" && <RenderBillingDataText />}
        {activeSection === "editBillingData" && <RenderBillingDataEdit />}
      </Box>
    );
  };

  return (
    <>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ marginTop: "1rem" }} variant="h3">
          {getString("profile")}
        </Typography>
        <Divider variant="fullWidth" component={"h4"} />
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start ",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Button
            sx={{ borderRadius: "1rem", marginRight: "1rem" }}
            variant={activeTab === "profileDetails" ? "contained" : "outlined"}
            onClick={() => {
              setActiveTab("profileDetails");
            }}
          >
            {getString("profileDetailsButton")}
          </Button>

          <Button
            sx={{ borderRadius: "1rem" }}
            variant={activeTab === "changePassword" ? "contained" : "outlined"}
            onClick={() => {
              setActiveTab("changePassword");
            }}
          >
            {getString("changePasswordButton")}
          </Button>
          <Button
            sx={{ borderRadius: "1rem", marginLeft: "1rem" }}
            variant={activeTab === "billingData" ? "contained" : "outlined"}
            onClick={() => {
              setActiveTab("billingData");
            }}
          >
            {getString("billingData")}
          </Button>
        </Container>
        <Container
          sx={{
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ width: "8vw", height: "16vh" }}
            alt={userData?.name}
            src={base64String}
          />
          <Container disableGutters sx={{ width: "fit-content" }}>
            <Button sx={{ width: "20vw", color: "primary" }} variant="outlined">
              {getString("uploadNewPhoto")}
            </Button>
            <Button sx={{ width: "10vw", color: "red" }} variant="text">
              {getString("delete")}
            </Button>
          </Container>
        </Container>
        <Paper sx={{ padding: "1rem" }}>
          {activeTab === "profileDetails" && <RenderProfileDetails />}
          {activeTab === "changePassword" && (
            <RenderChangePassword onCancel={onCancel} onSave={onSave} />
          )}
          {activeTab === "edit" && (
            <RenderEditProfileDetails
              userData={userData}
              onCancel={onCancel}
              onSave={onSave}
            />
          )}
          {activeTab === "billingData" && (
            <RenderBillingData onSave={onSave} onCancel={onCancel} />
          )}
        </Paper>
      </Container>
    </>
  );
};

export default ProfilePage;
