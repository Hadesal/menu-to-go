import React, { useRef } from "react";
import { Card, CardContent, Drawer, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { parseJsonObject } from "./ImportHandler";
import { AcceptedFileTypes } from "@components/common/Dropzone";
import { parseImageMenu } from "@utils/aiPdfExtractor";

interface importDialog {
  handleClose: () => void;
  isOpen: boolean;
  title: string;
  fileType: AcceptedFileTypes[];
}

const importObjects = [
  {
    title: "Import Json Categories",
    description: "Import from provided JSON to import all data",
    onClickFunction: parseJsonObject,
  },
  {
    title: "Import Excel Categories",
    description: "Import from provided Excel to import all data",
    onClickFunction: () => {},
  },
  {
    title: "Export Categories in Excel form",
    description: "Export all data in Excel form",
    onClickFunction: () => {},
  },
  {
    title: "Import PDF Menu",
    description: "Import from provided PDF to extract menu data",
    onClickFunction: parseImageMenu,
  },
];

const ImportDialog = ({
  handleClose,
  isOpen,
  title,
  fileType,
}: importDialog) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleOnFileUpload = async (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          let categories;
          if (file.type === "application/json") {
            const jsonData = JSON.parse(reader.result as string);
            categories = parseJsonObject(jsonData);
          } else if (file.type.startsWith("image/")) {
            categories = await parseImageMenu(file);
          } else {
            throw new Error("Unsupported file type");
          }
          console.log(categories);
          // dispatch(
          //   addCategoriesToRestaurant({
          //     restaurantId: selectedRestaurant.id,
          //     categoryList: categories,
          //   })
          // );
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error(error);
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleCardClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      handleOnFileUpload(file);
    }
  };

  return (
    <>
      <Drawer open={isOpen} onClose={handleClose} anchor="right">
        <Box sx={{ margin: "1rem" }}>
          <Typography sx={{ marginBottom: "1rem" }} variant="h4">
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "10rem",
            }}
          >
            {importObjects.map((value, index) => (
              <Paper elevation={2} sx={{ margin: 1 }} key={index}>
                <Card
                  onClick={handleCardClick}
                  sx={{ cursor: "pointer" }}
                  key={index}
                >
                  <CardContent>
                    <Typography>{value.title}</Typography>
                    <Typography variant="caption">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            ))}
          </Box>
          <input
            type="file"
            accept=".json,image/*"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default ImportDialog;
