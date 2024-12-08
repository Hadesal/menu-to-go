import React from "react";
import { Box, IconButton, Typography, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@assets/material-symbols_image-outline (1).svg"; // Adjust the path as necessary
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
  width?: number; // Optional width prop
  height?: number; // Optional height prop
  imgWidth?: number; // Optional width prop
  imgHeight?: number; // Optional height prop

}

const FileUploadComponent = ({
  image,
  onImageChange,
  error,
  setError,
  width = 150, // Default width
  height = 150, // Default height
  imgWidth = 40,
  imgHeight = 40
}: FileUploadComponentProps) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

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
    setError(null);

    // Clear input value to allow re-selecting the same file
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Box sx={Styles.fileUpload}>
      <label htmlFor="upload-button">
        {image ? (
          <Box sx={Styles.uploadedImageWrapper}>
            <img
              src={image}
              alt="Uploaded"
              style={{
                width,
                height,
                borderRadius: "50%",
              }}
            />
            <IconButton onClick={handleRemoveImage} sx={Styles.closeIconButton}>
              <CloseIcon sx={Styles.closeIcon} />
            </IconButton>
          </Box>
        ) : (
          <Box sx={Styles.imageWrapper}>
            <Box sx={{ ...Styles.imageContainer, width: width, height: height }}>
              <img
                src={UploadIcon}
                alt="Upload Icon"
                style={{ width: imgWidth, height: imgHeight }}
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
      {/* <Typography
        variant="body1"
        sx={{
          ...Styles.imageLabel,
          visibility: !image ? "visible" : "hidden",
        }}
      >
        Upload Image
      </Typography> */}

      <VisuallyHiddenInput
        id="upload-button"
        type="file"
        ref={inputRef} // Attach ref to the input
        onChange={handleImageUpload}
        accept={ALLOWED_FILE_TYPES.join(",")}
      />
    </Box>
  );
};

export default FileUploadComponent;
