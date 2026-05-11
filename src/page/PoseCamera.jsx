import { useRef, useState } from "react";
import { usePoseDetection } from "../hooks/usePoseDetection";
import { analyzePosture } from "../utils/analyzePosture";

function PoseCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  // استخدمت ref 
  // لتتبع الوقت بدون اعادة render
  const refs = {
    neckStart: useRef(null),
    shoulderStart: useRef(null),
    torsoStart: useRef(null),
    notifiedNeck: useRef(false),
    notifiedShoulder: useRef(false),
    notifiedTorso: useRef(false),
  };

  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState({
    neckTilt: "Normal",
    shoulders: "Normal",
    torsoTilt: "Normal",
  });
  const getStatusColor = (value) => {
    if (value === 'Normal') return "text-green-400";
    if (value === 'Bent') return "text-red-400";
    return "text-gray-300";
  }
  usePoseDetection(videoRef, canvasRef, (landmarks) => {
    if (landmarks && isLoading) {
      setIsLoading(false);
    }
    //نرسل البيانات للتحليل 
    analyzePosture({
      landmarks,
      refs,
      setAlerts,
      setFeedback,
    });
  });


  return (
    <div className="bg-gray-900 p-1 text-center hight-auto flex items-center justify-center">
      <div className="max-w-6xl mx-auto ">
        <h1 className="text-4xl lg:text-6xl font-bold text-center text-white mb-6">
          Motion AI Learning 🧠
        </h1>
        <p className="text-center text-xl lg:text-2xl text-gray-400 mb-8">
          Smart learning support platform - posture correction
        </p>
        {isLoading && (
            <div className="mt-4 inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
              <span>Loading camera...</span>
            </div>
          )}
        <div className="mt-6 gap-4 flex flex-col lg:flex-row items-center justify-center">
          <div className=" flex justify-center ">
              <video ref={videoRef} style={{ display: "none" }} />
              <canvas
                ref={canvasRef}
                width="640"
                height="480"
                className="border-4 border-blue-500 rounded-xl w-full max-w-full lg:max-w-md "
              />
          </div>
          <div className=" flex gap-5">
            <div className=" bg-gray-800 p-4 rounded-xl  text-white">
              <h2 className="text-[30px] mb-4">📊 Analysis</h2>
              <p className="text-[20px] text-gray-300 ">
                      Neck: <span className={getStatusColor(feedback.neckTilt)}>{feedback.neckTilt}</span>
              </p>
              <p className="text-[20px] text-gray-300 ">Shoulders: <span className={getStatusColor(feedback.shoulders)}>
                          {feedback.shoulders}</span>
              </p>
              <p className="text-[20px] text-gray-300 ">Torso: <span className={getStatusColor(feedback.torsoTilt)}>
                          {feedback.torsoTilt}</span>
              </p>
            </div>
            <div className=" bg-gray-800 p-4 rounded-xl w-64 text-white ">
              <h2 className="text-[30px] mb-4">🚨 Alerts</h2>
                    {alerts.length === 0 && (
                      
              <p className="text-gray-400 text-xl">No alerts</p>)}
                <div className="space-y-2">
                      {alerts.map((a, i) => (
                    <div
                        key={i}
                        className={`p-2 rounded text-base transform transition-all duration-500 ease-out
                        animate-fadeIn
                        ${a.type === "danger" ? "bg-red-600" : "bg-yellow-600"}`}
                      >{a.message}
                    </div>
                      ))}
                </div>
          </div>
        </div>
            
          </div>
        </div>
      </div>
    
  );
}

export default PoseCamera;
