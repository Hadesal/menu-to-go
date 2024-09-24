import { Card, CardContent, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { updateRestaurantUserUiPreferences } from "../../../redux/slices/restaurantsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { useEffect, useState } from "react";

const PlatformPopoverContentsComponent = ({
  type,
  setIsOpen,
}: {
  type: string;
  setIsOpen: (value: boolean) => void;
}) => {
  const { t } = useTranslation();
  const getString = t;
  const placeholder =
    type === "facebook"
      ? getString("facebookLink")
      : type === "instagram"
      ? getString("instagramLink")
      : getString("twitterLink");
  const platformColor =
    type === "facebook"
      ? "#0866ff"
      : type === "instagram"
      ? "#ff2770"
      : "#1da1f2";
  const dispatch = useAppDispatch();
  const { userUiPreferences } = useAppSelector(
    (state) => state.restaurantsData.selectedRestaurant
  );
  const [inputedText, setInputedText] = useState(
    userUiPreferences.contactLinks[type]
  );

  const handleSubmit = () => {
    setIsOpen(false);
    dispatch(
      updateRestaurantUserUiPreferences({
        ...userUiPreferences,
        contactLinks: {
          ...userUiPreferences.contactLinks,
          [type]: inputedText,
        },
      })
    );
  };

  return (
    <>
      <Card id={type + "CardContainerId"}>
        <CardContent
          sx={{ display: "flex", flexDirection: "column" }}
          id={type + "CardContentContainerId"}
        >
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: platformColor,
                },
                "&:hover fieldset": {
                  borderColor: platformColor,
                },
                "&.Mui-focused fieldset": {
                  borderColor: platformColor,
                },
              },
              "& .MuiFormLabel-root": {
                color: "gray",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "gray",
              },
            }}
            value={inputedText}
            label={placeholder}
            variant="outlined"
            placeholder={placeholder}
            onChange={(val) => {
              setInputedText(val.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            variant="contained"
            sx={{
              width: "2rem",
              marginTop: "1rem",
              alignSelf: "end",
              backgroundColor: platformColor,
            }}
            id={type + "ButtonId"}
            onClick={handleSubmit}
          >
            {getString("ok")}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
export default PlatformPopoverContentsComponent;
