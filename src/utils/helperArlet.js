import { playBeep, pushAlert } from "../utils/alretUtils";
// بيعطي التنبيه بعد مدة زمنية مدتها 2 ثانية
export function handlePostureIssue({
  condition,
  startRef,
  notifiedRef,
  now,
  message,
  soundType,
  setAlerts,
  soundVolume = 70,
}) {
  if (condition) {
    if (startRef.current === null) startRef.current = now;

    const elapsed = (now - startRef.current) / 1000;
    // اذا استمر التنبيه 2 ثانية يعطي صوت
    if (elapsed >= 2 && !notifiedRef.current) {
      if (soundVolume > 0) {
        playBeep(soundType, soundVolume);
      }
      pushAlert(setAlerts, message);

      notifiedRef.current = true;
      startRef.current = null;
      notifiedRef.current = false;
    }

    return true;
  } else {
    startRef.current = null;
    notifiedRef.current = false;
    return false;
  }
}
