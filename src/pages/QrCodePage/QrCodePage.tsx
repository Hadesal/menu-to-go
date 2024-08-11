import {
  Button,
  Card,
  CardContent,
  Container,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CustomQRCodeComponent from "./CustomQRCodeComponent";
import { useRef, useState } from "react";
import logo from "../../assets/logo.svg";
import html2canvas from "html2canvas";
import { SketchPicker } from "react-color";
import "./qrcodeStyle.css";
import QRCodeFrameComponent from "./QRCodeFrameComponent";
import { start } from "repl";
interface DotsOptionsObject {
  color: String;
  type:
    | "dots"
    | "rounded"
    | "classy"
    | "classy-rounded"
    | "square"
    | "extra-rounded";
}
interface CornerSquareOptionsObject {
  color: String;
  type: "dot" | "square" | "extra-rounded";
}
interface CornerDotsOptionsObject {
  color: String;
  type: "dot" | "square";
}
const QrCodePage = () => {
  const [urlPath, setUrlPath] = useState(
    "https://www.youtube.com/watch?v=-XqDJZ3zeWs"
  );
  const [dotsColor, setDotsColor] = useState("#000000");
  const [cornerSquareColor, setCornerSquareColor] = useState("#000000");
  const [cornerDotsColor, setCornerDotsColor] = useState("#000000");
  const [qrBackgroundColor, setQrBackgroundColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeColorPicker, setActiveColorPicker] = useState("");

  const [dotsOptions, setDotsOptions] = useState<DotsOptionsObject>({
    color: "#77675",
    type: "rounded",
  });
  const [cornersSquareOptions, setCornersSquareOptions] =
    useState<CornerSquareOptionsObject>({
      color: "#000000",
      type: "extra-rounded",
    });
  const [cornersDotOptions, setCornersDotOptions] =
    useState<CornerDotsOptionsObject>({
      color: "#4267b2",
      type: "dot",
    });
  const [backgroundOptions, setBackgroundOptions] = useState({
    color: "#ffffff",
  });

  const frameRef = useRef(null);

  const downloadImage = async () => {
    const canvas = await html2canvas(frameRef.current);
    const image = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.href = image;
    link.download = "qr-code-frame.jpeg";
    link.click();
  };

  const handleChangeComplete = (color: { hex: string }) => {
    setDotsColor(color.hex);
  };
  const handleColorChange = (color) => {
    setDotsColor(color.hex);
  };

  const updateOptions = (optionName, value) => {
    switch (optionName) {
      case "dots":
        setDotsOptions((prev) => ({ ...prev, ...value }));
        break;
      case "cornersSquare":
        setCornersSquareOptions((prev) => ({ ...prev, ...value }));
        break;
      case "cornersDot":
        setCornersDotOptions((prev) => ({ ...prev, ...value }));
        break;
      case "background":
        setBackgroundOptions((prev) => ({ ...prev, ...value }));
        break;
      default:
        break;
    }
  };

  const toggleColorPicker = (optionName) => {
    setShowColorPicker(!showColorPicker);
    setActiveColorPicker(optionName);
  };

  const renderStyleControl = (
    optionName,
    options,
    setOptionsFunc,
    label,
    choices
  ) => {
    const handleSelectChange = (event) => {
      updateOptions(optionName, { type: event.target.value });
    };

    const handleColorChange = (color) => {
      updateOptions(optionName, { color: color.hex });
    };

    return (
      <Container sx={{ margin: 0, padding: "0", width: "fit-content" }}>
        <InputLabel id={`${optionName}-type-label`}>{label}</InputLabel>
        <Select
          labelId={`${optionName}-type-label`}
          id={`${optionName}-type-select`}
          value={options.type}
          onChange={handleSelectChange}
          label={label}
          sx={{ width: "70%", alignSelf: "start" }}
        >
          {choices.map((choice) => (
            <MenuItem key={choice.value} value={choice.value}>
              {choice.label}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={() => toggleColorPicker(optionName)}>
          Choose Color
        </Button>
        {showColorPicker && activeColorPicker === optionName && (
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              left: "45%",
              top: "20%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              padding: "10px",
            }}
          >
            <SketchPicker color={options.color} onChange={handleColorChange} />
          </div>
        )}
      </Container>
    );
  };

  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 0,
        justifyContent: "space-between",
        margin: 0,
        position: "relative",
      }}
    >
      <Container
        sx={{
          margin: 0,
          borderRadius: "2rem",
          boxShadow: "0 0 40px rgba(2, 5, 1, 0.2)",
        }}
      >
        <Typography variant="h5" sx={{ width: "fit-content" }}>
          Qr Style
        </Typography>
        <Card sx={{ width: "20vw" }}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {renderStyleControl(
              "dots",
              dotsOptions,
              setDotsOptions,
              "Dots Style",
              [
                { value: "dots", label: "Dots" },
                { value: "rounded", label: "Rounded" },
                { value: "classy", label: "Classy" },
                { value: "classy-rounded", label: "Classy Rounded" },
                { value: "square", label: "Square" },
                { value: "extra-rounded", label: "Extra Rounded" },
              ]
            )}
          </CardContent>
        </Card>
      </Container>

      <Container
        className="MainQrSection"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignSelf: "center",
          padding: 0,
          marginTop: "20vh",
          alignItems: "center",
        }}
      >
        <Container
          sx={{
            margin: "10px",
            paddingTop: "30px",
            paddingBottom: "30px",
            borderRadius: "2rem",
            boxShadow: "0 0 40px rgba(2, 5, 1, 0.2)",
          }}
          ref={frameRef}
          className="frame-container"
        >
          <QRCodeFrameComponent
            QRCodeComponent={
              <CustomQRCodeComponent
                value={urlPath}
                dotsOptions={dotsOptions}
                cornersSquareOptions={cornersSquareOptions}
                cornersDotOptions={cornersDotOptions}
                backgroundOptions={backgroundOptions}
                imageSrc={logo}
              />
            }
          />
        </Container>
        <Button
          variant="contained"
          sx={{
            justifySelf: "center",
            alignSelf: "center",
            marginLeft: 3,
            marginTop: "5vh",
            width: "300px",
            height: "70px",
            borderRadius: "1.5rem",
          }}
          onClick={downloadImage}
        >
          Download
        </Button>
      </Container>
      <Container></Container>
    </Container>
  );
};
export default QrCodePage;
