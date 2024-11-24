import { Button, Container, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ChromePicker } from "react-color";

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
      disableGutters
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
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
          // label={label}
          sx={{ width: "100%", alignSelf: "start", marginTop: 1 }}
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
          marginTop: 1,
          // width: "200px",
          height: "fit-content",
          minWidth: "200px",
          alignSelf: { xs: "flex-start", sm: "inherit" },
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
          <ChromePicker
            color={options.color}
            onChangeComplete={(color) => {
              handleColorChange(color.hex);
            }}
          />
        </div>
      )}
    </Container>
  );
};

export default StyleControl;
