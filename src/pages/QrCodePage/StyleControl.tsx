import React, { useState, useEffect, useRef } from "react";
import { Container, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { HexColorPicker } from "react-colorful"; // Import from react-colorful

interface StyleControlProps {
  optionName: string;
  options: any;
  label: string;
  choices: { value: string; label: string }[];
  updateOptions: (optionName: string, value: object) => void;
}

const StyleControl: React.FC<StyleControlProps> = ({
  optionName,
  options,
  label,
  choices,
  updateOptions,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleSelectChange = (event: any) => {
    updateOptions(optionName, { type: event.target.value });
  };

  const handleColorChange = (color: string) => {
    updateOptions(optionName, { color });
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  // Close the color picker when clicking outside of it or on the button again
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "",
        position: "relative", // Add relative positioning for the parent container
      }}
    >
      <Container
        className="dropdownContainer"
        sx={{
          "&.dropdownContainer": {
            paddingLeft: 0,
          },
        }}
      >
        <InputLabel id={`${optionName}-type-label`}>{label}</InputLabel>
        <Select
          labelId={`${optionName}-type-label`}
          id={`${optionName}-type-select`}
          value={options.type}
          onChange={handleSelectChange}
          label={label}
          sx={{ width: "100%", alignSelf: "start" }}
        >
          {choices.map((choice) => (
            <MenuItem key={choice.value} value={choice.value}>
              {choice.label}
            </MenuItem>
          ))}
        </Select>
      </Container>
      <Button
        ref={buttonRef}
        sx={{
          width: "200px",
          height: "fit-content",
          backgroundColor: options.color,
        }}
        onClick={toggleColorPicker}
      >
        Choose Color
      </Button>
      {showColorPicker && (
        <div
          ref={colorPickerRef}
          style={{
            position: "fixed",
            zIndex: 2,
            left: "calc(50% + 150px)",
            top: "20%",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            padding: "10px",
          }}
        >
          <HexColorPicker color={options.color} onChange={handleColorChange} />
        </div>
      )}
    </Container>
  );
};

export default StyleControl;
