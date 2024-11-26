import React, { useRef } from "react";
import { Card, CardContent, Drawer, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { parseExcelFile, parseJsonObject } from "./ImportHandler";
import { parseImageMenu } from "@utils/aiMenuImageExtractor";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { addCategoriesToRestaurant } from "@redux/thunks/categoryThunks";

interface ImportDialogProps {
  handleClose: () => void;
  isOpen: boolean;
  title: string;
}

interface ImportOption {
  title: string;
  description: string;
  accept: string;
  onFileSelect: (file: File) => Promise<void>;
}

const ImportDialog = ({ handleClose, isOpen, title }: ImportDialogProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const onFileSelectRef = useRef<(file: File) => Promise<void>>();
  const dispatch = useAppDispatch();
  const { id: restaurantId } = useAppSelector(
    (state) => state.restaurantsData.selectedRestaurant
  );
  const importOptions: ImportOption[] = [
    {
      title: "Import JSON Categories",
      description: "Import from a JSON file to import all data",
      accept: ".json",
      onFileSelect: async (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const jsonData = JSON.parse(reader.result as string);
            const categories = parseJsonObject(jsonData);
            console.log(jsonData);
            console.log(categories);
            if (restaurantId !== undefined) {
              dispatch(
                addCategoriesToRestaurant({
                  restaurantId,
                  categoryList: categories,
                })
              );
            }
          } catch (error) {
            console.error("Error parsing JSON file:", error);
          }
        };
        reader.readAsText(file);
      },
    },
    {
      title: "Import Excel Categories",
      description: "Import from an Excel file to import all data",
      accept:
        ".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      onFileSelect: async (file: File) => {
        try {
          const categories = await parseExcelFile(file);
          console.log(categories);
          if (restaurantId !== undefined) {
            dispatch(
              addCategoriesToRestaurant({
                restaurantId,
                categoryList: categories,
              })
            );
          }
        } catch (error) {
          console.error("Error parsing Excel file:", error);
        }
      },
    },
    {
      title: "Export Categories in Excel Form",
      description: "Export all data in Excel format",
      accept: "",
      onFileSelect: async () => {
        console.log("Exporting categories...");
      },
    },
    {
      title: "Import Image Menu",
      description: "Import from an image to extract menu data",
      accept: "image/*",
      onFileSelect: async (file: File) => {
        try {
          const categories = await parseImageMenu(file);
          console.log(categories);
          if (restaurantId !== undefined) {
            dispatch(
              addCategoriesToRestaurant({
                restaurantId,
                categoryList: categories,
              })
            );
          }
        } catch (error) {
          console.error("Error parsing image:", error);
        }
      },
    },
  ];

  const handleCardClick = (option: ImportOption) => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.accept = option.accept;
      onFileSelectRef.current = option.onFileSelect;
      hiddenFileInput.current.click();
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileSelectRef.current) {
      await onFileSelectRef.current(file);
    }
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = "";
    }
  };

  return (
    <Drawer open={isOpen} onClose={handleClose} anchor="right">
      <Box sx={{ margin: "1rem", width: "400px" }}>
        <Typography sx={{ marginBottom: "1rem" }} variant="h4">
          {title}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {importOptions.map((option, index) => (
            <Paper elevation={2} sx={{ margin: 1 }} key={index}>
              <Card
                onClick={() => handleCardClick(option)}
                sx={{ cursor: "pointer" }}
              >
                <CardContent>
                  <Typography variant="h6">{option.title}</Typography>
                  <Typography variant="body2">{option.description}</Typography>
                </CardContent>
              </Card>
            </Paper>
          ))}
        </Box>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </Box>
    </Drawer>
  );
};

export default ImportDialog;
