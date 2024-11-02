import Dropzone, { AcceptedFileTypes } from "@components/common/Dropzone";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface importDialog {
  handleClose: () => void;
  isOpen: boolean;
  title: string;
  fileType: AcceptedFileTypes[];
}
const ImportDialog = ({
  handleClose,
  isOpen,
  title,
  fileType,
}: importDialog) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleOnFileUpload = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const jsonContent = JSON.parse(reader.result as string);

        console.log(jsonContent);
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        fullScreen={fullScreen}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "1.5rem",
            minWidth: "35rem",
            minHeight: "20rem",
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Typography>
            to Import your Restaurant Data Please do the following:
          </Typography>
          <Dropzone
            onFileUpload={handleOnFileUpload}
            acceptedFileTypes={fileType}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImportDialog;
