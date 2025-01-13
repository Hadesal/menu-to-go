import {
  Button,
  Container,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ChromePicker } from "react-color";
import { useTranslation } from "react-i18next";

interface options {
  type: string;
  color: string;
}
interface StyleControlProps {
  optionName: string;
  options: options;
  label: string;
  choices: { value: string; label: string }[];
  updateOptions: (optionName: string, value: object) => void;
}

const StyleControl: React.FC<StyleControlProps> = ({
  optionName,
  options = { type: "", color: "" },
  label,
  choices,
  updateOptions,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { t } = useTranslation();
  const getString = t;
  const [pickerPosition, setPickerPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    updateOptions(optionName, { type: event.target.value });
  };

  const handleColorChange = (color: string) => {
    updateOptions(optionName, { color });
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const offset = 320;

    setPickerPosition({
      top: -240,
      left: buttonRect.left - offset,
    });

    toggleColorPicker();
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
          height: "fit-content",
          minWidth: "200px",
          alignSelf: { xs: "flex-start", sm: "inherit" },
          backgroundColor: options.color,
        }}
        onClick={handleButtonClick}
      >
        {getString("chooseColorLabel")}
      </Button>
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
