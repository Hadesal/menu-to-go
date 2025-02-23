import { Colors } from "@dataTypes/RestaurantObject";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { updateMenuUiPreferences } from "@redux/slices/menuSlice";
import { updateRestaurantUserUiPreferences } from "@slices/restaurantsSlice";
import { useEffect, useRef, useState } from "react";
import { ChromePicker } from "react-color";

const ColorSelectionSection = ({ type }: { type: keyof Colors }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

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
          marginTop: { xs: 1, sm: "inherit", lg: "inherit" },
          width: { xs: "inherit", sm: "50%", lg: "50%" },
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
            sx={{
              background:
                (userUiPreferences && userUiPreferences.colors[type]) ||
                "#000000",
              minWidth: 0,
              width: { xs: "2rem", sm: "2.5rem" },
              height: { xs: "2rem", sm: "2.5rem" },
              borderRadius: "8px",
              border: "1px solid #797979",
            }}
          ></Box>
          <Typography
            sx={{
              border: "1px solid #797979",
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
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <ChromePicker
              color={userUiPreferences && userUiPreferences?.colors[type]}
              onChangeComplete={(color) => {
                handleColorChange(color.hex, type);
              }}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default ColorSelectionSection;
