import {
  ChangeEvent,
  SyntheticEvent,
  useRef,
  useState,
  DragEvent as ReactDragEvent,
} from "react";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export type AcceptedFileTypes = "svg" | "excel" | "json";
type FileTypeArray = AcceptedFileTypes | AcceptedFileTypes[];

function Dropzone({
  onFileUpload,
  acceptedFileTypes,
}: {
  onFileUpload: (file: File) => void;
  acceptedFileTypes: FileTypeArray;
}) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleDragOver = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
  };

  const validateFile = (file: File): boolean => {
    const types = Array.isArray(acceptedFileTypes)
      ? acceptedFileTypes
      : [acceptedFileTypes];
    return types.some((type) => {
      switch (type) {
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
    });
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
        setErrorMessage(`Only ${getAcceptAttribute()} files are allowed.`);
        setOpen(true);
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && validateFile(files[0])) {
      onFileUpload(files[0]);
    } else {
      setErrorMessage(`Only ${getAcceptAttribute()} files are allowed.`);
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
    const types = Array.isArray(acceptedFileTypes)
      ? acceptedFileTypes
      : [acceptedFileTypes];
    return types
      .map((type) => {
        switch (type) {
          case "svg":
            return ".svg";
          case "excel":
            return ".xlsx,.xls";
          case "json":
            return ".json";
          default:
            return "";
        }
      })
      .join(",");
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
      <Typography
        variant="body1"
        sx={{ color: dragOver ? "primary.dark" : "grey.800", marginTop: 1 }}
      >
        Drag and drop a file here, or click to select
      </Typography>
      <Typography variant="caption" sx={{ color: "grey.600" }}>
        Only {getAcceptAttribute()} files are allowed
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
