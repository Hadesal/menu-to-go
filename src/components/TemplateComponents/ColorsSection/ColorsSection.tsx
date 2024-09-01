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
import { useRef, useState } from "react";
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
        sx={{ borderRadius: "2rem", marginTop: "3rem" }}
      >
        <Card
          id="colorsStylingContainer"
          sx={{
            borderRadius: "2rem",
          }}
        >
          <CardContent>
            <Typography
              sx={{ marginBottom: "1rem", marginTop: "1rem", color: "#797979" }}
              variant="h5"
            >
              {getString("colors")}
            </Typography>
            <Container
              id="colorsSection"
              sx={{
                width: "25vw",
                display: "flex",
                paddingLeft: {
                  xs: 0,
                  sm: 0,
                  md: 0,
                },
                paddingRight: {
                  xs: 0,
                  sm: 0,
                  md: 0,
                },
                margin: 0,
                marginRight: "3rem",
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
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "2rem",
                    marginLeft: "1rem",
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
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "2rem",
                  marginLeft: "1rem",
                }}
                onClick={toggleColorPicker}
              ></Button>
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
                  <HexColorPicker
                    color={selectedColor}
                    onChange={handleColorChange}
                  />
                </div>
              )}
            </Container>
            <Typography
              variant="body1"
              sx={{ color: "#797979", marginTop: "2rem" }}
            >
              {getString("applyAccentColor")}
            </Typography>
            <Container
              id="checkBoxesContainerid"
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "auto",
                margin: 0,
                padding: 0,
                paddingLeft: {
                  xs: 0,
                  sm: 0,
                  md: 0,
                },
                paddingRight: {
                  xs: 0,
                  sm: 0,
                  md: 0,
                },
              }}
            >
              <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                {checkBoxesList.map((value, index) => (
                  <FormControlLabel
                    sx={{ color: "#797979" }}
                    control={
                      <Checkbox
                        sx={{
                          color: "#A4755D",
                          "& .MuiSvgIcon-root": { fontSize: 35 },
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
