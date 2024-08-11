import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LanguageIcon from "@mui/icons-material/Language";
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useIdleTimer } from "react-idle-timer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/qr-code-logo.svg";
import ConfirmDialog from "../../components/Dialogs/LogoutDialog/confirmDialog";
import {
  resetActiveTab,
  selectActiveTab,
  setActiveTab,
} from "../../redux/slices/mainViewSlice";
import { fetchAllData } from "../../utils/DashboaredDataFetching";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import ContactPage from "../ContactPage/Contact";
import FeedbackPage from "../FeedbackPage/FeedbackPage";
import RestaurantSection from "../RestaurantSection/RestaurantSection";
import SplashScreen from "../SplashScreen/SplashScreen";
import DashboardView from "./DashboardQuickLinks/DashboardQuickLinksPage";
import UserDetailsInputComponent from "../../components/Dialogs/UserDetailsDialog/UserDetailsInputComponent";
import CategoryPage from "../CategoryPage/CategoryPage";
import { userDelete } from "../../redux/slices/userSlice";
import QrCodePage from "../QrCodePage/QrCodePage";
const INACTIVITY_PERIOD = 60 * 10000; // 1 minute in milliseconds
const PROMPT_BEFORE_IDLE = 30 * 1000; // 30 seconds in milliseconds
const CHECK_INTERVAL = 1000; // 1 second in milliseconds

const drawerWidth = 240;

const langs = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
  es: { nativeName: "Español" },
  ar: { nativeName: "العربية" },
  fr: { nativeName: "Français" },
  tr: { nativeName: "Türkçe" },
};

export default function UserDashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const openProfile = Boolean(anchorElProfile);
  const openLang = Boolean(anchorElLang);
  const [daysLeftForVerification, setDaysLeftForVerification] = useState(3);
  const { i18n, t } = useTranslation();
  const getString = t;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSessionTimeoutDialog, setShowSessionTimeoutDialog] =
    useState(false);
  const [remaining, setRemaining] = useState<number>(10 * 6000);

  const activeTab = useSelector(selectActiveTab);
  const navigate = useNavigate();
  const userData = useAppSelector(
    (selector) => selector?.userData?.userList[0]
  );
  const { restaurantList } = useAppSelector((state) => state.restaurantsData);
  const [userDetailsisOpen, setUserDetailsisOpen] = useState(false);
  const buttonData = [
    { id: "dashboard", icon: <HomeIcon />, label: getString("dashboard") },
    {
      id: "restaurant",
      icon: <RestaurantIcon />,
      label: getString("restaurant"),
    },
    // { id: "categories", icon: <LayersIcon />, label: getString("categories") },
    { id: "templates", icon: <ViewQuiltIcon />, label: getString("templates") },
    {
      id: "generateQrCode",
      icon: <QrCodeIcon />,
      label: getString("generateQrCode"),
    },
    {
      id: "feedback",
      icon: <QuestionAnswerIcon />,
      label: getString("feedbacks"),
    },
    {
      id: "contactUs",
      icon: <SupportAgentIcon />,
      label: getString("contactUs"),
    },
    {
      id: "logout",
      icon: <LogoutOutlinedIcon />,
      label: getString("logout"),
    },
  ];
  const profileOptions = [
    { id: "myprofile", optionName: getString("myProfile") },
    { id: "notifications", optionName: getString("notification") },
    { id: "subscription", optionName: getString("Subscription") },
  ];

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
  const closeDialog = () => {
    setShowDeleteDialog(false);
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
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });
  useEffect(() => {
    const createdAtDate = new Date(userData?.createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    if (daysDifference >= 3) {
      if (userData?.verified === false) {
        console.log("Account should be deleted due to lack of verification.");
        dispatch(userDelete(userData.id));
        navigate("/login");
      }
    }
    if (userData?.verified === false) {
      setDaysLeftForVerification(3 - daysDifference);
      setShowDeleteDialog(true);
    }
  }, [userData?.verified, userData?.createdAt]);
  useEffect(() => {
    const fetchDataAndHandleLoading = async () => {
      setLoading(true);
      try {
        await fetchAllData(dispatch);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        //setLoading(false);
      }
    };

    fetchDataAndHandleLoading();
  }, []);
  useEffect(() => {
    if (restaurantList.length < 1) {
      setUserDetailsisOpen(true);
    } else if (restaurantList.length > 0) {
      setUserDetailsisOpen(false);
    }
  }, [restaurantList]);

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
              if (btn.id === "logout") {
                handleLogoutClick();
              } else {
                dispatch(setActiveTab(btn.id));
                //isTokenValid(handleLogout);
              }
            }}
          >
            <ListItemButton
              sx={{
                color: activeTab === btn.id ? "#F9FDFE" : "#8B6A58",
                backgroundColor: activeTab === btn.id ? "#A4755D" : null,
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

  // Show splash screen while loading
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <UserDetailsInputComponent isOpen={userDetailsisOpen} />
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
                {userData && userData?.name?.split("")[0]}
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
                {profileOptions.map((option) => (
                  <MenuItem
                    key={option.id}
                    onClick={() => {
                      navigate(`/${option.id}`);
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
          secondaryActionText={getString("cancel")}
          primaryActionText={getString("logout")}
          title={getString("logoutSubText")}
          subTitle={getString("logoutText")}
          onClose={handleLogoutDialogCancel}
        />
        {/*confirm delete account*/}
        <ConfirmDialog
          isOpen={showDeleteDialog}
          onPrimaryActionClick={closeDialog}
          width="580px"
          height="500px"
          showImg={false}
          primaryActionText={getString("close")}
          title={getString("verifyText")}
          subTitle={getString("verifySubText").replace(
            "%number%",
            daysLeftForVerification.toString()
          )}
        />
        {/* confirm session timeout */}
        <ConfirmDialog
          isOpen={showSessionTimeoutDialog}
          onPrimaryActionClick={handleStillHere}
          onSecondaryActionClick={handleLogout}
          width="500px"
          height="300px"
          showImg={false}
          secondaryActionText={getString("sessionalLogoutCancelText")}
          primaryActionText={getString("sessionalLogoutAcceptText")}
          title={getString("sessionalLogoutText")}
          subTitle={getString("sessionalLogoutSubText")}
        />
        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "restaurant" && (
          <RestaurantSection label={getString("restaurant")} />
        )}
        {/* {activeTab === "categories" && <CategoryPage />} */}
        {activeTab === "templates" && <h1> Templates view</h1>}
        {activeTab === "generateQrCode" && <QrCodePage />}
        {activeTab === "feedback" && <FeedbackPage />}
        {activeTab === "contactUs" && <ContactPage />}
      </Box>
    </Box>
  );
}
