export const themes = {
  dark: {
    page: "bg-gray-900",
    heading: "text-white",
    subtitle: "text-gray-400",
    panel: "bg-gray-800 text-white",
    mutedText: "text-gray-300",
    emptyText: "text-gray-400",
    canvasBorder: "border-blue-500",
    primaryButton: "bg-blue-600 text-white hover:bg-blue-500",
    secondaryButton: "bg-gray-700 text-white hover:bg-gray-600",
    loading: "bg-blue-500/20 text-blue-400",
    spinner: "border-blue-400",
  },

  highContrast: {
    page: "bg-black",
    heading: "text-yellow-300",
    subtitle: "text-yellow-200",
    panel: "bg-black text-yellow-200 ring-2 ring-yellow-400",
    mutedText: "text-yellow-200",
    emptyText: "text-yellow-200",
    canvasBorder: "border-yellow-400",
    primaryButton: "bg-yellow-400 text-black hover:bg-yellow-300",
    secondaryButton: "bg-black text-yellow-300 hover:bg-yellow-900",
    loading: "bg-yellow-400/20 text-yellow-300",
    spinner: "border-yellow-300",
  },

  light: {
    page: "bg-slate-100",
    heading: "text-slate-950",
    subtitle: "text-slate-600",
    panel: "bg-white text-slate-950 shadow-sm ring-1 ring-[#6e99d0]",
    mutedText: "text-slate-700",
    emptyText: "text-slate-500",
    canvasBorder: "border-blue-500",
    primaryButton: "bg-blue-600 text-white hover:bg-blue-700",
    secondaryButton: "bg-slate-200 text-slate-950 hover:bg-slate-300",
    loading: "bg-blue-100 text-blue-700",
    spinner: "border-blue-600",
  },
};
export const getStatusColor = (value, isDarkMode) =>
  value === "good"
    ? isDarkMode
      ? "text-green-400"
      : "text-green-700"
    : isDarkMode
      ? "text-red-400"
      : "text-red-700";
