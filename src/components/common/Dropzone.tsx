import {
  ChangeEvent,
  SyntheticEvent,
  useRef,
  useState,
  DragEvent as ReactDragEvent,
} from "react";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
export type acceptedfileTypes = "svg" | "excel" | "json";
function Dropzone({
  onFileUpload,
  acceptedFileType,
}: {
  onFileUpload: (file: File) => void;
  acceptedFileType: acceptedfileTypes;
}) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const acceptedFileTypeUpperCase = acceptedFileType.toLocaleUpperCase();
  const handleDragOver = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
  };

  const validateFile = (file: File): boolean => {
    switch (acceptedFileType) {
      case "svg":
        return file.type === "image/svg+xml" || file.name.endsWith(".svg");
      case "excel":
        return (
          file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          file.type === "application/vnd.ms-excel" ||
          file.name.endsWith(".xlsx") ||
          file.name.endsWith(".xls")
        );
      case "json":
        return (
          file.type === "application/json" ||
          file.name.toLowerCase().endsWith(".json")
        );
      default:
        return false;
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer) {
      const files = event.dataTransfer.files;
      if (files.length > 0 && validateFile(files[0])) {
        onFileUpload(files[0]);
      } else {
        setErrorMessage(`Only ${acceptedFileTypeUpperCase} files are allowed.`);
        setOpen(true);
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && validateFile(files[0])) {
      onFileUpload(files[0]);
    } else {
      setErrorMessage(`Only ${acceptedFileTypeUpperCase} files are allowed.`);
      setOpen(true);
    }
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const getAcceptAttribute = (): string => {
    switch (acceptedFileType) {
      case "svg":
        return ".svg";
      case "excel":
        return ".xlsx,.xls";
      case "json":
        return ".json";
      default:
        return "";
    }
  };
  return (
    <Box
      className={dragOver ? "dropzone dragover" : "dropzone"}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: "2px dashed",
        borderColor: dragOver ? "primary.main" : "grey.500",
        padding: 4,
        textAlign: "center",
        borderRadius: 2,
        cursor: "pointer",
        transition: "border-color 0.3s",
        backgroundColor: dragOver ? "grey.100" : "transparent",
      }}
    >
      <input
        type="file"
        accept={getAcceptAttribute()}
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple={false}
      />
      <UploadFileIcon
        sx={{ fontSize: 48, color: dragOver ? "primary.main" : "grey.500" }}
      />
      {/* Added upload icon */}
      <Typography
        variant="body1"
        sx={{ color: dragOver ? "primary.dark" : "grey.800", marginTop: 1 }}
      >
        Drag and drop an{" "}
        {acceptedFileType === "svg" ? "image" : acceptedFileType} here, or click
        to select
      </Typography>
      <Typography variant="caption" sx={{ color: "grey.600" }}>
        Only {acceptedFileTypeUpperCase} files are allowed
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
