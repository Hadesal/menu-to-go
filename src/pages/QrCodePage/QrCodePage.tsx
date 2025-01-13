/* eslint-disable @typescript-eslint/no-explicit-any */
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import logo from "@assets/logo.svg";
import Dropzone from "@components/common/Dropzone";
import ToastNotification from "@components/common/ToastNotification/ToastNotification.tsx";
import {
  CornerDotsOptionsDataType,
  CornerSquareOptionsDataType,
  DotsOptionsDataType,
} from "@dataTypes/QrStyleDataType";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import html2canvas from "html2canvas";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { createOrUpdateQrCode } from "../../redux/thunks/userThunks";
import CustomQRCodeComponent from "./CustomQRCodeComponent";
import "./qrcodeStyle.css";
import StyleControl from "./StyleControl";
import { useLanguage } from "src/hooks/useLanguage";

const QrCodePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userData);
  const { qrCodeStyle, id } = user;
  const { getString, currentLanguage } = useLanguage();

  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openToastMessage, setOpenToastMessage] = useState(false);
  const { restaurantList } = useAppSelector((state) => state.restaurantsData);
  const { loading, successMessage } = useAppSelector((state) => state.userData);
  const [dotsOptions, setDotsOptions] = useState<DotsOptionsDataType>({
    color: "#77675",
    type: "rounded",
  });
  const [cornersSquareOptions, setCornersSquareOptions] =
    useState<CornerSquareOptionsDataType>({
      color: "#000000",
      type: "extra-rounded",
    });
  const [cornersDotOptions, setCornersDotOptions] =
    useState<CornerDotsOptionsDataType>({
      color: "#4267b2",
      type: "dot",
    });
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>(
    restaurantList[0]?.id || ""
  );

  const [toastMessageObject, setToastMessageObject] = useState<{
    success: boolean;
    message: string;
    show: boolean;
  }>({
    success: true,
    message: "",
    show: openToastMessage,
  });

  const [urlPath, setUrlPath] = useState<string>(
    `https://menutogo.at/menu/${selectedRestaurantId}`
  );
  const [imageSrc, setImageSrc] = useState<string>(logo);
  const frameRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  const handleToastClose = () => {
    setToastMessageObject((prev) => ({ ...prev, show: false }));
  };

  const handlePushNewQrStyle = async () => {
    const newQrStyleObject = {
      dotsOptions,
      cornersSquareOptions,
      cornersDotOptions,
      imageSrc,
      generalUrlPath: urlPath,
    };
    if (!newQrStyleObject) {
      setErrorMessage(getString("noQrCodeStyleObject"));
      setOpen(true);
      return;
    }
    const hasChanged =
      JSON.stringify(newQrStyleObject.dotsOptions) !==
        JSON.stringify(qrCodeStyle?.dotsOptions || {}) ||
      JSON.stringify(newQrStyleObject.cornersSquareOptions) !==
        JSON.stringify(qrCodeStyle?.cornersSquareOptions || {}) ||
      JSON.stringify(newQrStyleObject.cornersDotOptions) !==
        JSON.stringify(qrCodeStyle?.cornersDotOptions || {}) ||
      newQrStyleObject.imageSrc !== (qrCodeStyle?.imageSrc || "") ||
      newQrStyleObject.generalUrlPath !== (qrCodeStyle?.generalUrlPath || "");
    if (!hasChanged) {
      setErrorMessage(getString("noDataChanged"));
      setOpen(true);

      return;
    }

    const result = await dispatch(
      createOrUpdateQrCode({ userId: id, qrCodeStyle: newQrStyleObject })
    );

    console.log(result);
    if (createOrUpdateQrCode.fulfilled.match(result)) {
      setToastMessageObject({
        success: true,
        message: successMessage as string,
        show: true,
      });
    } else {
      setToastMessageObject({
        success: false,
        message: (result.error.message as string) || "QR code update failed",
        show: true,
      });
    }
  };

  const handleOnRestaurantChange = (event: any) => {
    const selectedId = event.target.value as string;
    setSelectedRestaurantId(selectedId);
    const selectedRestaurant = restaurantList.find(
      (restaurant) => restaurant.id === selectedId
    );
    setUrlPath(`http://192.168.1.203:5173/menu/${selectedRestaurant?.id}`);
  };
  const downloadImage = async () => {
    if (!frameRef.current) {
      setErrorMessage("QR code frame is not available.");
      setOpen(true);
      return;
    }
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

  const handleClose = (_: any, reason?: string) => {
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

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(urlPath).then(
      () => {
        setOpenToastMessage(true);
        setToastMessageObject({
          success: true,
          message: "URL copied to clipboard!",
          show: true,
        });
      },
      () => {
        setOpenToastMessage(true);
        setToastMessageObject({
          success: false,
          message: "Failed to copy the URL.",
          show: true,
        });
      }
    );
  };

  useEffect(() => {
    if (user && user.qrCodeStyle) {
      const { qrCodeStyle } = user;
      setUrlPath(qrCodeStyle.generalUrlPath || "www.google.com");
      setDotsOptions(qrCodeStyle.dotsOptions);
      setCornersSquareOptions(qrCodeStyle.cornersSquareOptions);
      setCornersDotOptions(qrCodeStyle.cornersDotOptions);
      setImageSrc(qrCodeStyle.imageSrc);
    }
    if (restaurantList[0].id) {
      setSelectedRestaurantId(restaurantList[0].id);
    }
  }, [user, restaurantList]);
  useEffect(() => {}, [dispatch]);

  return (
    <Stack spacing={3} sx={{ width: "95%", margin: "0 auto" }}>
      <Backdrop
        sx={{
          color: "var(--primary-color)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "0 !important",
        }}
      >
        <Typography variant="h5" sx={{ alignSelf: "end" }}>
          {getString("qrStyle")}
        </Typography>

        <Box sx={{ width: "25%" }}>
          <InputLabel id="restaurant-select-label">
            {getString("selectRestaurantDropDownLabel")}
          </InputLabel>

          <Select
            labelId="restaurantDropdownLabel"
            id="restaurantDropdownId"
            value={selectedRestaurantId}
            onChange={handleOnRestaurantChange}
            sx={{ width: "100%" }}
          >
            {restaurantList &&
              restaurantList.map((restaurantItem) => (
                <MenuItem key={restaurantItem.id} value={restaurantItem.id}>
                  {restaurantItem.name}
                </MenuItem>
              ))}
          </Select>
        </Box>
      </Box>

      <Divider
        sx={{
          marginTop: "1rem",
        }}
      />
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
        id="mainContainer"
        disableGutters
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "column", xl: "row" },
          justifyContent: "space-between",
          padding: "0 !important",
          margin: "0 !important",
          minWidth: "inherit !important",
          maxWidth: "inherit !important",
          gap: 4,
        }}
      >
        <Container
          className="qrCodeStyleCardsContainer"
          sx={{
            borderRadius: "2rem",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: "3rem",
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
          }}
        >
          <Accordion
            elevation={6}
            sx={{
              width: "100%",
              padding: 1,
              borderRadius: "15px",
              borderTopLeftRadius: "15px !important",
              borderTopRightRadius: "15px !important",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
              sx={{ fontSize: "1.1rem" }}
            >
              {getString("qrCodeLogo")}
            </AccordionSummary>
            <AccordionDetails>
              <Dropzone
                onFileUpload={(file) =>
                  handlefileUploaded({ target: { files: [file] } })
                }
                acceptedFileTypes={"image"}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            defaultExpanded
            elevation={6}
            sx={{
              width: "100%",
              padding: 1,
              borderRadius: "15px",
              marginTop: "1rem",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ fontSize: "1.1rem" }}
            >
              {getString("dotsStyle")}
            </AccordionSummary>
            <AccordionDetails>
              <StyleControl
                optionName="dots"
                options={dotsOptions}
                label={getString("qrCodeStyle")}
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
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={6}
            sx={{
              width: "100%",
              marginTop: "1rem",
              padding: 1,
              borderRadius: "15px",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ fontSize: "1.1rem" }}
            >
              {getString("cornerSquareStyle")}
            </AccordionSummary>
            <AccordionDetails>
              <StyleControl
                optionName="cornersSquare"
                options={cornersSquareOptions}
                label={getString("qrCodeStyle")}
                choices={[
                  { value: "dot", label: "Dot" },
                  { value: "square", label: "Square" },
                  { value: "extra-rounded", label: "Extra Rounded" },
                ]}
                updateOptions={updateOptions}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={6}
            sx={{
              width: "100%",
              marginTop: "1rem",
              padding: 1,
              borderRadius: "15px",
              borderBottomLeftRadius: "15px !important",
              borderBottomRightRadius: "15px !important",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
              sx={{ fontSize: "1.1rem" }}
            >
              {getString("cornersDotsStyle")}
            </AccordionSummary>
            <AccordionDetails>
              <StyleControl
                optionName="cornersDot"
                options={cornersDotOptions}
                label={getString("qrCodeStyle")}
                choices={[
                  { value: "dot", label: "Dot" },
                  { value: "square", label: "Square" },
                ]}
                updateOptions={updateOptions}
              />
            </AccordionDetails>
          </Accordion>
          <Button
            variant="contained"
            sx={{
              alignSelf: "end",
              width: "200px",
              height: "50px",
              borderRadius: "1.5rem",
              marginTop: 2,
            }}
            onClick={handlePushNewQrStyle}
          >
            {getString("save")}
          </Button>
        </Container>

        <Container
          disableGutters
          className="MainQrSection"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "3rem",
            padding: "0 !important",
          }}
        >
          <Alert
            dir={currentLanguage === "ar" ? "rtl" : ""}
            sx={{ width: "100%" }}
            severity="info"
          >
            {getString("qrSectionInfo")}
          </Alert>
          <Container
            disableGutters
            sx={{
              padding: "20px",
              borderRadius: "2rem",
              boxShadow: "0 0 40px rgba(0, 0, 0, 0.2)",
              width: "fit-content",
              marginTop: 2,
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },

              marginTop: 1,
            }}
          >
            <Tooltip arrow title={getString("download")}>
              <IconButton onClick={downloadImage}>
                <SimCardDownloadIcon sx={{ color: "var(--primary-color)" }} />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title={getString("copy")}>
              <IconButton onClick={handleCopyToClipboard}>
                <ContentCopyIcon sx={{ color: "var(--primary-color)" }} />
              </IconButton>
            </Tooltip>

            <Tooltip arrow title={urlPath}>
              <Typography
                sx={{
                  color: "var(--primary-color)",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {urlPath}
              </Typography>
            </Tooltip>
          </Box>
        </Container>
      </Container>
      <ToastNotification
        severity={toastMessageObject.success === true ? "success" : "error"}
        message={toastMessageObject.message}
        show={toastMessageObject.show}
        onClose={handleToastClose}
      />
    </Stack>
  );
};
export default QrCodePage;
