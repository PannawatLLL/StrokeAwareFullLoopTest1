import React, { useRef, useEffect, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import "@mediapipe/pose/pose";
import { Link } from "react-router-dom";
import BALANCEnarrator from "./NarratorAsset/BALANCEnarrator.mp3";
import { VoiceTrigger } from "../../../component/TestVoiceSpeech";
import Swal from "sweetalert2";

import Audiobutton from "./NarratorAsset/Audiobutton.png";
import Audiomutebutton from "./NarratorAsset/Audiomutebutton.png";


const BALANCE = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  const [balanceScore, setBalanceScore] = useState(100);
  const [walkingStraight, setWalkingStraight] = useState(true);
  const [beFastRisk, setBeFastRisk] = useState("Normal");
  const [average, setAverage] = useState(null);
  const [isCalculatingAverage, setIsCalculatingAverage] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [startTriggered, setStartTriggered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await pose.send({ image: videoRef.current });
        }
      },
      width: 740,
      height: 580,
    });

    camera.start();

    return () => {
      camera.stop();
    };
  }, []);
  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
    recognition.continuous = true;
    recognition.lang = 'th-TH'; // Proper Thai locale
  
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log('Heard:', transcript);
  
      if (transcript.includes('เริ่มทำ')) {
        Swal.fire({
          title: 'ตรวจพบเสียง',
          text: 'เริ่มต้นการประเมิน',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            title: 'swal-title',
            text: 'swal-title',
          }
        });
  
        // Simulate "เริ่ม" button click
        setShowInstructions(false);
        setStartTriggered(true);
      }
    };
  
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  
    recognition.start();
  
    return () => {
      recognition.stop();
    };
  }, []);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.warn("Auto-play failed:", e);
      });
    }
  }, []);
  
  const onResults = (results) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(video, 0, 0, width, height);
    drawCenterLine(ctx, width, height);

    if (results.poseLandmarks) {
      drawSkeleton(ctx, results.poseLandmarks, width, height);
      drawLandmarks(ctx, results.poseLandmarks, width, height);
      checkBalance(results.poseLandmarks);
      checkWalkingStraight(results.poseLandmarks);
      evaluateBeFastRisk(results.poseLandmarks);
    }
  };

  const drawCenterLine = (ctx, width, height) => {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
  };

  const drawSkeleton = (ctx, landmarks, width, height) => {
    ctx.strokeStyle = "#4169E1";
    ctx.lineWidth = 2;
    const connections = [
      [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
      [11, 23], [12, 24], [23, 24],
      [23, 25], [25, 27], [27, 29], [29, 31],
      [24, 26], [26, 28], [28, 30], [30, 32],
    ];
    connections.forEach(([start, end]) => {
      if (landmarks[start] && landmarks[end]) {
        ctx.beginPath();
        ctx.moveTo(landmarks[start].x * width, landmarks[start].y * height);
        ctx.lineTo(landmarks[end].x * width, landmarks[end].y * height);
        ctx.stroke();
      }
    });
  };

  const drawLandmarks = (ctx, landmarks, width, height) => {
    ctx.fillStyle = "#FFA500";
    landmarks.forEach((landmark) => {
      if (landmark) {
        ctx.beginPath();
        ctx.arc(landmark.x * width, landmark.y * height, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  };

  const checkBalance = (landmarks) => {
    if (!landmarks[11] || !landmarks[12]) return;
    const left = landmarks[11];
    const right = landmarks[12];
    const midX = (left.x + right.x) / 2;
    const deviation = Math.abs(midX - 0.5);
    const percent = Math.max(0, 1 - deviation * 2) * 100;
    setBalanceScore(parseFloat(percent.toFixed(2)));
  };

  const checkWalkingStraight = (landmarks) => {
    if (!landmarks[29] || !landmarks[30]) return;
    const left = landmarks[29];
    const right = landmarks[30];
    const mid = (left.x + right.x) / 2;
    setWalkingStraight(Math.abs(mid - 0.5) < 0.1);
  };

  const evaluateBeFastRisk = (landmarks) => {
    if (!landmarks[11] || !landmarks[12]) return;
    const left = landmarks[11];
    const right = landmarks[12];
    const mid = (left.x + right.x) / 2;
    const deviation = Math.abs(mid - 0.5);
    setBeFastRisk(deviation > 0.12 ? "High Risk" : "Normal");
  };

  const handleGetAverage = () => {
    if (isCalculatingAverage) return;

    if (videoRef.current) {
      videoRef.current.pause();
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }

    setIsCalculatingAverage(true);
    setAverage(null);

    const samples = [];
    const interval = setInterval(() => {
      samples.push(balanceScore);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
      setAverage(avg.toFixed(2));
      setIsCalculatingAverage(false);
    }, 3000);
  };

  const handleStart = () => {
    setShowInstructions(false);
    setStartTriggered(true);
  };

  const playAudio = () => {
    audioRef.current?.play();
  };
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };
  
  return (
    
    <div className="container">
      <div className="BALANCEheader">แบบประเมินการทรงตัว</div>

      {showInstructions && (
        <div className="popup">
          <div className="popup-content">
            <div className="InstructionContainer">
              <div className="BALANCEheader1">วิธีการประเมิน</div>
              <div className="BALANCEinstruc">
                1. ถอยห่างจากกล้อง <span style={{ fontWeight: "700", textDecoration: "underline" }}>5 ก้าว</span> หรือ ประมาณ 3 เมตร
              </div>
              <div className="BALANCEinstruc">2. เมื่อประจำตำแหน่งพูดว่า เริ่มทำ หรือ หากมีผู้ช่วยให้ผู้ช่วยกดเริ่มทำบนหน้าจอ</div>
              <div className="BALANCEinstruc">3. เมื่อเริ่มค่อยๆ เดินเข้าหากล้อง</div>
              <div className="BALANCEinstruc">4. เมื่อเสร็จ กดประเมินบนหน้าจอ</div>
            </div>

            <div className="narratorContainer">
              <audio ref={audioRef} src={BALANCEnarrator} autoPlay />
              <div className="narratorinstruc">คำบรรยายเสียง</div>
              <button onClick={toggleMute}  className="Audiobutton" >
                <img
                  src={isMuted ? Audiobutton : Audiomutebutton}
                  alt="Mute Toggle"
                  style={{ width: "80px", height: "80px" }}
                  
                />
              </button>
            </div>
            <div className="ismutedcontainer">{isMuted && (
              <div className="ismuted">
                เสียงถูกปิดอยู่
              </div>
            )}
            </div>
          </div>
          <div className="startcontainer">
            <button onClick={handleStart} className="BALANCEstartbutton">เริ่ม</button>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ display: "none" }}
      ></video>

      <canvas ref={canvasRef} width={640} height={480} className="canvas"></canvas>

      {average && (
        <p className="score">
          <span style={{ fontFamily: "Prompt", fontWeight: "500", marginTop: "20px" }}>
            ค่าเฉลี่ยในการเดิน:
          </span>
          <div className="percent">{average}%</div>
        </p>
      )}

      {startTriggered && !average && !isCalculatingAverage && (
        <button onClick={handleGetAverage} className="BALANCEcalbutton">
          ประมวลผล
        </button>
      )}

      {isCalculatingAverage && (
        <p style={{ fontFamily: "Prompt", fontWeight: "500", marginTop: "25px", fontSize: "26px" }}>
          กำลังประมวลผล...
        </p>
      )}

      {average && (
        <Link to="/BEFAST_MAIN_EYES" className="Next">
          ถัดไป
        </Link>
      )}

      {/* Spacer at bottom */}
      <div style={{ height: "100px" }}></div>
    </div>
  );
};

export default BALANCE;
