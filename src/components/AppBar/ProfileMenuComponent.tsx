/* eslint-disable @typescript-eslint/no-explicit-any */
import { profileOptions } from "@constants/constants";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { setActiveTab } from "@redux/slices/mainViewSlice";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TabType } from "@constants/types";

interface ProfileMenuProps {
  getString: (key: string) => string;
  dispatch: (action: any) => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ getString, dispatch }) => {
  const [anchorElProfile, setAnchorElProfile] =
    React.useState<null | HTMLElement>(null);
  const openProfile = Boolean(anchorElProfile);

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };

  const profileOpts = profileOptions(getString);

  return (
    <>
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
              
              dispatch(setActiveTab(option.id as TabType));
              setAnchorElProfile(null);
            }}
          >
            {option.optionName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default ProfileMenu;
