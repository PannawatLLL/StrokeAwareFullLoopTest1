import React, { useState } from "react";
import "./RiskForm.css";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const StrokeAssessment = () => {
  const questions = [
    "ท่านมีญาติสายตรง (พ่อ แม่ หรือพี่ หรือน้อง) เป็นโรคหัวใจขาดเลือดหรืออัมพาตใช่หรือไม่",
    "ในระยะ 6 เดือนที่ผ่านมา จนถึงปัจจุบัน ท่านสูบบุหรี่ใช่หรือไม่",
    "ท่านมีระดับความดันโลหิตที่วัดได้ มากกว่าหรือเท่ากับ 140/90 mmHg หรือเคยได้รับการวินิจฉัยว่าเป็นโรคความดันโลหิตสูงหรือไม่",
    "ท่านมีระดับน้ำตาลในเลือดจากหลอดเลือดฝอย มากกว่า 120 มิลลิกรัมเปอร์เซ็นต์ หรือเคยได้รับการวินิจฉัยว่าเป็นเบาหวาน",
    "ท่านเคยได้รับการบอกจากแพทย์หรือพยาบาลว่ามีไขมันในเลือดผิดปกติ",
    "ท่านมีดัชนีมวลกาย (BMI) มากกว่า 25 kg/m² หรือขนาดรอบเอวที่วัดได้ ชายมากกว่า 90 ซม. หญิงมากกว่า 80 ซม.",
    "ท่านเคยได้รับการวินิจฉัยเป็นโรคหลอดเลือดสมองหรือไม่",
    "ท่านเป็นโรคหัวใจหรือไม่",
  ];

  // State for user details
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [idNumber, setIdNumber] = useState("");

  // State for answers and other UI
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal state

  // Function to calculate age from birthday
  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Handle answer selection
  const handleAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Calculate risk level
  const calculateRisk = () => {
    const score = answers.filter((answer) => answer === 1).length;
    if (score >= 7) return { text: "เสี่ยงสูง", className: "high" };
    if (score >= 1) return { text: "ปานกลาง", className: "medium" };
    return { text: "ต่ำ", className: "low" };
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate user details
    if (!birthday) {
      Swal.fire({
                title: 'เกิดข้อผิดพลาาด',
                text: 'โปรดกรอก ชื่อ วันเกิด และ บัตรประจำตัวประชาชน',
                icon: 'error',
                confirmButtonText: 'ลองอีกครั้ง',
              });
      return;
    }

    setShowResult(true);


  };

  return (
    <div className="container2">
      <h1 className="title">แบบประเมินความเสี่ยงโรคหลอดเลือดสมอง [f-17 ] ver 66</h1>
      <h2 ClssName="Detail">ตามมาตราฐานของสำนักงานกองทุนสร้างเสริมสุขภาพ</h2>

      {/* User Details Section */}
      <div className="user-details">
        {/* <div className="input-group">
          <label>ชื่อ - นามสกุล:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="กรุณากรอกชื่อ"
          />
        </div> */}
        <div className="input-group">
          <label>วันเกิด:</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            max={new Date().toISOString().split("T")[0]} // Restrict future dates
          />
        </div>
        {/* <div className="input-group">
          <label>เลขประจำตัวประชาชน:</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder="กรุณากรอกเลขประจำตัวประชาชน"
          />
        </div> */}
      </div>

      {/* Questions Section */}
      {questions.map((question, index) => (
        <div key={index} className="question-card">
          <p className="question-text">{question}</p>
          <div className="options">
            <label
              className={answers[index] === 1 ? "selected" : ""}
              onClick={() => handleAnswer(index, 1)}
            >
              <input type="radio" name={`q${index}`} className="hidden" /> ใช่
            </label>
            <label
              className={answers[index] === 0 ? "selected" : ""}
              onClick={() => handleAnswer(index, 0)}
            >
              <input type="radio" name={`q${index}`} className="hidden" /> ไม่ใช่
            </label>
            <label
              className={answers[index] === null ? "selected" : ""}
              onClick={() => handleAnswer(index, null)}
            >
              <input type="radio" name={`q${index}`} className="hidden" /> ไม่ทราบ
            </label>
          </div>
        </div>
      ))}

      {/* Submit Button */}
      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "กำลังบันทึก..." : "ส่งแบบประเมิน"}
      </button>

      {/* Result Display */}
      {showResult && (
        <div className={`result ${calculateRisk().className}`}>
          {/* <p>คุณ {(name)}</p> */}
          <p>อายุ: {calculateAge(birthday)} ปี</p>
          <p>สรุปผลการประเมิน: {calculateRisk().text}</p>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">✅</div>
            <p className="modal-text">บันทึกสำเร็จ!</p>
            <button className="modal-close-btn" onClick={() => setShowSuccessModal(false)}>
              ปิด
            </button>
          </div>
        </div>
      )}
      <div style={{marginTop:"10px"}}>
        เมื่อส่งแบบประเมินแล้วกด <span style={{fontWeight:"bold"}}>กลับ</span>
      </div>
      <Link to="/Inform" className="Back">กลับ</Link>
    </div>
  );
};

export default StrokeAssessment;