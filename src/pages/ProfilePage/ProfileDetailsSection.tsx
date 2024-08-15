import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useAppSelector } from "../../utils/hooks";
import EditProfileDetailsSection from "./EditProfileDetailsSection";

const ProfileDetailsSection = () => {
  const { userList } = useAppSelector((state) => state.userData);
  const userData = userList[0];
  const { t } = useTranslation();
  const getString = t;
  useEffect(() => {}, [userData]);

  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <EditProfileDetailsSection setIsEditing={setIsEditing} />;
  }
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
        <Typography variant="h5">
          {getString("profileDetailsButton")}
        </Typography>
        <Button
          sx={{ borderRadius: "1rem" }}
          variant="outlined"
          startIcon={<EditOutlinedIcon />}
          onClick={() => {
            //setActiveTab("edit");
            setIsEditing(true);
          }}
        >
          {getString("edit")}
        </Button>
      </Container>

      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "150px 1fr",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="subtitle1">{getString("userName")} :</Typography>
        <InputComponent
          id="nameField"
          type="Name"
          label=""
          readOnly={true}
          textFieldStyle={{ width: "100%", padding: "0" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={userData?.name}
        />
      </Container>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "150px 1fr",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="subtitle1">
          {getString("email")}
          {" :"}
        </Typography>
        <InputComponent
          id="nameField"
          type="Name"
          label=""
          readOnly={true}
          textFieldStyle={{ width: "100%", padding: "0" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={userData?.email}
        />
      </Container>

      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "150px 1fr",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="subtitle1">
          {getString("phonenumber")}
          {" :"}
        </Typography>
        <InputComponent
          id="nameField"
          type="Name"
          label=""
          readOnly={true}
          textFieldStyle={{ width: "100%", padding: "0" }}
          InputPropStyle={{ borderRadius: "0.5rem" }}
          styleInputProps={{ padding: "0.8rem" }}
          boxStyle={{ flexGrow: 1 }}
          value={userData?.billingData?.phoneNumber}
        />
      </Container>
    </Box>
  );
};
export default ProfileDetailsSection;
