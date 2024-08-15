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
  Alert,
  Snackbar,
} from "@mui/material";
import CustomQRCodeComponent from "./CustomQRCodeComponent";
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.svg";
import html2canvas from "html2canvas";
import { SketchPicker } from "react-color";
import "./qrcodeStyle.css";
import QRCodeFrameComponent from "./QRCodeFrameComponent";
import Dropzone from "../../components/Dropzone";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { useTranslation } from "react-i18next";
import { createOrUpdateQrCode } from "../../redux/slices/userSlice";

interface DotsOptionsObject {
  color: string;
  type:
    | "dots"
    | "rounded"
    | "classy"
    | "classy-rounded"
    | "square"
    | "extra-rounded";
}
interface CornerSquareOptionsObject {
  color: string;
  type: "dot" | "square" | "extra-rounded";
}
interface CornerDotsOptionsObject {
  color: string;
  type: "dot" | "square";
}

const QrCodePage = () => {
  const dispatch = useAppDispatch();
  const { userList } = useAppSelector((state) => state.userData);
  const userData = userList[0];
  const { qrCodeStyle, id } = userData;
  const { t } = useTranslation();
  const getString = t;
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [urlPath, setUrlPath] = useState<string>(
    qrCodeStyle.generalUrlPath
      ? qrCodeStyle.generalUrlPath
      : "https://www.youtube.com/watch?v=-XqDJZ3zeWs"
  );
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeColorPicker, setActiveColorPicker] = useState("");
  const [dotsOptions, setDotsOptions] = useState<DotsOptionsObject>(
    qrCodeStyle?.dotsOptions
      ? qrCodeStyle.dotsOptions
      : {
          color: "#77675",
          type: "rounded",
        }
  );
  const [cornersSquareOptions, setCornersSquareOptions] =
    useState<CornerSquareOptionsObject>(
      qrCodeStyle?.cornersSquareOptions
        ? qrCodeStyle.cornersSquareOptions
        : {
            color: "#000000",
            type: "extra-rounded",
          }
    );
  const [cornersDotOptions, setCornersDotOptions] =
    useState<CornerDotsOptionsObject>(
      qrCodeStyle?.cornersDotOptions
        ? qrCodeStyle.cornersDotOptions
        : {
            color: "#4267b2",
            type: "dot",
          }
    );

  const [imageSrc, setImageSrc] = useState<string>(
    qrCodeStyle?.imageSrc ? qrCodeStyle.imageSrc : logo
  );
  const frameRef = useRef(null);

  useEffect(() => {}, [userData]);
  const handlePushNewQrStyle = () => {
    const newQrStyleObject = {
      dotsOptions,
      cornersSquareOptions,
      cornersDotOptions,
      imageSrc,
      generalUrlPath: urlPath,
    };
    const hasChanged =
      JSON.stringify(newQrStyleObject.dotsOptions) !==
        JSON.stringify(qrCodeStyle.dotsOptions) ||
      JSON.stringify(newQrStyleObject.cornersSquareOptions) !==
        JSON.stringify(qrCodeStyle.cornersSquareOptions) ||
      JSON.stringify(newQrStyleObject.cornersDotOptions) !==
        JSON.stringify(qrCodeStyle.cornersDotOptions) ||
      newQrStyleObject.imageSrc !== qrCodeStyle.imageSrc ||
      newQrStyleObject.generalUrlPath !== urlPath;
    if (!hasChanged) {
      setErrorMessage(getString("noDataChanged"));
      setOpen(true);

      return;
    }

    dispatch(
      createOrUpdateQrCode({ userId: id, qrCodeStyle: newQrStyleObject })
    );
  };
  const downloadImage = async () => {
    const canvas = await html2canvas(frameRef.current);
    const image = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.href = image;
    link.download = "qr-code.jpeg";
    link.click();
  };
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

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
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
          {getString("qrStyle")}
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
              getString("dotsStyle"),
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
              getString("cornerSquareStyle"),
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
              getString("cornersDotsStyle"),
              [
                { value: "dot", label: "dot" },
                { value: "square", label: "square" },
              ]
            )}
          </CardContent>
        </Card>

        <Dropzone
          onFileUpload={(file) =>
            handlefileUploaded({ target: { files: [file] } })
          }
        />

        <Button
          variant="contained"
          sx={{
            justifySelf: "end",
            alignSelf: "end",
            margin: 2,
            width: "200px",
            height: "50px",
            borderRadius: "1.5rem",
          }}
          onClick={handlePushNewQrStyle}
        >
          {getString("save")}
        </Button>
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
          {getString("download")}
        </Button>
      </Container>
    </Stack>
  );
};
export default QrCodePage;
