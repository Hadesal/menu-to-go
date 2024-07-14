import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  styled,
  IconButton,
  Typography,
} from "@mui/material";
import { Styles } from "./addItemDialog.styles";
import InputComponent from "../../InputComponent/InputComponent";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "../../../assets/material-symbols_image-outline (1).svg"; // Adjust the path as necessary

interface AddItemDialogProps {
  isOpen: boolean;
  title: string;
  cancelText: string;
  confirmText: string;
  errorMessage: string;
  onConfirmClick: (data: { name: string; image: string | null }) => void;
  onCancelClick: () => void;
  fileUpload?: boolean;
}

const MAX_FILE_SIZE_MB = 2; // Maximum file size in MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/svg+xml"]; // only accepted extensions

interface dialogData {
  name: string;
  image: string | null;
}
const AddItemDialog = ({
  isOpen,
  title,
  cancelText,
  confirmText,
  onConfirmClick,
  onCancelClick,
  errorMessage,
  fileUpload,
}: AddItemDialogProps) => {
  const [dialogData, setDialogData] = useState<dialogData>({
    name: "",
    image: null,
  });

  const [showError, setShowError] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);

  /**
   * A function that handles the dialog confirm action
   *
   */
  const handleConfirm = () => {
    if (dialogData.name.length === 0) {
      // Show name input error
      setShowError(true);
      return;
    }
    if (fileUpload && imageError) {
      return;
    }

    onConfirmClick(dialogData);
    handleCancel();
  };

  /**
   * A function that handles the dialog cancel action
   *
   */
  const handleCancel = () => {
    // setDialogData({
    //   ...dialogData,
    //   image: null,
    // });
    setDialogData({ name: "", image: null });
    // clear all error
    setImageError(null);
    setShowError(false);
    onCancelClick();
  };

  /**
   * A function that handles and validates image uploads, processing the uploaded file
   * if it meets the criteria.
   *
   * @param uploadEvent The event object triggered by the file input change.
   */
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const fileSizeMB = file.size / (1024 * 1024);

      // check if the uploaded file matches our file type (e.g png , jpg , svg )
      if (!ALLOWED_FILE_TYPES.includes(fileType)) {
        setImageError("Only PNG, JPG, and SVG files are allowed.");
        return;
      }

      // check if the uploaded file size doesn't exceed our file size limit
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setImageError(`File size exceeds ${MAX_FILE_SIZE_MB} MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setDialogData({
          ...dialogData,
          image: reader.result as string,
        });
        setImageError(null); // Clear any previous errors
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * A function that handles clearing the uploaded image
   * @param event
   */
  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setDialogData({
      ...dialogData,
      image: null,
    });
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Dialog
      disableRestoreFocus
      PaperProps={{
        sx: {
          ...Styles.dialog,
          width: fileUpload ? "56.25rem" : "36.25rem",
          height: fileUpload ? "27.5rem" : "17.5rem",
        },
      }}
      onClose={handleCancel}
      open={isOpen}
    >
      <DialogTitle sx={Styles.title}>{title}</DialogTitle>
      {fileUpload && (
        <Box sx={Styles.fileUpload}>
          <label htmlFor="upload-button">
            {dialogData.image ? (
              <Box sx={Styles.uploadedImageWrapper}>
                <img
                  src={dialogData.image}
                  alt="Uploaded"
                  style={{ width: 100, height: 100, borderRadius: "50%" }}
                />
                <IconButton
                  onClick={handleRemoveImage}
                  sx={Styles.closeIconButton}
                >
                  <CloseIcon sx={Styles.closeIcon} />
                </IconButton>
              </Box>
            ) : (
              <Box sx={Styles.imageWrapper}>
                <Box sx={Styles.imageContainer}>
                  <img
                    src={UploadIcon}
                    alt="Upload Icon"
                    style={{ width: 40, height: 40 }}
                  />
                </Box>
              </Box>
            )}
          </label>

          {imageError && (
            <Typography color="error" variant="caption" sx={Styles.imageError}>
              {imageError}
            </Typography>
          )}
          <Typography
            variant="body1"
            sx={{
              ...Styles.imageLabel,
              visibility: dialogData.image === null ? "visible" : "hidden",
            }}
          >
            Load Image
          </Typography>

          <VisuallyHiddenInput
            id="upload-button"
            type="file"
            onChange={handleImageUpload}
            accept={ALLOWED_FILE_TYPES.join(",")}
          />
        </Box>
      )}
      <Box sx={Styles.textFieldWrapper}>
        <InputLabel sx={Styles.textFieldLabelStyle}>Name</InputLabel>
        <InputComponent
          id="nameField"
          type="Name"
          label=""
          required
          textFieldStyle={Styles.textFieldStyle}
          InputPropStyle={Styles.inputPropStyle}
          onChange={(e) => {
            setDialogData({
              ...dialogData,
              name: e.target.value.trim(),
            });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              //e.stopPropagation();
              e.preventDefault();
              handleConfirm();
            }
          }}
          value={dialogData.name}
          error={showError ? true : false}
          helperText={showError ? errorMessage : ""}
        />
      </Box>
      <DialogContent sx={Styles.dialogContent}>
        <Box sx={Styles.actionBox}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={Styles.cancelButton}
          >
            {cancelText}
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={Styles.logoutButton}
          >
            {confirmText}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
