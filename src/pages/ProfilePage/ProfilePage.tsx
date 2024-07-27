import {
  Avatar,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../utils/hooks";
import { useEffect, useState } from "react";
import pic from "../../assets/omarselfie.jpeg";
import { UserUpdateData } from "../../DataTypes/UserDataTypes";
import ProfileDetailsSection from "./ProfileDetailsSection";
import ChangePasswordSection from "./ChangePasswordSection";
import EditProfileDetailsSection from "./EditProfileDetailsSection";
import BillingDetailsSection from "./BillingDataSection";

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
    convertImageTobase64(pic);
    setUserDataNewValues({
      email: userData?.email,
      name: userData?.name,
      password: "",
    });
  }, [userData]);

  const onSave = (formData: any) => {
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
          {activeTab === "profileDetails" && (
            <ProfileDetailsSection
              userData={userDataNewValues}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "changePassword" && (
            <ChangePasswordSection onCancel={onCancel} onSave={onSave} />
          )}
          {activeTab === "edit" && (
            <EditProfileDetailsSection
              userData={userData}
              onCancel={onCancel}
              onSave={onSave}
            />
          )}
          {activeTab === "billingData" && (
            <BillingDetailsSection
              userData={userData}
              onSave={onSave}
              onCancel={onCancel}
            />
          )}
        </Paper>
      </Container>
    </>
  );
};

export default ProfilePage;
