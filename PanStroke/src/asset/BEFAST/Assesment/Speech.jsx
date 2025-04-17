import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import stringSimilarity from 'string-similarity';
import './Speech.css';

const SpeechEvaluationApp = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState(null);

  const task = {
    text: "ยายพาฉันไปซื้อขนมที่ตลาด",
    prompt: "พูดประโยค 'ยายพาฉันไปซื้อขนมที่ตลาด'"
  };

  const evaluationLevels = [
    { label: "พูดชัดเจน", color: "#10B981", emoji: "✅" },
    { label: "พูดไม่ชัดเล็กน้อย", color: "#F59E0B", emoji: "⚠️" },
    { label: "ฟังไม่เข้าใจ", color: "#EF4444", emoji: "❌" }
  ];

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const getScore = (spoken) => {
    const similarity = stringSimilarity.compareTwoStrings(spoken.trim(), task.text.trim());
    if (similarity >= 0.85) return 0;
    if (similarity >= 0.5) return 1;
    return 2;
  };

  const startEvaluation = () => {
    resetTranscript();
    setIsRecording(true);
    SpeechRecognition.startListening({ language: 'th-TH', continuous: false });
  };

  const stopEvaluation = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);

    const score = getScore(transcript);
    setResult({
      transcript,
      score,
      level: evaluationLevels[score]
    });
    setIsComplete(true);
  };

  const resetAll = () => {
    setResult(null);
    setIsComplete(false);
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="spe-error-container">
        <div className="spe-error-card">
          <h2>⚠️ ไม่รองรับการใช้งาน</h2>
          <p>เบราว์เซอร์นี้ไม่รองรับการจดจำเสียง กรุณาใช้ Chrome หรือ Edge</p>
        </div>
      </div>
    );
  }

  return (
    <div className="spe-main" style={{ fontFamily: "Prompt" }}>
      <div className="spe-header">
        <h1 style={{ fontSize: "42px" }}>ระบบประเมินการออกเสียง</h1>
        <p style={{ fontSize: "17px", letterSpacing: "1px" }}>ทดสอบความชัดเจนในการพูดของคุณ</p>
      </div>

      {!isComplete ? (
        <div className="spe-evaluation-container">
          <div className="spe-task-card">
            <div className="spe-task-prompt">
              <span className="spe-prompt-label">โปรด:</span>
              <h2>{task.prompt}</h2>
            </div>
            <div className="spe-target-text">
              <h3>{task.text}</h3>
            </div>
          </div>

          <div className="spe-recording-section">
            <button
              className={`spe-record-button ${isRecording ? 'spe-recording' : ''}`}
              onClick={isRecording ? stopEvaluation : startEvaluation}
            >
              <div className="spe-button-content">
                {isRecording ? (
                  <>
                    <div className="spe-pulse-animation" />
                    <span>หยุดบันทึก</span>
                  </>
                ) : (
                  <>
                    <div className="spe-mic-icon" />
                    <span>เริ่มบันทึกเสียง</span>
                  </>
                )}
              </div>
            </button>

            {transcript && (
              <div className="spe-speech-preview">
                <p>คุณพูดว่า:</p>
                <div className="spe-transcript">{transcript}</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="spe-results-container">
          <h2 style={{ fontSize: "42px", fontWeight: "600" }}>ผลการประเมิน</h2>

          <div className="spe-results-summary">
            <div
              className="spe-result-card"
              style={{ borderLeft: `4px solid ${result.level.color}` }}
            >
              <div className="spe-result-content">
                <h3>{task.text}</h3>
                <p className="spe-prompt-text">{task.prompt}</p>
                <p className="spe-transcript-text">"{result.transcript}"</p>
              </div>
              <div
                className="spe-score-tag"
                style={{
                  backgroundColor: `${result.level.color}20`,
                  color: result.level.color
                }}
              >
                {result.level.emoji} {result.level.label}
              </div>
            </div>
          </div>

          <div style={{ marginTop: "40px" }}>
            <button onClick={resetAll} className="spe-record-button">ลองใหม่</button>
          </div>
          <Link to="/BEFAST_MAIN_TIME" className="EYENext" style={{ marginLeft: "895px", marginTop:"70px"}}>
              ถัดไป
            </Link>
        </div>
      )}
    </div>
  );
};

export default SpeechEvaluationApp;
