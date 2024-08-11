import { Container } from "@mui/material";

const QRCodeFrameComponent = ({ QRCodeComponent }) => {
  return <Container className="qr-code-frame">{QRCodeComponent}</Container>;
};
export default QRCodeFrameComponent;
