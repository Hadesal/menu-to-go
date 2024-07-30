import React from "react";
import { Box, IconButton, Typography, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "../../../assets/material-symbols_image-outline (1).svg"; // Adjust the path as necessary
import { Styles } from "./addItemDialog.styles";

const MAX_FILE_SIZE_MB = 2; // Maximum file size in MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/svg+xml"]; // only accepted extensions

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

interface FileUploadComponentProps {
  image: string | null;
  onImageChange: (image: string | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const FileUploadComponent = ({
  image,
  onImageChange,
  error,
  setError,
}: FileUploadComponentProps) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const fileSizeMB = file.size / (1024 * 1024);

      if (!ALLOWED_FILE_TYPES.includes(fileType)) {
        setError("Only PNG, JPG, and SVG files are allowed.");
        return;
      }

      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setError(`File size exceeds ${MAX_FILE_SIZE_MB} MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    onImageChange(null);
  };

  return (
    <Box sx={Styles.fileUpload}>
      <label htmlFor="upload-button">
        {image ? (
          <Box sx={Styles.uploadedImageWrapper}>
            <img
              src={image}
              alt="Uploaded"
              style={{ width: 150, height: 150, borderRadius: "50%" }}
            />
            <IconButton onClick={handleRemoveImage} sx={Styles.closeIconButton}>
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

      {error && (
        <Typography color="error" variant="caption" sx={Styles.imageError}>
          {error}
        </Typography>
      )}
      <Typography
        variant="body1"
        sx={{
          ...Styles.imageLabel,
          visibility: image === null ? "visible" : "hidden",
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
  );
};

export default FileUploadComponent;