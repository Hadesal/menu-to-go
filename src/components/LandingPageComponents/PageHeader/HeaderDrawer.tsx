import React from "react";
import {
  Drawer,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function HeaderDrawer() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box
      sx={{
        alignContent: "center",
        width: 250,
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {["Home", "Pricing", "How it Works", "Contact"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText sx={{ textAlign: "center" }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </Box>
  );
}
