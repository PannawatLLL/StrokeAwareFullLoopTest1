import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ Add this
import "../../../component/LoginRegister.css";

const FACE = () => {
  const videoRef = useRef(null);
  const previewRef = useRef(null);
  const fileInputRef = useRef(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [confidence, setConfidence] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [statusText, setStatusText] = useState("Start camera to begin analysis");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false); // ✅ New state

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraReady(true);
        setStatusText("Camera ready - Click 'Analyze'");
      }
    } catch (err) {
      setStatusText("Error: " + err.message);
    }
  };

  const analyzeFromCamera = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);

    const dataURL = canvas.toDataURL("image/jpeg");
    if (previewRef.current) {
      previewRef.current.src = dataURL;
      previewRef.current.style.display = "block";
    }

    await analyzeImage(canvas);
  };

  const handleUpload = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const blobURL = URL.createObjectURL(file);
      if (previewRef.current) {
        previewRef.current.src = blobURL;
        previewRef.current.style.display = "block";
      }

      await analyzeImage(canvas);
    };
    img.src = URL.createObjectURL(file);
  };

  const analyzeImage = async (canvas) => {
    setStatusText("Analyzing...");
    setAnalyzing(true);
    setAnalysisComplete(false);

    try {
      const response = await callRoboflowAPI(canvas);
      const bpPrediction = response.predictions.find((p) =>
        p.class.toLowerCase().includes("bell")
      );
      const prob = bpPrediction ? Math.round(bpPrediction.confidence * 100) : 0;
      setConfidence(prob);
      displayResults(prob);
      setAnalysisComplete(true); // ✅ Show link after done
    } catch (err) {
      setStatusText("Error: " + err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const callRoboflowAPI = async (canvas) => {
    const base64Image = canvas.toDataURL("image/jpeg").split(",")[1];

    try {
      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/stroke-aware-bell-s-palsy-pjbqz/9",
        params: {
          api_key: "DIggXL01Uhbk48cAXu3V",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: base64Image,
      });

      return response.data;
    } catch (error) {
      throw new Error("Roboflow API call failed: " + error.message);
    }
  };

  const displayResults = (confidence) => {
    setStatusText(`${confidence}% ความปกติของใบหน้า`);
    if (confidence > 70) {
      setRecommendation("มีความผิดปกติของใบหน้าสูง. ควรปรึกษาแพทย์");
    } else if (confidence > 30) {
      setRecommendation("มีความผิดปกติของใบหน้าปานกลาง. ควรปรึกษาแพทย์.");
    } else {
      setRecommendation("ใบหน้าปกติ");
    }
  };

  const getBarColor = () => {
    if (confidence > 70) return "#F44336";
    if (confidence > 30) return "#FFC107";
    return "#4CAF50";
  };

  return (
    <div style={{ fontFamily: "poppins", maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1 style={{ color: "#8961df", fontFamily:"Prompt",textAlign: "center", fontSize: "70px" }}>การวิเคราะห์ใบห้า</h1>

      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <div className="FACEheader1">วิธีการประเมิน</div>
          <div className="FACEintrocontainer">
          <div className="FACEintroduction">1. กดเริ่มใช้งานกล้อง</div>
          <div className="FACEintroduction" style={{marginRight:"75px"}}>2. กดวิเคราะห์</div>
        </div>
        <button className="FACEstart" onClick={startCamera}>
          เปิดกล้อง
        </button>

        <button
          onClick={analyzeFromCamera}
          disabled={!cameraReady || analyzing}
          className="FACEana"
        >
          ประเมิน
        </button>
        <button onClick={handleUpload} className="FACEupload">
          อัพโหลดรูปภาพ
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h4 style={{ textAlign: "center", fontFamily:"Prompt"}}>ตัวอย่างกล้อง</h4>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: 300, borderRadius: 8, border: "1px solid #ccc" }}
          />
        </div>
        <div>
          <h4 style={{ textAlign: "center",fontFamily:"Prompt" }}>รูปที่ใช้งาน</h4>
          <img
            ref={previewRef}
            style={{ width: 300, borderRadius: 8, border: "1px solid #ccc" }}
            alt="Preview result"
          />
        </div>
      </div>

      {/* Result Section */}
      <div
        style={{
          margin: "20px 0",
          padding: 15,
          border: "1px solid #ddd",
          borderRadius: 5,
          minHeight: 100,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {statusText}
        </div>
        <div
          style={{
            height: 20,
            width: confidence !== null ? `${confidence}%` : "0%",
            background: getBarColor(),
            borderRadius: 10,
            margin: "10px 0",
            transition: "width 0.5s",
          }}
        />
        <div style={{ textAlign: "center", marginTop: 10 }}>{recommendation}</div>
      </div>

      {/* ✅ Next Link after analysis */}
      {analysisComplete && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link to="/BEFAST_MAIN_ARM" className="FACENext">ถัดไป</Link>
        </div>
      )}
    </div>
  );
};

export default FACE;
