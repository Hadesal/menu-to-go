import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { t, i18n } = useTranslation();
  const getString = t;
  const [currentLanguage, setCurrentLanguage] = useState("");

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  return {
    getString,
    currentLanguage,
  };
};
