import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import LanguageMenu from "./LanguageMenuComponent";
import ProfileMenu from "./ProfileMenuComponent";
import { UserDataType } from "@dataTypes/UserDataTypes";

// AppBarComponent Props
interface AppBarComponentProps {
  handleDrawerToggle: () => void;
  drawerWidth: number;
  handleLogoutClick: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
  handleDrawerToggle,
  drawerWidth,
  handleLogoutClick,
}) => {
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const userData: UserDataType = useAppSelector(
    (state) => state?.userData?.user
  )!;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        background: "#A4755D",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Lucida Calligraphy",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "28px",
              lineHeight: "36px",
            }}
            variant="h6"
            noWrap
            component="div"
          >
            Menu-To-Go
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Avatar style={{ alignSelf: "center" }}>
              {userData?.name?.charAt(0)}
            </Avatar>
            <ProfileMenu getString={getString} dispatch={dispatch} />
            <LanguageMenu />
          </Box>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
