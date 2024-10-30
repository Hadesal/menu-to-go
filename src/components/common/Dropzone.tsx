import React, { useState } from "react";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

function Dropzone({ onFileUpload }: { onFileUpload: (file: File) => void }) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = React.useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const validateFile = (file) => {
    return file.type === "image/svg+xml" || file.name.endsWith(".svg");
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files.length > 0 && validateFile(files[0])) {
      onFileUpload(files[0]);
    } else {
      setErrorMessage("Only SVG files are allowed.");
      setOpen(true);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0 && validateFile(event.target.files[0])) {
      onFileUpload(event.target.files[0]);
    } else {
      setErrorMessage("Only SVG files are allowed.");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      className={dragOver ? "dropzone dragover" : "dropzone"}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        accept=".svg"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <UploadFileIcon
        sx={{ fontSize: 48, color: dragOver ? "primary.main" : "grey.500" }}
      />
      {/* Added upload icon */}
      <Typography
        variant="body1"
        sx={{ color: dragOver ? "primary.dark" : "grey.800", marginTop: 1 }}
      >
        Drag and drop an image here, or click to select
      </Typography>
      <Typography variant="caption" sx={{ color: "grey.600" }}>
        Only SVG files are allowed
      </Typography>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dropzone;
