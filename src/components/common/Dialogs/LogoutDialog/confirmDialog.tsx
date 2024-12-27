import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import logoutImage from "@assets/logoutImg.svg";
import { Styles } from "./confirmDialog.style";
import { useLanguage } from "src/hooks/useLanguage";

interface ConfirmDialogProps {
  isOpen: boolean;
  onPrimaryActionClick: () => void;
  onSecondaryActionClick?: () => void;
  onClose?: () => void; // Optional onClose prop
  width?: string;
  height?: string;
  title: string;
  subTitle: string;
  showImg: boolean;
  secondaryActionText?: string;
  primaryActionText?: string;
}

const ConfirmDialog = ({
  isOpen,
  onPrimaryActionClick,
  onSecondaryActionClick,
  width,
  height,
  title,
  subTitle,
  showImg,
  secondaryActionText,
  primaryActionText,
  onClose,
}: ConfirmDialogProps) => {
  const handleSecondaryAction = () =>
    onSecondaryActionClick ? onSecondaryActionClick() : () => {};
  const handlePrimaryAction = () => onPrimaryActionClick();
  const { currentLanguage } = useLanguage();

  return (
    <Dialog
      dir={currentLanguage === "ar" ? "rtl" : ""}
      PaperProps={{ sx: { ...Styles.dialog, width: width, height: height } }}
      onClose={onClose}
      open={isOpen}
    >
      <DialogContent sx={{ alignContent: "center" }}>
        {showImg && (
          <img
            src={logoutImage}
            alt="Dialog Image"
            style={{ display: "block", margin: "0 auto" }}
            width={170}
            height={211}
          />
        )}
        <Typography
          width={"100%"}
          variant="h6"
          textAlign={"center"}
          sx={Styles.title}
        >
          {title}
        </Typography>
        <Typography
          width={"100%"}
          variant="subtitle2"
          textAlign={"center"}
          sx={Styles.subTitle}
        >
          {subTitle}
        </Typography>
        <Box sx={Styles.actionBox} justifyContent={"center"}>
          {secondaryActionText && (
            <Button
              variant="outlined"
              onClick={handleSecondaryAction}
              sx={Styles.secondaryActionButton}
            >
              {secondaryActionText}
            </Button>
          )}
          {primaryActionText && (
            <Button
              variant="contained"
              onClick={handlePrimaryAction}
              sx={Styles.primaryActionButton}
            >
              {primaryActionText}
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
