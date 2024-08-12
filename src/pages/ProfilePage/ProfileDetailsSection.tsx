import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppSelector } from "../../utils/hooks";
import InputComponent from "../../components/InputComponent/InputComponent";
import EditProfileDetailsSection from "./EditProfileDetailsSection";

const ProfileDetailsSection = ({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<String>>;
}) => {
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem", // Optional: adjust spacing between Typography and InputComponent
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ width: "20%", flexGrow: 0, flexShrink: 0 }}
        >
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem", // Optional: adjust spacing between Typography and InputComponent
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ width: "20%", flexGrow: 0, flexShrink: 0 }}
        >
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
