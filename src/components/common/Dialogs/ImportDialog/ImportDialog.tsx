import Dropzone, { AcceptedFileTypes } from "@components/common/Dropzone";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";

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
      <Drawer open={isOpen} onClose={handleClose} anchor="right">
        <Box>
          <Typography variant="h4">{title}</Typography>

          <Typography>
            to Import your Restaurant Data Please do the following:
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default ImportDialog;
