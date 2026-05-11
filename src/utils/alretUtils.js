// Plays alert sound
export  function playBeep(type = "normal") {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.frequency.value = type === "danger" ? 400 : 800;
      oscillator.start();

      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

      oscillator.stop(audioCtx.currentTime + 0.2);
    }
  // Gives alert message
export function pushAlert(setAlerts,message, type = "warning") {
      setAlerts((prev) => [
        { message, type, time: Date.now() },
        ...prev.slice(0, 4)
      ]);
    }
