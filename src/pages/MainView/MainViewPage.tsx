import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LayersIcon from "@mui/icons-material/Layers";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import logo from "../../assets/qr-code-logo.svg";
import userImg from "../../assets/omarselfie.jpeg";
import DashboardView from "../DashboardView/DashboardViewPage";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActiveTab,
  setActiveTab,
} from "../../redux/slices/mainViewSlice";

const drawerWidth = 240;

const buttonData = [
  { id: "home", icon: <HomeIcon />, label: "Dashboard" },
  { id: "resturant", icon: <RestaurantIcon />, label: "Restaurant" },
  { id: "categories", icon: <LayersIcon />, label: "Categories" },
  { id: "templates", icon: <ViewQuiltIcon />, label: "Templates" },
  { id: "qrcode", icon: <QrCodeIcon />, label: "Generate qr code" },
  { id: "feedbacks", icon: <QuestionAnswerIcon />, label: "Feedbacks" },
  { id: "contactus", icon: <SupportAgentIcon />, label: "Contact us" },
  { id: "Logout", icon: <LogoutOutlinedIcon />, label: "Log out" },
];

export default function MainView() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const activeTab = useSelector(selectActiveTab);
  const dispatch = useDispatch();

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
            onClick={() => dispatch(setActiveTab(btn.label))}
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
                aria-label="profile details icon"
                onClick={() => {}}
                sx={{ color: "#F9FDFE" }}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
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
        {activeTab === "Dashboard" && <DashboardView />}
        {activeTab === "Restaurant" && <h1> Restaurant view</h1>}
        {activeTab === "Categories" && <h1> Categories view</h1>}
        {activeTab === "Templates" && <h1> Templates view</h1>}
        {activeTab === "Generate qr code" && <h1> Generate qr code view</h1>}
        {activeTab === "Feedbacks" && <h1> Feedbacks view</h1>}
        {activeTab === "Contact us" && <h1> Contact us view</h1>}
        {activeTab === "Log out" && <h1> Log out view</h1>}
      </Box>
    </Box>
  );
}
