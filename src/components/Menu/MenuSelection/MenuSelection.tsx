// src/components/MenuSelection/MenuSelection.tsx
import React from "react";
import { Box, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { setSelectedCategoryType } from "@redux/slices/menuSlice";

// Define the type for the menu selection items
interface MenuSelectionItem {
  id: string;
  Label: string;
}

interface MenuSelectionProps {
  menuSelections: MenuSelectionItem[];
}

const MenuSelection: React.FC<MenuSelectionProps> = ({ menuSelections }) => {
  const dispatch = useAppDispatch();
  const { selectedCategoryType, restaurantData } = useAppSelector(
    (state) => state.menuData
  );

  return (
    <Paper
      sx={{
        display: "flex",
        borderRadius: "29px",
        height: "64px",
        background: "#FCFDFD",
        position: "relative",
      }}
      elevation={6}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 4,
        }}
      >
        {menuSelections.map((selection) => (
          <Box
            key={selection.id}
            onClick={() => dispatch(setSelectedCategoryType(selection.Label))}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background:
                selection.Label === selectedCategoryType
                  ? restaurantData.userUiPreferences.colors.primaryColor
                  : "transparent",
              color:
                selection.Label === selectedCategoryType
                  ? "#F9FDFE"
                  : "#797979",
              borderRadius: "25px",
              padding: "0.7rem",
              width: "140px",
              fontWeight: "500",
              fontFamily: restaurantData.userUiPreferences.fontType,
            }}
          >
            {selection.Label}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default MenuSelection;
