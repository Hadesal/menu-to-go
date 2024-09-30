import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import { langs, profileOptions } from "@constants/constants";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { setActiveTab } from "../../redux/slices/mainViewSlice";

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
  const [anchorElProfile, setAnchorElProfile] =
    React.useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(
    null
  );
  const openProfile = Boolean(anchorElProfile);
  const openLang = Boolean(anchorElLang);
  const { i18n, t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state?.userData?.user);

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };
  const handleLangClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElLang(event.currentTarget);
  };
  const handleLangClose = () => {
    setAnchorElLang(null);
  };

  const profileOpts = profileOptions(getString);

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
              {userData && userData?.name?.charAt(0)}
            </Avatar>

            <IconButton
              id="profile-icon"
              aria-label="profile details icon"
              aria-controls={openProfile ? "profile-icon" : undefined}
              aria-haspopup="true"
              aria-expanded={openProfile ? "true" : undefined}
              onClick={handleProfileClick}
              sx={{ color: "#F9FDFE" }}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
            <Menu
              id="profile-icon"
              anchorEl={anchorElProfile}
              open={openProfile}
              onClose={handleProfileClose}
              MenuListProps={{
                "aria-labelledby": "profile-icon",
              }}
            >
              {profileOpts.map((option) => (
                <MenuItem
                  key={option.id}
                  onClick={() => {
                    dispatch(setActiveTab(option.id as string));
                    setAnchorElProfile(null);
                  }}
                >
                  {option.optionName}
                </MenuItem>
              ))}
            </Menu>
            <Box
              sx={{
                borderLeft: "1px solid #F9FDFE",
                marginLeft: "0.5rem",
                paddingLeft: "0.5rem",
              }}
            >
              <IconButton
                id="language-icon"
                aria-label="Language icon"
                aria-controls={openLang ? "language-icon" : undefined}
                aria-haspopup="true"
                aria-expanded={openLang ? "true" : undefined}
                onClick={handleLangClick}
                sx={{ color: "#F9FDFE" }}
              >
                <LanguageIcon />
              </IconButton>
              <Menu
                id="language-icon"
                anchorEl={anchorElLang}
                open={openLang}
                onClose={handleLangClose}
                MenuListProps={{
                  "aria-labelledby": "language-icon",
                }}
              >
                {Object.keys(langs).map((lang) => (
                  <MenuItem
                    key={lang}
                    onClick={() => {
                      i18n.changeLanguage(lang);
                      handleLangClose();
                    }}
                    disabled={i18n.resolvedLanguage === lang}
                  >
                    {langs[lang].nativeName}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
