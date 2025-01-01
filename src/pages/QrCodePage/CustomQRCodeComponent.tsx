import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { Container, useMediaQuery, useTheme } from "@mui/material";

const CustomQRCodeComponent = ({
  value = "google.com",
  size = { xs: 200, sm: 300 },
  margin = 0,
  dotsOptions = {},
  cornersSquareOptions = {},
  cornersDotOptions = {},
  backgroundOptions = { color: "#fff" },
  imageOptions = { hideBackgroundDots: true, imageSize: 0.7, margin: 1 },
  imageSrc = "",
}) => {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("sm"));

  // Determine the size dynamically based on screen size
  const qrSize = isMediumUp ? size.sm : size.xs;

  const qrCode = new QRCodeStyling({
    width: qrSize,
    height: qrSize,
    margin,
    dotsOptions,
    cornersSquareOptions,
    cornersDotOptions,
    backgroundOptions,
    imageOptions,
    image: imageSrc,
  });

  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
    }
    qrCode.update({
      data: value,
      width: qrSize,
      height: qrSize,
      margin,
      dotsOptions,
      cornersSquareOptions,
      cornersDotOptions,
      image: imageSrc,
    });
    qrCode.append(qrRef.current as HTMLElement);
  }, [
    value,
    qrSize,
    dotsOptions,
    cornersSquareOptions,
    cornersDotOptions,
    imageSrc,
  ]);

  return <Container sx={{ width: "fit-content", padding: 0 }} ref={qrRef} />;
};

export default CustomQRCodeComponent;
