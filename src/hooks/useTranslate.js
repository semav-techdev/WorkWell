import { useEffect, useState } from "react";
import { translations } from "../utils/translate";

export function useTranslate() {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "ar"
  );

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((current) =>
      current === "ar" ? "en" : "ar"
    );
  };

  return {
    language,
    setLanguage,
    t,
    toggleLanguage,
  };
}
