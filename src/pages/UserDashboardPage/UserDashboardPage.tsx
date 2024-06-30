import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LayersIcon from "@mui/icons-material/Layers";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userImg from "../../assets/omarselfie.jpeg";
import logo from "../../assets/qr-code-logo.svg";
import ConfirmDialog from "../../components/Dialogs/LogoutDialog/confirmDialog";
import {
  resetActiveTab,
  selectActiveTab,
  setActiveTab,
} from "../../redux/slices/mainViewSlice";
import ContactPage from "../ContactPage/Contact";
import DashboardView from "../DashboardView/DashboardViewPage";
import LanguageIcon from "@mui/icons-material/Language";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import FeedbackPage from "../FeedbackPage/FeedbackPage";
import RestaurantSection from "../RestaurantSection/RestaurantSection";

const INACTIVITY_PERIOD = 60 * 1000; // 1 minute in milliseconds
const PROMPT_BEFORE_IDLE = 30 * 1000; // 30 seconds in milliseconds
const CHECK_INTERVAL = 1000; // 1 second in milliseconds

const drawerWidth = 240;

const buttonData = [
  { id: "home", icon: <HomeIcon />, label: "Dashboard" },
  { id: "resturant", icon: <RestaurantIcon />, label: "Restaurant" },
  { id: "categories", icon: <LayersIcon />, label: "Categories" },
  { id: "templates", icon: <ViewQuiltIcon />, label: "Templates" },
  { id: "qrcode", icon: <QrCodeIcon />, label: "Generate qr code" },
  { id: "feedbacks", icon: <QuestionAnswerIcon />, label: "Feedbacks" },
  { id: "contactus", icon: <SupportAgentIcon />, label: "Contact us" },
  {
    id: "Logout",
    icon: <LogoutOutlinedIcon />,
    label: "Log out",
  },
];

const langs = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
};

const profileOptions = [
  { id: "myprofile", optionName: "My profile" },
  { id: "notifications", optionName: "Notifications" },
  { id: "subscription", optionName: "Subscription" },
];

export default function UserDashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);

  const openProfile = Boolean(anchorElProfile);
  const openLang = Boolean(anchorElLang);

  const { i18n } = useTranslation();

  const handleProfileClick = (event) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };
  const handleLangClick = (event) => {
    setAnchorElLang(event.currentTarget);
  };
  const handleLangClose = () => {
    setAnchorElLang(null);
  };
  const [showSessionTimeoutDialog, setShowSessionTimeoutDialog] =
    useState(false);
  const [remaining, setRemaining] = useState<number>(10 * 6000);

  const activeTab = useSelector(selectActiveTab);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogout = () => {
    setShowLogoutDialog(false);
    navigate("/login");
    dispatch(resetActiveTab());
    localStorage.removeItem("userToken");
    localStorage.removeItem("expireTime");
  };

  const handleLogoutDialogCancel = () => {
    setShowLogoutDialog(false);
  };

  /**
   * Function is trigged after the inactivity timeout is over
   */
  const onIdle = () => {
    handleLogout();
  };

  /**
   * Function is trigged to inform the user about his inactivity and that he will be logged out after specific time
   */
  const onPrompt = () => {
    setShowSessionTimeoutDialog(true);
  };

  const handleStillHere = () => {
    activate();
    setShowSessionTimeoutDialog(false);
  };

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onPrompt,
    crossTab: true,
    timeout: INACTIVITY_PERIOD,
    promptBeforeIdle: PROMPT_BEFORE_IDLE,
    throttle: CHECK_INTERVAL,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      //FIXME: Remove during production , only for testing purposes
      console.log(Math.ceil(getRemainingTime() / 1000));
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  const drawer = (
    <div>
      <img
        style={{
          display: "flex",
          margin: "0 auto",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
        alt="qrcode"
        src={logo}
      />
      <List>
        {buttonData.map((btn) => (
          <ListItem
            sx={{
              marginBottom: 2,
            }}
            key={btn.id}
            disablePadding
            onClick={() => {
              if (btn.label === "Log out") {
                handleLogoutClick();
              } else {
                dispatch(setActiveTab(btn.label));
                //isTokenValid(handleLogout);
              }
            }}
          >
            <ListItemButton
              sx={{
                color: activeTab === btn.label ? "#F9FDFE" : "#8B6A58",
                backgroundColor: activeTab === btn.label ? "#A4755D" : null,
                "&:hover": {
                  backgroundColor: "#A4755D",
                  color: "#F9FDFE",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {btn.icon}
              </ListItemIcon>
              <ListItemText sx={{ width: "0px" }} primary={btn.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
              <Avatar
                style={{ alignSelf: "center" }}
                alt="Omar Fares"
                src={userImg}
              />
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
                {profileOptions.map((option) => (
                  <MenuItem
                    key={option.id}
                    onClick={() => {
                      console.log(option.optionName);
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
                      onClick={() => i18n.changeLanguage(lang)}
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
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          borderRight: "1 solid red",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
              boxShadow: "5px 0px 28px 0px #00000040",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
              boxShadow: "5px 0px 28px 0px #00000040",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* confirm logout */}
        <ConfirmDialog
          isOpen={showLogoutDialog}
          onPrimaryActionClick={handleLogout}
          onSecondaryActionClick={handleLogoutDialogCancel}
          width="580px"
          height="500px"
          showImg={true}
          secondaryActionText="Cancel"
          primaryActionText="Logout"
          title="Are You Logging Out?"
          subTitle="You can always log back in at any time."
          onClose={handleLogoutDialogCancel}
        />
        {/* confirm session timeout */}
        <ConfirmDialog
          isOpen={showSessionTimeoutDialog}
          onPrimaryActionClick={handleStillHere}
          onSecondaryActionClick={handleLogout}
          width="500px"
          height="300px"
          showImg={false}
          secondaryActionText="Log out now"
          primaryActionText="Continue session"
          title="You will be logged out soon"
          subTitle={`For your security, we automatically log you out after a period of inactivity. You will be logged out in ${remaining} seconds.`}
        />
        {activeTab === "Dashboard" && <DashboardView />}
        {activeTab === "Restaurant" && (
          <RestaurantSection label="Add Restaurant" />
        )}
        {activeTab === "Categories" && <h1> Categories view</h1>}
        {activeTab === "Templates" && <h1> Templates view</h1>}
        {activeTab === "Generate qr code" && <h1> Generate qr code view</h1>}
        {activeTab === "Feedbacks" && <FeedbackPage />}
        {activeTab === "Contact us" && <ContactPage />}
      </Box>
    </Box>
  );
}
