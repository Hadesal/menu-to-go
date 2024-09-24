import { Typography, Container, Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { updateRestaurantUserUiPreferences } from "../../../redux/slices/restaurantsSlice";
const defaultColorsList = [
  { id: 0, color: "#A4755D" },
  { id: 1, color: "#D9B18F" },
  { id: 2, color: "#4B49A6" },
  { id: 3, color: "#802571" },
];
const ColorSelectionSection = ({ type }: { type: string }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };
  const { t } = useTranslation();
  const getString = t;
  const dispatch = useAppDispatch();
  const { userUiPreferences } = useAppSelector(
    (state) => state.restaurantsData.selectedRestaurant
  );

  useEffect(() => {
    if (buttonRef.current) {
      const { top, left } = buttonRef.current.getBoundingClientRect();
      setPosition({ top, left });
    }

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
  }, [buttonRef, colorPickerRef, userUiPreferences]);

  const handleColorChange = (newColor: string, type: string) => {
    dispatch(
      updateRestaurantUserUiPreferences({
        ...userUiPreferences,
        colors: {
          ...userUiPreferences.colors,
          [type === "Text" ? "secondaryColor" : "primaryColor"]: newColor,
        },
      })
    );
  };

  return (
    <>
      <Typography
        sx={{
          marginBottom: "1rem",
          marginTop: "1rem",
          color: "#797979",
          textAlign: "left",
        }}
        variant="h5"
      >
        {type === "Text" ? getString("Text") : getString("Background")}
      </Typography>
      <Container
        id={`${type}ColorsSection`}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 0,
          marginBottom: "1rem",
        }}
      >
        {defaultColorsList.map((item, index) => {
          return (
            <Button
              key={index}
              id={`${type}ColorStylingButtonId`}
              onClick={() => handleColorChange(item.color, type)}
              className="colorStylingButton"
              variant="contained"
              sx={{
                background: item.color,
                minWidth: 0,
                width: { xs: "2rem", sm: "2.5rem" },
                height: { xs: "2rem", sm: "2.5rem" },
                borderRadius: "2rem",
                cursor: "pointer",
                border:
                  (type === "Text"
                    ? userUiPreferences.colors?.secondaryColor
                    : userUiPreferences.colors?.primaryColor) === item.color
                    ? "solid"
                    : "none",
                borderColor: "#d57e2e",
                marginLeft: "1rem",
                marginBottom: "1rem",
              }}
            />
          );
        })}
        <Button
          ref={buttonRef}
          sx={{
            background:
              "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
            minWidth: 0,
            width: { xs: "2rem", sm: "2.5rem" },
            height: { xs: "2rem", sm: "2.5rem" },
            borderRadius: "2rem",
            marginLeft: "1rem",
            marginBottom: "1rem",
            cursor: "pointer",
            border: "none",
            borderColor: "#d57e2e",
          }}
          onClick={toggleColorPicker}
        ></Button>
        {showColorPicker && (
          <div
            ref={colorPickerRef}
            style={{
              position: "fixed",
              zIndex: 2,
              left: position.left + 50,
              top: position.top,
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              padding: "10px",
            }}
          >
            <HexColorPicker
              color={
                type === "Text"
                  ? userUiPreferences.colors?.secondaryColor
                  : userUiPreferences.colors?.primaryColor
              }
              onChange={(newColor) => handleColorChange(newColor, type)}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default ColorSelectionSection;
