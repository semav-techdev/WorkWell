/* eslint-disable react/prop-types */

export default function SettingsSidebar({
  isOpen,
  onClose,
  isDarkMode,
  setIsDarkMode,
  setIsHighContrast,
  language,
  setLanguage,
  soundVolume,
  setSoundVolume,
  t,
}) {
  const sidebarText = {
    settings: language === "ar" ? "الإعدادات" : "Settings",
    theme: language === "ar" ? "الوضع" : "Theme",
    dark: language === "ar" ? "داكن" : "Dark",
    light: language === "ar" ? "فاتح" : "Light",
    language: language === "ar" ? "اللغة" : "Language",
    alertSound: language === "ar" ? "صوت التنبيه" : "Alert sound",
    low: language === "ar" ? "منخفض" : "Low",
    high: language === "ar" ? "مرتفع" : "High",
    close: language === "ar" ? "إغلاق" : "Close",
  };

  const togglePosition = (isEnabled) => {
    if (isEnabled) {
      return language === "ar" ? "right-8" : "left-8";
    }

    return language === "ar" ? "right-1" : "left-1";
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label={sidebarText.close}
          onClick={onClose}
          className="fixed inset-0 z-40 cursor-default bg-black/40"
        />
      )}

      <aside
        className={`fixed top-0 z-50 flex h-screen w-80 max-w-[85vw] flex-col p-6 shadow-xl transition-transform duration-300 ${
          language === "ar" ? "left-0" : "right-0"
        } ${
          isOpen
            ? "translate-x-0"
            : language === "ar"
              ? "-translate-x-full"
              : "translate-x-full"
        } ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-slate-950"}`}
        dir={t.dir}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">{sidebarText.settings}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={sidebarText.close}
            className={`grid h-10 w-10 place-items-center rounded-lg text-xl font-bold transition ${
              isDarkMode ? "hover:bg-gray-800" : "hover:bg-slate-100"
            }`}
          >
            x
          </button>
        </div>

        <div
          className={`mb-4 rounded-lg p-4 ${
            isDarkMode ? "bg-gray-800" : "bg-slate-100"
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="font-semibold">{sidebarText.theme}</p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-slate-500"
                }`}
              >
                {isDarkMode ? sidebarText.dark : sidebarText.light}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsDarkMode((current) => !current)}
              aria-label={sidebarText.theme}
              className={`relative h-7 w-14 rounded-full transition ${
                isDarkMode ? "bg-blue-600" : "bg-slate-400"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${togglePosition(
                  isDarkMode
                )}`}
              />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setIsDarkMode(false)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                !isDarkMode &&
                !localStorage.getItem("theme")?.includes("high-contrast")
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
            >
              {sidebarText.light}
            </button>

            <button
              type="button"
              onClick={() => setIsDarkMode(true)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                localStorage.getItem("theme") === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
            >
              {sidebarText.dark}
            </button>

            <button
              type="button"
              onClick={() => {
                const currently = localStorage.getItem("theme");
                if (currently === "high-contrast") {
                  // turn off high contrast -> go to dark
                  setIsDarkMode(true);
                } else {
                  // enable high contrast
                  // setIsHighContrast is provided by hook; if not available, fall back
                  if (typeof setIsHighContrast === "function") {
                    setIsHighContrast(true);
                  } else {
                    localStorage.setItem("theme", "high-contrast");
                    window.location.reload();
                  }
                }
              }}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                localStorage.getItem("theme") === "high-contrast"
                  ? "bg-yellow-400 text-black"
                  : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
            >
              {language === "ar" ? "وضع ضعاف النظر" : "Low Vision"}
            </button>
          </div>
        </div>

        <div
          className={`mb-4 rounded-lg p-4 ${
            isDarkMode ? "bg-gray-800" : "bg-slate-100"
          }`}
        >
          <label htmlFor="language" className="mb-3 block font-semibold">
            {sidebarText.language}
          </label>
          <select
            id="language"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className={`w-full rounded-lg p-3 outline-none ring-1 transition ${
              isDarkMode
                ? "bg-gray-700 text-white ring-gray-600"
                : "bg-white text-slate-950 ring-slate-200"
            }`}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        <div
          className={`rounded-lg p-4 ${
            isDarkMode ? "bg-gray-800" : "bg-slate-100"
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="font-semibold">{sidebarText.alertSound}</p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-slate-500"
                }`}
              >
                {soundVolume}%
              </p>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={soundVolume}
            onChange={(event) => setSoundVolume(Number(event.target.value))}
            aria-label={sidebarText.alertSound}
            className="h-2 w-full cursor-pointer accent-green-600"
          />

          <div
            className={`mt-2 flex justify-between text-sm ${
              isDarkMode ? "text-gray-400" : "text-slate-500"
            }`}
          >
            <span>0%</span>
            <span>{sidebarText.low}</span>
            <span>{sidebarText.high}</span>
            <span>100%</span>
          </div>
        </div>
      </aside>
    </>
  );
}
