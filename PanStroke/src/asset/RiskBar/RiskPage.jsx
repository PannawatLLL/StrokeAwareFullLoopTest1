import React, { useState, useEffect } from "react";
import "./RiskPage.css";
import Brain from "./Brain.png";

export default function RiskPage() {
  const [risk, setRisk] = useState(80);

  useEffect(() => {
    const fetchRiskFromAI = async () => {
      try {
        const response = await fetch("http://localhost:5000/risk"); // AI API Endpoint
        const data = await response.json();
        setRisk(data.risk); // Update risk with AI-generated value
      } catch (error) {
        console.error("Error fetching AI risk data:", error);
      }
    };

    const interval = setInterval(fetchRiskFromAI, 2000); // Fetch AI risk every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Circle properties
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (risk / 100) * circumference;

  // Determine stroke color based on risk level
  let strokeColor = "red"; // Default: High risk
  let backgroundColor = "#f4c2c2"; // Default: Red background

  if (risk <= 25) {
    strokeColor = "#1cc936";
    backgroundColor = "#b6f5b6"; // Light green
  } else if (risk <= 50) {
    strokeColor = "yellow";
    backgroundColor = "#ffe88c"; // Light yellow
  } else if (risk <= 75) {
    strokeColor = "orange";
    backgroundColor = "#ffca80"; // Light orange
  } else {
    strokeColor = "red";
    backgroundColor = "#f4c2c2"; // Light red
  }

  return (
    <div className="risk-container">
      {/* Circular Progress Bar */}
      <div className="circular-progress">
        <svg width="220" height="220" viewBox="0 0 100 100">
          {/* Background Circle (Dynamic Color) */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="10"
            stroke={backgroundColor} // Change background color
            fill="transparent"
          />

          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="10"
            stroke={strokeColor} // Dynamic progress color
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />

          {/* Percentage Text */}
          <text x="50" y="55" textAnchor="middle" fontSize="20px" fontWeight="bold">
            {risk}%
          </text>
        </svg>
      </div>

      <p className="risk-text">กราฟคลื่นไฟฟ้าสมองมีความคล้ายโรคหลอดเลือดสมอง {risk} %</p>

      <div className="risk-bar">
        <div className="HighLow" style={{ left: "4%" }}>
          ต่ำ
        </div>
        <div className="marker" style={{ left: "25%" }}>
          <span className="NumPercent">25</span>
        </div>
        <div className="marker" style={{ left: "50%" }}>
          <span className="NumPercent">50</span>
        </div>
        <div className="marker" style={{ left: "75%" }}>
          <span className="NumPercent">75</span>
        </div>
        <div className="HighLow" style={{ left: "94%" }}>
          สูง
        </div>

        <div className="arrow" style={{ left: `${Math.min(risk, 95)}%` }}></div>
      </div>
    </div>
  );
}
