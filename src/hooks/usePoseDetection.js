import { useEffect } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import {drawConnectors,drawLandmarks,} from "@mediapipe/drawing_utils";

export function usePoseDetection(videoRef, canvasRef, onResults) {
  /* videoRef : فيديو الكاميرا
    canvasRef : مكان الرسم
    onResults : function نرجع فيها النتائج
  */ 
  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const ctx = canvasElement.getContext("2d");

//هذا هو محرك الذكاء اللي بيحلل الجسم
// بيروح ليجيب الملفات الخوارزمية يلي رح يشتغل عليها
    const pose = new Pose({
      locateFile: (file) =>
        {return `models/pose/${file}`},
    });
//إعدادات التحليل 
    pose.setOptions({
      modelComplexity: 1,//دقة التحليل
      smoothLandmarks: true,// نعومة الحركة
      minDetectionConfidence: 0.5, // نسبة الثقة 
      minTrackingConfidence: 0.5,
    });
//هذا يشتغل كل مرة الكاميرا تعطي صورة
    pose.onResults((results) => {
      // نمسح الرسم القديم
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      //نعرض الفريم الحالي
      ctx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      // اذا تم اكتشاف الصورة
      if (results.poseLandmarks) {
        drawConnectors(
          ctx,
          results.poseLandmarks,
          Pose.POSE_CONNECTIONS
        );
        // يرسم النقاط (المفاصل)
        drawLandmarks(ctx, results.poseLandmarks);
       // ارسال البيانات
        onResults(results.poseLandmarks);
      }
    });
    // تجهيز الكاميرا
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await pose.send({ image: videoElement });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {camera.stop(); };
  }, []);
}