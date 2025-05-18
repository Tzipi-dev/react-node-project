import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)   // מזהה שפה מהדפדפן או localStorage
  .use(initReactI18next)
  .init({
    fallbackLng: "he",
    supportedLngs: ["he", "en"],
    debug: false,
    interpolation: { escapeValue: false },
    resources: {}           // משאבים ייטענו דינמית
  });

export default i18n;