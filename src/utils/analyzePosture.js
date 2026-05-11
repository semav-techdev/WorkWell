import { calculateAngle } from "./postureUtils";
import { handlePostureIssue } from "./helperArlet";
// لتحليل وضعية الجسم 
export function analyzePosture({
  landmarks,
  refs,
  setAlerts,
  setFeedback
}) {
  const now = Date.now();

  const { neckStart, shoulderStart, torsoStart, notifiedNeck, notifiedShoulder, notifiedTorso } = refs;
// جلب نقاط الجسم المهمة
  const leftEar = landmarks[7];
  const rightEar = landmarks[8];
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];
  const leftHip = landmarks[23];
  const rightHip = landmarks[24];
// حساب المتوسط لبعض النقاط لنأخذها كمرجع
  const avgEar = {
    x: (leftEar.x + rightEar.x) / 2,
    y: (leftEar.y + rightEar.y) / 2,
  };

  const avgShoulder = {
    x: (leftShoulder.x + rightShoulder.x) / 2,
    y: (leftShoulder.y + rightShoulder.y) / 2,
  };
// حساب زاوية الرقبة
  const neckAngle = calculateAngle(
    avgEar,
    avgShoulder,
    { x: avgShoulder.x + 0.1, y: avgShoulder.y }
  );

  const neckIssue = handlePostureIssue({
    condition: neckAngle < 85 || neckAngle > 95,
    startRef: neckStart,
    notifiedRef: notifiedNeck,
    now,
    message: "⚠️ انحناء في الرقبة",
    soundType: "danger",
    setAlerts,
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
    message: "⚠️ وضعية كتفين خاطئة",
    soundType: "normal",
    setAlerts,
  });


  const torsoValue = Math.abs(leftShoulder.x - rightShoulder.x) * 100;

  const torsoIssue = handlePostureIssue({
    condition: torsoValue > 60,
    startRef: torsoStart,
    notifiedRef: notifiedTorso,
    now,
    message: "⚠️ انحناء في الجذع",
    soundType: "danger",
    setAlerts,
  });

  setFeedback({
    neckTilt: neckIssue ? "منحني" : "معتدل",
    shoulders: shoulderIssue ? "منحني" : "معتدل",
    torsoTilt: torsoIssue ? "منحني" : "معتدل",
  });
}