//بتشغل صوت تنبيه
export function playBeep(type = "normal", volume = 70) {
  if (volume <= 0) return;

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const safeVolume = Math.min(Math.max(volume, 0), 100) / 100;

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.frequency.value = type === "danger" ? 400 : 800;
  oscillator.start();

  gainNode.gain.setValueAtTime(0.5 * safeVolume, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

  oscillator.stop(audioCtx.currentTime + 0.2);
}
// بيعطي رسالة تنبيه
export function pushAlert(setAlerts, message, type = "warning") {
  setAlerts((prev) => [
    { message, type, time: Date.now() },
    ...prev.slice(0, 4),
  ]);
}
