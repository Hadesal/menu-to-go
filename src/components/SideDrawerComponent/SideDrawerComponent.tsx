import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectActiveTab } from "../../redux/slices/mainViewSlice";
import logo from "../../assets/qr-code-logo.svg";
import { buttonData } from "@constants/constants";
import { useAppDispatch } from "../../redux/reduxHooks";
import { setActiveTab } from "../../redux/slices/mainViewSlice";
import { TabType } from "@constants/types";

interface SideDrawerProps {
  getString: (key: string) => string;
  handleLogoutClick: () => void;
}

const SideDrawerComponent: React.FC<SideDrawerProps> = ({
  getString,
  handleLogoutClick,
}) => {
  const dispatch = useAppDispatch();
  const activeTab = useSelector(selectActiveTab);

  const buttons = buttonData(getString);

  return (
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
        {buttons.map((btn) => (
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
                dispatch(setActiveTab(btn.id as TabType));
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
                {<btn.icon />}
              </ListItemIcon>
              <ListItemText sx={{ width: "0px" }} primary={btn.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SideDrawerComponent;
