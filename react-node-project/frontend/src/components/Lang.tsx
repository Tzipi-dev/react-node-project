import { useTranslation } from "react-i18next";

const Lang = () => {
  const { i18n } = useTranslation();
  const toggleLang = () => {
    const next = i18n.language === "he" ? "en" : "he";
    i18n.changeLanguage(next);
    // כיוון כתיבה
    document.dir = next === "he" ? "rtl" : "ltr";
  };

  return (
    <button onClick={toggleLang}>
      {i18n.language === "he" ? "English" : "עברית"}
    </button>
  );
};
export default Lang