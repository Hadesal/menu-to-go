import React, { useState } from "react";
import { Box, IconButton, Typography, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@assets/material-symbols_image-outline (1).svg";
import { Styles } from "./addItemDialog.styles";

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/svg+xml"];

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
  onImageChange: (image: File | string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  width?: number;
  height?: number;
  imgWidth?: number;
  imgHeight?: number;
}

const FileUploadComponent = ({
  image,
  onImageChange,
  error,
  setError,
  width = 150,
  height = 150,
  imgWidth = 40,
  imgHeight = 40,
}: FileUploadComponentProps) => {
  const [previewImage, setPreviewImage] = useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      onImageChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    onImageChange("");
    setPreviewImage("");
    setError(null);

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
              src={previewImage || image}
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
            <Box
              sx={{ ...Styles.imageContainer, width: width, height: height }}
            >
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
