import React, { useRef } from "react";
import { Card, CardContent, Drawer, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  exportSampleExcel,
  parseExcelFile,
  parseJsonObject,
} from "./ImportHandler";
import { parseImageMenu } from "@utils/aiMenuImageExtractor";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { addCategoriesToRestaurant } from "@redux/thunks/categoryThunks";
import { setImportingLoading } from "@redux/slices/restaurantsSlice";

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
      title: "Import Categories from JSON",
      description: "Upload a JSON file to import category data.",
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
      title: "Import Categories from Excel",
      description: "Upload an Excel file to import category data.",
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
      title: "Export Categories as Excel",
      description: "Export all categories to an Excel file.",
      accept: "",
      onFileSelect: async () => {
        exportSampleExcel();
      },
    },
    {
      title: "Import Menu from Image",
      description: "Upload an image to extract menu category data.",
      accept: "image/*",
      onFileSelect: async (file: File) => {
        handleClose();
        dispatch(setImportingLoading(true));
        try {
          console.log("started");
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
          console.log("done");
        } catch (error) {
          dispatch(setImportingLoading(false));
          console.error("Error parsing image:", error);
        }
      },
    },
  ];

  const handleCardClick = (option: ImportOption) => {
    if (option.accept) {
      if (hiddenFileInput.current) {
        hiddenFileInput.current.accept = option.accept;
        onFileSelectRef.current = option.onFileSelect;
        hiddenFileInput.current.click();
      }
    } else {
      option.onFileSelect(new File([], ""));
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
      <Box sx={{ width: "400px", padding: 4 }}>
        <Typography sx={{ marginBottom: "1rem", fontWeight: 500 }} variant="h6">
          {title}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {importOptions.map((option, index) => (
            <Paper
              elevation={0}
              sx={{ marginTop: 2, borderRadius: 4 }}
              key={index}
            >
              <Card
                onClick={() => handleCardClick(option)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 4,
                  border: "1px dotted var(--primary-color)",
                  transition: "background-color 0.3s ease, transform 0.2s ease",
                  "&:hover": {
                    backgroundColor: "var(--primary-color)",
                    transform: "scale(1.02)",
                    color: "white",
                  },
                }}
                elevation={0}
              >
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      marginBottom: 1,
                      fontWeight: 500,
                    }}
                  >
                    {option.title}
                  </Typography>
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
