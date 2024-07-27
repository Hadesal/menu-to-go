import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Dispatch, SetStateAction } from "react";
import { UserUpdateData } from "../../DataTypes/UserDataTypes";

const ProfileDetailsSection = ({
  setActiveTab,
  userData,
}: {
  setActiveTab: Dispatch<SetStateAction<String>>;
  userData: UserUpdateData;
}) => {
  const { t } = useTranslation();
  const getString = t;
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
          {userData?.name}
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
          {userData?.email}
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
export default ProfileDetailsSection;
