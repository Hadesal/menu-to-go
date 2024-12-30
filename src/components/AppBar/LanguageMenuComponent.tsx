/* eslint-disable @typescript-eslint/no-explicit-any */
import { langs } from "@constants/constants";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
type LanguageKeys = keyof typeof langs;

const LanguageMenu = ({
  color,
  hideBorder,
}: {
  color?: string;
  hideBorder?: boolean;
}) => {
  const { i18n } = useTranslation();

  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(
    null
  );
  const openLang = Boolean(anchorElLang);

  const openLanguageMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const closeLanguageMenu = () => {
    setAnchorElLang(null);
  };

  return (
    <Box
      sx={{
        borderLeft: hideBorder ? "0px" : "1px solid #F9FDFE",
        marginLeft: "0.5rem",
        paddingLeft: "0.5rem",
      }}
    >
      <IconButton
        id="language-icon"
        aria-label="Language icon"
        aria-controls={openLang ? "language-icon" : undefined}
        aria-haspopup="true"
        aria-expanded={openLang ? "true" : undefined}
        onClick={openLanguageMenu}
        sx={{ color: color ? color : "#F9FDFE" }}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="language-icon"
        anchorEl={anchorElLang}
        open={openLang}
        onClose={closeLanguageMenu}
        MenuListProps={{
          "aria-labelledby": "language-icon",
        }}
      >
        {Object.keys(langs).map((lang) => (
          <MenuItem
            key={lang}
            onClick={() => {
              i18n.changeLanguage(lang);
              closeLanguageMenu();
            }}
            disabled={i18n.resolvedLanguage === lang}
          >
            {langs[lang as LanguageKeys].nativeName}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageMenu;
