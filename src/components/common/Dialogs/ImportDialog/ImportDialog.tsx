import Dropzone, { acceptedfileTypes } from "@components/common/Dropzone";
import { Dialog, DialogContent } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface importDialog {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  title: string;
  fileType: acceptedfileTypes;
}
const ImportDialog = ({ setIsOpen, isOpen, title, fileType }: importDialog) => {
  const handleOnFileUpload = () => {};
  return (
    <>
      <Dialog open>
        <DialogContent>
          <Dropzone
            onFileUpload={handleOnFileUpload}
            acceptedFileType={fileType}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImportDialog;
