import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { Container } from "@mui/material";

const CustomQRCodeComponent = ({
  value = "",
  size = 400,
  margin = 0,
  dotsOptions = {},
  cornersSquareOptions = {},
  cornersDotOptions = {},
  backgroundOptions = { color: "#fff" },
  imageOptions = { hideBackgroundDots: true, imageSize: 0.7, margin: 1 },
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
      image: imageSrc,
    });
    qrCode.append(qrRef.current);
  }, [value, dotsOptions, cornersSquareOptions, cornersDotOptions, imageSrc]);

  return <Container sx={{ width: "fit-content", padding: 0 }} ref={qrRef} />;
};
export default CustomQRCodeComponent;
