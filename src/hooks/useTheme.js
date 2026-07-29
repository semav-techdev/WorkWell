import { useEffect, useState } from "react";
import { themes } from "../utils/theme";

export function useTheme() {
  const [mode, setMode] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const isDarkMode = mode === "dark";
  const isHighContrast = mode === "high-contrast";

  function setIsDarkMode(value) {
    if (typeof value === "function") {
      setMode((prev) => (value(prev === "dark") ? "dark" : "light"));
    } else {
      setMode(value ? "dark" : "light");
    }
  }

  function setIsHighContrast(value) {
    if (typeof value === "function") {
      setMode((prev) =>
        value(prev === "high-contrast") ? "high-contrast" : "dark"
      );
    } else {
      setMode(value ? "high-contrast" : "dark");
    }
  }

  return {
    mode,
    isDarkMode,
    isHighContrast,
    setMode,
    setIsDarkMode,
    setIsHighContrast,
    theme: isHighContrast
      ? themes.highContrast
      : isDarkMode
        ? themes.dark
        : themes.light,
  };
}
