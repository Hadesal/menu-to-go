import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { Container } from "@mui/material";

const CustomQRCodeComponent = ({
  value = "",
  size = 500,
  margin = 10,
  dotsOptions = {},
  cornersSquareOptions = {},
  cornersDotOptions = {},
  backgroundOptions = {},
  imageOptions = { hideBackgroundDots: true, imageSize: 1, margin: 1 },
  imageSrc = "",
}) => {
  const qrCode = new QRCodeStyling({
    width: size,
    height: size,
    margin,
    dotsOptions,
    cornersSquareOptions,
    cornersDotOptions,
    backgroundOptions,
    imageOptions,
    image: imageSrc,
  });

  const qrRef = useRef(null);

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
    }
    qrCode.update({
      data: value,
      width: size,
      height: size,
      margin,
      dotsOptions,
      cornersSquareOptions,
      cornersDotOptions,
      backgroundOptions,
      imageOptions,
      image: imageSrc,
    });
    qrCode.append(qrRef.current);
  }, [
    value,
    size,
    margin,
    dotsOptions,
    cornersSquareOptions,
    cornersDotOptions,
    backgroundOptions,
    imageSrc,
  ]);

  return (
    <Container
      sx={{ padding: 0 }}
      style={{ width: "fit-content", height: "fit-content", margin: 0 }}
      ref={qrRef}
    />
  );
};
export default CustomQRCodeComponent;
