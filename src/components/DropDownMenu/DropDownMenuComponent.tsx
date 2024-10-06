import React from "react";
import { Menu, MenuItem } from "@mui/material";

interface MenuItemProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface DropDownMenuComponentProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: (index: number) => void;
  menuItems: MenuItemProps[];
  idPrefix: string;
  index: number;
}

const DropDownMenuComponent = ({
  anchorEl,
  open,
  onClose,
  menuItems,
  idPrefix,
  index,
}: DropDownMenuComponentProps) => {
  return (
    <Menu
      id={`${idPrefix}-${index}`}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onClick={(event) => {
        event.stopPropagation();
      }}
      disableScrollLock={true}
      elevation={1}
    >
      {menuItems.map((menuItem, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            menuItem.onClick();
            onClose(index);
          }}
        >
          {menuItem.icon}
          {menuItem.text}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default DropDownMenuComponent;
