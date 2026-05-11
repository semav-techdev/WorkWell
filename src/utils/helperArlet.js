import {playBeep,pushAlert} from "../utils/alretUtils"
// Gives alert after 2 seconds
export function handlePostureIssue({
  condition,
  startRef,
  notifiedRef,
  now,
  message,
  soundType,
  setAlerts
}) {
  if (condition) {
    if (startRef.current === null) startRef.current = now;

    const elapsed = (now - startRef.current) / 1000;
// If alert persists for 2 seconds, play sound
    if (elapsed >= 2 && !notifiedRef.current) {
      playBeep(soundType);
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