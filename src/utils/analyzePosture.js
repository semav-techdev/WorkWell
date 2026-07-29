import { calculateAngle } from "./postureUtils";
import { handlePostureIssue } from "./helperArlet";

export function analyzePosture({
  landmarks,
  refs,
  setAlerts,
  setFeedback,
  soundVolume = 70,
}) {
  const now = Date.now();

  const {
    neckStart,
    shoulderStart,
    torsoStart,
    notifiedNeck,
    notifiedShoulder,
    notifiedTorso,
  } = refs;

  const leftEar = landmarks[7];
  const rightEar = landmarks[8];
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];
  const leftHip = landmarks[23];
  const rightHip = landmarks[24];

  const avgEar = {
    x: (leftEar.x + rightEar.x) / 2,
    y: (leftEar.y + rightEar.y) / 2,
  };

  const avgShoulder = {
    x: (leftShoulder.x + rightShoulder.x) / 2,
    y: (leftShoulder.y + rightShoulder.y) / 2,
  };

  const neckAngle = calculateAngle(avgEar, avgShoulder, {
    x: avgShoulder.x + 0.1,
    y: avgShoulder.y,
  });

  const neckIssue = handlePostureIssue({
    condition: neckAngle < 85 || neckAngle > 95,
    startRef: neckStart,
    notifiedRef: notifiedNeck,
    now,
    message: "neckAlert",
    soundType: "danger",
    setAlerts,
    soundVolume,
  });

  const leftAngle = calculateAngle(leftEar, leftShoulder, leftHip);
  const rightAngle = calculateAngle(rightEar, rightShoulder, rightHip);
  const avgAngle = (leftAngle + rightAngle) / 2;

  const tilt = Math.abs(leftShoulder.y - rightShoulder.y);

  const shoulderIssue = handlePostureIssue({
    condition: avgAngle < 150 || tilt > 0.06,
    startRef: shoulderStart,
    notifiedRef: notifiedShoulder,
    now,
    message: "shoulderAlert",
    soundType: "normal",
    setAlerts,
    soundVolume,
  });

  const torsoValue = Math.abs(leftShoulder.x - rightShoulder.x) * 100;

  const torsoIssue = handlePostureIssue({
    condition: torsoValue > 60,
    startRef: torsoStart,
    notifiedRef: notifiedTorso,
    now,
    message: "torsoAlert",
    soundType: "danger",
    setAlerts,
    soundVolume,
  });

  setFeedback({
    neckTilt: neckIssue ? "bad" : "good",
    shoulders: shoulderIssue ? "bad" : "good",
    torsoTilt: torsoIssue ? "bad" : "good",
  });
}
