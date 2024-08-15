import {
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
  Alert,
  Snackbar,
  Divider,
} from "@mui/material";
import CustomQRCodeComponent from "./CustomQRCodeComponent";
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.svg";
import html2canvas from "html2canvas";
import "./qrcodeStyle.css";
import Dropzone from "../../components/Dropzone";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { useTranslation } from "react-i18next";
import { createOrUpdateQrCode } from "../../redux/slices/userSlice";
import StyleControl from "./StyleControl";

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
    const canvas = await html2canvas(frameRef.current, {
      backgroundColor: "#ffffff",
      scale: 1.5,
      useCORS: true,
    });
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
    <>
      <Typography
        sx={{ width: "fit-content", margin: 5, marginBottom: 2, marginTop: 3 }}
        variant="h5"
      >
        {getString("qrStyle")}
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />

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
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
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
              <StyleControl
                optionName="dots"
                options={dotsOptions}
                label={getString("dotsStyle")}
                choices={[
                  { value: "dots", label: "Dots" },
                  { value: "rounded", label: "Rounded" },
                  { value: "classy", label: "Classy" },
                  { value: "classy-rounded", label: "Classy Rounded" },
                  { value: "square", label: "Square" },
                  { value: "extra-rounded", label: "Extra Rounded" },
                ]}
                updateOptions={updateOptions}
              />
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
              <StyleControl
                optionName="cornersSquare"
                options={cornersSquareOptions}
                label={getString("cornerSquareStyle")}
                choices={[
                  { value: "dot", label: "Dot" },
                  { value: "square", label: "Square" },
                  { value: "extra-rounded", label: "Extra Rounded" },
                ]}
                updateOptions={updateOptions}
              />
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
              <StyleControl
                optionName="cornersDot"
                options={cornersDotOptions}
                label={getString("cornersDotsStyle")}
                choices={[
                  { value: "dot", label: "Dot" },
                  { value: "square", label: "Square" },
                ]}
                updateOptions={updateOptions}
              />
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
              padding: "50px",
              borderRadius: "2rem",
              boxShadow: "0 0 40px rgba(0, 0, 0, 0.2)",
              width: "fit-content",
            }}
            ref={frameRef}
          >
            <Container
              sx={{ backgroundColor: "#fffff" }}
              className="qr-code-frame"
            >
              <CustomQRCodeComponent
                value={urlPath}
                dotsOptions={dotsOptions}
                cornersSquareOptions={cornersSquareOptions}
                cornersDotOptions={cornersDotOptions}
                imageSrc={imageSrc}
              />
            </Container>
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
    </>
  );
};
export default QrCodePage;
