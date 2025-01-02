import AppBarComponent from "@components/AppBar/AppBarComponent";
import ConfirmDialog from "@components/common/Dialogs/LogoutDialog/confirmDialog";
import UserDetailsInputComponent from "@components/common/Dialogs/UserDetailsDialog/UserDetailsInputComponent";
import SideDrawer from "@components/SideDrawerComponent/SideDrawerComponent";
import {
  CHECK_INTERVAL,
  drawerWidth,
  INACTIVITY_PERIOD,
  PROMPT_BEFORE_IDLE,
} from "@constants/constants";
import { Box, CssBaseline, Drawer, Toolbar } from "@mui/material";
import ContactPage from "@pages/ContactPage/Contact";
import ProfilePage from "@pages/ProfilePage/ProfilePage";
import QrCodePage from "@pages/QrCodePage/QrCodePage";
import RestaurantSection from "@pages/RestaurantSection/RestaurantSection";
import SplashScreen from "@pages/SplashScreen/SplashScreen";
import TemplatePage from "@pages/TemplatePage/TemplatePage";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { deleteUser } from "@redux/thunks/userThunks";
import { resetActiveTab, selectActiveTab } from "@slices/mainViewSlice";
import { fetchAllData } from "@utils/dataFetchers/DashboaredDataFetching";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardView from "./DashboardQuickLinks/DashboardQuickLinksPage";
import { useLanguage } from "src/hooks/useLanguage";

const UserDashboardPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSessionTimeoutDialog, setShowSessionTimeoutDialog] =
    useState(false);
  const [userDetailsisOpen, setUserDetailsisOpen] = useState(false);

  const { getString, currentLanguage } = useLanguage();

  const activeTab = useSelector(selectActiveTab);
  const navigate = useNavigate();
  const userData = useAppSelector((selector) => selector?.userData?.user);
  const { restaurantList } = useAppSelector((state) => state.restaurantsData);

  const [daysLeftForVerification, setDaysLeftForVerification] = useState(3);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
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

  const handleStillHere = () => {
    activate();
    setShowSessionTimeoutDialog(false);
  };

  const onIdle = () => {
    handleLogout();
  };

  const onPrompt = () => {
    setShowSessionTimeoutDialog(true);
  };

  const { activate } = useIdleTimer({
    onIdle,
    onPrompt,
    crossTab: true,
    timeout: INACTIVITY_PERIOD,
    promptBeforeIdle: PROMPT_BEFORE_IDLE,
    throttle: CHECK_INTERVAL,
  });

  useEffect(() => {
    const handleIfTokenNotExists = () => {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        navigate("/login");
        dispatch(resetActiveTab());
      }
    };

    handleIfTokenNotExists();

    const fetchDataAndHandleLoading = async () => {
      setLoading(true);
      try {
        const result = await fetchAllData(dispatch);
        if (!result?.success) {
          throw new Error(result?.error);
        }
      } catch (error) {
        localStorage.removeItem("userToken");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndHandleLoading();
  }, [dispatch, navigate]);

  useEffect(() => {
    const createdAtDate = new Date(userData?.createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    if (daysDifference >= 3) {
      if (userData?.verified === false) {
        console.log("Account is being deleted due to lack of verification.");
        dispatch(deleteUser(userData.id));
        navigate("/login");
      }
    }
    if (userData?.verified === false) {
      setDaysLeftForVerification(3 - daysDifference);
      setShowDeleteDialog(true);
    }
  }, [
    userData?.verified,
    userData?.createdAt,
    dispatch,
    navigate,
    userData?.id,
  ]);

  useEffect(() => {
    if (restaurantList.length < 1) {
      setUserDetailsisOpen(true);
    } else if (restaurantList.length > 0) {
      setUserDetailsisOpen(false);
    }
  }, [restaurantList]);

  // Show splash screen while loading
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Box dir={currentLanguage === "ar" ? "rtl" : ""} sx={{ display: "flex" }}>
      <CssBaseline />
      <UserDetailsInputComponent isOpen={userDetailsisOpen} />
      <AppBarComponent
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { sm: 0 },
          borderRight: "1 solid red",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          dir={currentLanguage === "ar" ? "rtl" : ""}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
              boxShadow: "5px 0px 28px 0px #00000040",
            },
          }}
        >
          <SideDrawer
            getString={getString}
            handleLogoutClick={handleLogoutClick}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
              boxShadow: "5px 0px 28px 0px #00000040",
            },
          }}
          open
        >
          <SideDrawer
            getString={getString}
            handleLogoutClick={handleLogoutClick}
          />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* Confirm logout */}
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
        {/* Confirm delete account */}
        <ConfirmDialog
          isOpen={showDeleteDialog}
          onPrimaryActionClick={() => setShowDeleteDialog(false)}
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
        {/* Confirm session timeout */}
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
        {/* Main content based on activeTab */}
        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "restaurant" && (
          <RestaurantSection label={getString("restaurant")} />
        )}
        {activeTab === "myprofile" && <ProfilePage />}
        {activeTab === "templates" && <TemplatePage />}
        {activeTab === "generateQrCode" && <QrCodePage />}
        {activeTab === "contactUs" && <ContactPage />}
      </Box>
    </Box>
  );
};

export default UserDashboardPage;
