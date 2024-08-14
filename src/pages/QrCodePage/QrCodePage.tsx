import {
  Button,
  Card,
  CardContent,
  Container,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CustomQRCodeComponent from "./CustomQRCodeComponent";
import { useRef, useState } from "react";
import logo from "../../assets/logo.svg";
import html2canvas from "html2canvas";
import { SketchPicker } from "react-color";
import "./qrcodeStyle.css";
import QRCodeFrameComponent from "./QRCodeFrameComponent";
import InputFileUpload from "../../components/UploadFileInput/UploadFileInputComponent";
import Dropzone from "../../components/Dropzone";
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

  const [imageSrc, setImageSrc] = useState(logo);
  const frameRef = useRef(null);
  const downloadImage = async () => {
    const canvas = await html2canvas(frameRef.current);
    const image = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.href = image;
    link.download = "qr-code-frame.jpeg";
    link.click();
  };
  //TODO INTEGRATE REDUX AND SAVE VALUES TO REDUX
  const updateOptions = (optionName: string, value: object) => {
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
      default:
        break;
    }
  };

  const toggleColorPicker = (optionName: string) => {
    setShowColorPicker(!showColorPicker);
    setActiveColorPicker(optionName);
  };

  const renderStyleControl = (
    optionName: string,
    options: any,
    setOptionsFunc: any,
    label: string,
    choices: object[]
  ) => {
    const handleSelectChange = (event: any) => {
      setOptionsFunc;
      updateOptions(optionName, { type: event.target.value });
    };

    const handleColorChange = (color: any) => {
      updateOptions(optionName, { color: color.hex });
    };

    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "",
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
            {choices.map((choice: any) => (
              <MenuItem key={choice.value} value={choice.value}>
                {choice.label}
              </MenuItem>
            ))}
          </Select>
        </Container>
        <Button
          sx={{ width: "200px", height: "fit-content" }}
          onClick={() => toggleColorPicker(optionName)}
        >
          Choose Color
        </Button>
        {showColorPicker && activeColorPicker === optionName && (
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              left: "55%",
              top: "30%",
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
  const handlefileUploaded = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const src = URL.createObjectURL(file);
      console.log(file);
      console.log(src);
      setImageSrc(src);
    }
  };

  return (
    <Stack
      direction={"row"}
      spacing={3}
      sx={{
        width: "95%",
        margin: "0 auto",
      }}
    >
      <Container
        className="qrCodeStyleCardsContainer"
        sx={{
          borderRadius: "2rem",
          boxShadow: "0 0 40px rgba(0, 0, 0, 0.2)",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          className="qrCodeStyleCardsContainerTitle"
          variant="h5"
          sx={{ width: "fit-content", margin: 1 }}
        >
          Qr Style
        </Typography>
        {/**Dots Style Card */}
        <Card
          className="dotsStyleCard"
          sx={{ marginBottom: "1rem", width: "100%" }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: 0,
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
        {/**Corner square Style Card */}
        <Card
          className="cornerSquareStyleCard"
          sx={{ marginBottom: "1rem", width: "100%" }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: 0,
            }}
          >
            {renderStyleControl(
              "cornersSquare",
              cornersSquareOptions,
              setCornersSquareOptions,
              "Corner square Style",
              [
                { value: "dot", label: "dot" },
                { value: "square", label: "square" },
                { value: "extra-rounded", label: "extra-rounded" },
              ]
            )}
          </CardContent>
        </Card>
        {/**Corners Dots Style Card */}
        <Card
          className="CornersDotsStyleCard"
          sx={{ marginBottom: "1rem", width: "100%" }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: 0,
            }}
          >
            {renderStyleControl(
              "cornersDot",
              cornersDotOptions,
              setCornersDotOptions,
              "Corners Dots Style",
              [
                { value: "dot", label: "dot" },
                { value: "square", label: "square" },
              ]
            )}
          </CardContent>
        </Card>
        {/* <InputFileUpload
          label={"Upload Logo"}
          handlefileUploaded={handlefileUploaded}
        /> */}
        <Dropzone
          onFileUpload={(file) =>
            handlefileUploaded({ target: { files: [file] } })
          }
        />
      </Container>

      <Container
        className="MainQrSection"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container
          sx={{
            margin: "10px",
            paddingTop: "30px",
            paddingBottom: "30px",
            borderRadius: "2rem",
            boxShadow: "0 0 40px rgba(0, 0, 0, 0.2)",
            width: "fit-content",
          }}
          ref={frameRef}
        >
          <QRCodeFrameComponent
            QRCodeComponent={
              <CustomQRCodeComponent
                value={urlPath}
                dotsOptions={dotsOptions}
                cornersSquareOptions={cornersSquareOptions}
                cornersDotOptions={cornersDotOptions}
                imageSrc={imageSrc}
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
            width: "200px",
            height: "50px",
            borderRadius: "1.5rem",
          }}
          onClick={downloadImage}
        >
          Download
        </Button>
      </Container>
    </Stack>
  );
};
export default QrCodePage;
