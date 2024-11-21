import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import { updateMenuUiPreferences } from "@redux/slices/menuSlice";
import { updateRestaurantUserUiPreferences } from "@redux/slices/restaurantsSlice";
import React, { useRef, useState } from "react";

export default function UploadLogo() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const userUiPreferences = useAppSelector(
    (state) => state.restaurantsData.selectedRestaurant?.userUiPreferences
  );
  const [selectedImage, setSelectedImage] = useState<string>(
    userUiPreferences && userUiPreferences.logo || ""
  );
  const dispatch = useAppDispatch();

  // Create a ref for the file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      // Allow only SVG, PNG, and JPG
      if (["image/svg+xml", "image/png", "image/jpeg"].includes(fileType)) {
        setErrorMessage(null); // Clear any previous error message
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
          //handleSelectFontType(reader.result as string);
        };
        reader.readAsDataURL(file); // This will read the file as a Base64 encoded string
      } else {
        setErrorMessage("Please upload an image file (SVG, PNG, JPG)"); // Set error message
        setSelectedImage(""); // Clear any previously selected image
      }
    }
  };

  const handleClearImage = () => {
    setSelectedImage("");
    setErrorMessage(null); // Optionally clear the error message when the user clears the image
    // Reset the file input to allow re-upload of the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input field
    }
  };

  const handleSelectFontType = (logo: string) => {
    const updatedUserUiPreferences = {
      ...userUiPreferences,
      logo: logo,
    };
    dispatch(updateRestaurantUserUiPreferences(updatedUserUiPreferences));
    dispatch(updateMenuUiPreferences(updatedUserUiPreferences));
  };

  return (
    <Paper
      elevation={6}
      sx={{
        borderRadius: "2rem",
        marginTop: "3rem",
        width: "100%",
        height: "fit-content",
      }}
    >
      <Card sx={{ borderRadius: "2rem", height: "100%" }}>
        <CardContent sx={{ padding: 4 }}>
          <Typography sx={{ color: "#000000" }} variant="h6">
            Logo
          </Typography>
          <Container
            disableGutters
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: 0,
              marginTop: "1rem",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                border: "1px dashed #CCCCCC",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: selectedImage ? "transparent" : "#F5F5F5",
                position: "relative", // Make sure the "X" icon can be placed correctly
              }}
            >
              {selectedImage ? (
                <>
                  <img
                    src={selectedImage}
                    alt="Uploaded Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      width: "30px",
                      height: "30px",
                      top: 50,
                      right: 0,
                      backgroundColor: "#A4755D",
                      borderRadius: "50%",
                      ":hover": { backgroundColor: "#A4755D" },
                    }}
                    onClick={handleClearImage}
                  >
                    <CloseIcon sx={{ color: "white" }} />
                  </IconButton>
                </>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    color: "#999999",
                    fontSize: "0.8rem",
                  }}
                >
                  Logo
                </Typography>
              )}
            </Box>
            <Button
              sx={{ padding: "0.5rem 2rem" }}
              variant="contained"
              component="label"
            >
              CHOOSE FILE
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpeg,.jpg,.svg"
                onChange={handleFileChange}
                hidden
              />
            </Button>
          </Container>
          {errorMessage && (
            <Typography
              variant="body2"
              sx={{
                color: "red",
                fontSize: "0.9rem",
                marginTop: "0.5rem",
              }}
            >
              {errorMessage}
            </Typography>
          )}
          {!errorMessage && (
            <Typography
              variant="body2"
              sx={{
                color: "#666666",
                fontSize: "0.9rem",
                marginTop: "0.5rem",
              }}
            >
              JPG, PNG, SVG; Max: 60MB
            </Typography>
          )}
        </CardContent>
      </Card>
    </Paper>
  );
}
