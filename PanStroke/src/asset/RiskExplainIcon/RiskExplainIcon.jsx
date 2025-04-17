import React, { useState } from "react";
import "./RiskExplainIcon.css";

export default function HoverPopup() {
  const [showPage, setShowPage] = useState(false);

  return (
    <div className="icon-container">
      {/* Icon */}
      <div 
        className="info-icon"
        onMouseEnter={() => setShowPage(true)}
        onMouseLeave={() => setShowPage(false)}
      >
        ?
      </div>

      {/* Popup Page (Shown when hovered) */}
      {showPage && (
        <div className="popup-page">
          <div className="Popup_Top">เกณฑ์ความคล้ายโรคหลอดเลือดสมอง</div>
          <div className="Popup_Explain">🟢 ความคล้ายต่ำ 
            <span className="NumPer"> 0-25</span>
            </div>
          <div className="Popup_Explain">🟡 ความคล้ายปานกลาง 
            <span className="NumPer"> 25-50</span>
            </div>
          <div className="Popup_Explain">🟠 ความคล้ายปานกลาง 
            <span className="NumPer"> 50-75</span>
            </div>
          <div className="Popup_Explain">🔴 ความคล้ายสูง 
            <span className="NumPer"> 75-100</span>
            </div>
        </div>
      )}
    </div>
  );
}
