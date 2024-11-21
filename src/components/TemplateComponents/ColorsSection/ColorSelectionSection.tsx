import { Typography, Container, Button, Box, IconButton } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { updateRestaurantUserUiPreferences } from "@slices/restaurantsSlice";
import { updateMenuUiPreferences } from "@redux/slices/menuSlice";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import { Colors } from "@dataTypes/RestaurantObject";

const defaultColorsList = [
  { id: 0, color: "#A4755D" },
  { id: 1, color: "#D9B18F" },
  { id: 2, color: "#4B49A6" },
  { id: 3, color: "#802571" },
];
const ColorSelectionSection = ({ type }: { type: keyof Colors }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const userUiPreferences = useAppSelector(
    (state) => state.restaurantsData.selectedRestaurant?.userUiPreferences
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef, colorPickerRef]);

  const handleColorChange = (newColor: string, type: string) => {
    dispatch(
      updateRestaurantUserUiPreferences({
        ...userUiPreferences,
        colors: {
          ...userUiPreferences.colors,
          [type]: newColor,
        },
      })
    );
    dispatch(
      updateMenuUiPreferences({
        ...userUiPreferences,
        colors: {
          ...userUiPreferences.colors,
          [type]: newColor,
        },
      })
    );
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setPickerPosition({
      top: buttonRect.bottom + window.scrollY, // Adjust for scroll
      left: buttonRect.left + window.scrollX,
    });
    toggleColorPicker();
  };

  return (
    <>
      <Container
      disableGutters
        id={`${type}ColorsSection`}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            //key={index}
            sx={{
              background:
                (userUiPreferences && userUiPreferences.colors[type]) ||
                "#000000",
              minWidth: 0,
              width: { xs: "2rem", sm: "2.5rem" },
              height: { xs: "2rem", sm: "2.5rem" },
              cursor: "pointer",
              borderRadius: "8px",
            }}
          ></Box>
          <Typography
            sx={{
              border: "1px solid #797979",
              //height: { xs: "2rem", sm: "2.5rem" },
              boxSizing: "border-box",
              borderRadius: "10px",
              padding: 1,
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "#797979",
                fontSize: "14px",
                marginRight: "10px",
              }}
            >
              Hex#
            </span>
            {(userUiPreferences &&
              userUiPreferences.colors[type]?.split("#")[1]) ||
              ""}
          </Typography>

          <IconButton
            sx={{
              background: "#A4755D30",
              "&:hover": {
                background: "#A4755D30",
              },
              borderRadius: "10px",
            }}
            aria-label="back"
            onClick={(e) => {
              handleButtonClick(e);
            }}
          >
            <FormatColorFillIcon fontSize="medium" color="primary" />
          </IconButton>
        </Box>
        {showColorPicker && (
          <div
            ref={colorPickerRef}
            style={{
              position: "absolute",
              top: `${pickerPosition.top}px`,
              left: `${pickerPosition.left}px`,
              zIndex: 2,
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              padding: "10px",
            }}
          >
            <HexColorPicker
              color={userUiPreferences && userUiPreferences?.colors[type]}
              onChange={(newColor) => handleColorChange(newColor, type)}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default ColorSelectionSection;
