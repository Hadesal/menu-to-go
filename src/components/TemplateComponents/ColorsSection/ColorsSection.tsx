import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import { HexColorPicker } from "react-colorful";
import { useEffect, useRef, useState } from "react";

const ColorsSection = () => {
  const { t } = useTranslation();
  const getString = t;
  const defaultColorsList = [
    { color: "#A4755D" },
    { color: "#D9B18F" },
    { color: "#4B49A6" },
    { color: "#802571" },
  ];
  const checkBoxesList = [
    { isChecked: false, value: getString("Text") },
    { isChecked: false, value: getString("Background") },
    { isChecked: false, value: getString("text&background") },
  ];
  const [selectedColor, setSelectedColor] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (buttonRef.current) {
      const { top, left } = buttonRef.current.getBoundingClientRect();
      setPosition({ top, left });
      console.log(top, left);
    }
  }, []);
  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <>
      <Paper
        id="colorsStylingContainerPaper"
        elevation={6}
        sx={{
          borderRadius: "2rem",
          marginTop: "1rem",
          width: "100%",
          height: "fit-content",
        }}
      >
        <Card
          id="colorsStylingContainer"
          sx={{
            borderRadius: "2rem",
          }}
        >
          <CardContent>
            <Typography
              sx={{
                marginBottom: "1rem",
                marginTop: "1rem",
                color: "#797979",
                textAlign: "left",
              }}
              variant="h5"
            >
              {getString("colors")}
            </Typography>
            <Container
              id="colorsSection"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: 0,
                marginBottom: "1rem",
              }}
            >
              {defaultColorsList.map((item, index) => (
                <Button
                  key={index}
                  id="colorStylingButtonId"
                  className="colorStylingButton"
                  variant="contained"
                  sx={{
                    border: "none",
                    background: item.color,
                    backgroundColor: item.color,
                    color: item.color,
                    minWidth: 0,
                    width: { xs: "2rem", sm: "2.5rem" },
                    height: { xs: "2rem", sm: "2.5rem" },
                    borderRadius: "2rem",
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                  }}
                />
              ))}
              <Button
                ref={buttonRef}
                sx={{
                  border: "none",
                  background:
                    "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
                  backgroundColor: selectedColor,
                  color: selectedColor,
                  minWidth: 0,
                  width: { xs: "2rem", sm: "2.5rem" },
                  height: { xs: "2rem", sm: "2.5rem" },
                  borderRadius: "2rem",
                  marginLeft: "1rem",
                  marginBottom: "1rem",
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
                    color={selectedColor}
                    onChange={handleColorChange}
                  />
                </div>
              )}
            </Container>
            <Typography
              variant="body1"
              sx={{
                color: "#797979",
                marginTop: "2rem",
                textAlign: "left",
              }}
            >
              {getString("applyAccentColor")}
            </Typography>
            <Container
              id="checkBoxesContainerid"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                marginTop: "1rem",
              }}
            >
              <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                {checkBoxesList.map((value, index) => (
                  <FormControlLabel
                    key={index}
                    sx={{ color: "#797979" }}
                    control={
                      <Checkbox
                        sx={{
                          color: "#A4755D",
                          "& .MuiSvgIcon-root": { fontSize: 25 },
                        }}
                        value={value.isChecked}
                        onChange={() => {}}
                      />
                    }
                    label={value.value}
                  />
                ))}
              </FormGroup>
            </Container>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default ColorsSection;
