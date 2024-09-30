import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const i18nConfig = {
  // debug: process.env.NODE_ENV !== "production", // Disable debug in production
  fallbackLng: "en",
  backend: {
    loadPath: "/locales/{{lng}}/translation.json", // Customize the path for translations
  },
  detection: {
    order: ["localStorage", "cookie", "navigator"], // Prioritize storage over browser detection
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init(i18nConfig, (err) => {
    if (err) console.error("i18n initialization failed:", err); // Error handling
  });

export default i18n;
