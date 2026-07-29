import { useEffect, useRef, useState } from "react";
import { analyzePosture } from "../utils/analyzePosture";
import { usePoseDetection } from "../hooks/usePoseDetection";
import SettingsSidebar from "../components/sidebare";

import { getStatusColor } from "../utils/theme";
import { useTheme } from "../hooks/useTheme";
import { useTranslate } from "../hooks/useTranslate";

function PoseCamera() {
  const {
    theme,
    isDarkMode,
    setIsDarkMode,
    isHighContrast,
    setIsHighContrast,
  } = useTheme();

  const { language, setLanguage, t } = useTranslate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const refs = {
    neckStart: useRef(null),
    shoulderStart: useRef(null),
    torsoStart: useRef(null),
    notifiedNeck: useRef(false),
    notifiedShoulder: useRef(false),
    notifiedTorso: useRef(false),
  };

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [soundVolume, setSoundVolume] = useState(
    () => Number(localStorage.getItem("soundVolume")) || 70
  );
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState({
    neckTilt: "good",
    shoulders: "good",
    torsoTilt: "good",
  });

  const translateAlert = (message) => t.alertMessages[message] || message;

  // theme persistence handled in `useTheme`

  useEffect(() => {
    localStorage.setItem("soundVolume", String(soundVolume));
  }, [soundVolume]);

  usePoseDetection(videoRef, canvasRef, (landmarks) => {
    if (landmarks && isLoading) {
      setIsLoading(false);
    }

    analyzePosture({
      landmarks,
      refs,
      setAlerts,
      setFeedback,
      soundVolume,
    });
  });

  return (
    <div
      className={`${theme.page} flex min-h-screen items-center justify-center p-4 text-center transition-colors`}
      dir={t.dir}
    >
      <SettingsSidebar
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setIsHighContrast={setIsHighContrast}
        language={language}
        setLanguage={setLanguage}
        soundVolume={soundVolume}
        setSoundVolume={setSoundVolume}
        t={t}
      />

      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className={`rounded-lg px-4 py-2 text-base font-semibold transition ${theme.primaryButton}`}
          >
            {language === "ar" ? "الاعدادات" : "Settings"}
          </button>
        </div>

        <h1
          className={`mb-6 text-center text-4xl font-bold lg:text-6xl ${theme.heading}`}
        >
          Motion AI Learning 🧠
        </h1>
        <p className={`mb-8 text-center text-xl lg:text-2xl ${theme.subtitle}`}>
          {t.subtitle}
        </p>

        {isLoading && (
          <div
            className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 ${theme.loading}`}
          >
            <div
              className={`h-4 w-4 animate-spin rounded-full border-2 border-t-transparent ${theme.spinner}`}
            ></div>
            <span>{t.loading}</span>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center justify-center gap-4 lg:flex-row lg:items-stretch">
          <div className="flex w-full max-w-[640px] flex-col items-center gap-4">
            <video ref={videoRef} style={{ display: "none" }} />
            <canvas
              ref={canvasRef}
              width="640"
              height="480"
              className={`w-full rounded-xl border-4 ${theme.canvasBorder}`}
            />
            <div className={`w-full rounded-xl p-4 ${theme.panel}`}>
              <h2 className="mb-4 text-[30px]">{t.analysis}</h2>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <p className={`text-[20px] ${theme.mutedText}`}>
                  {t.neck} :{" "}
                  <span
                    className={getStatusColor(feedback.neckTilt, isDarkMode)}
                  >
                    {t.statuses[feedback.neckTilt]}
                  </span>
                </p>
                <p className={`text-[20px] ${theme.mutedText}`}>
                  {t.shoulders} :{" "}
                  <span
                    className={getStatusColor(feedback.shoulders, isDarkMode)}
                  >
                    {t.statuses[feedback.shoulders]}
                  </span>
                </p>
                <p className={`text-[20px] ${theme.mutedText}`}>
                  {t.torso} :{" "}
                  <span
                    className={getStatusColor(feedback.torsoTilt, isDarkMode)}
                  >
                    {t.statuses[feedback.torsoTilt]}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div
            className={`flex w-full max-w-[640px] flex-col rounded-xl p-4 lg:w-64 lg:self-stretch ${theme.panel}`}
          >
            <h2 className="mb-4 text-[30px]">{t.alerts}</h2>
            {alerts.length === 0 && (
              <p className={`text-xl ${theme.emptyText}`}>{t.noAlerts}</p>
            )}
            <div className="flex-1 space-y-2">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-2 rounded text-base transform transition-all duration-500 ease-out animate-fadeIn ${
                    alert.type === "danger" ? "bg-red-600" : "bg-yellow-600"
                  }`}
                >
                  {translateAlert(alert.message)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoseCamera;
