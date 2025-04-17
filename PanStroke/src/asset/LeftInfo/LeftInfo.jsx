import { useState } from "react";
import "./LeftInfo.css";
import { calculateRisk } from "../RiskForm/riskCalculator";

export default function LeftInfoBox() {
    // Simulated answers array (Replace this with real answers from the form)
    const [answers, setAnswers] = useState([1, 1, 0, 1, 0, 1, 0, 1]); 

    // Calculate risk based on answers
    const riskResult = calculateRisk(answers);

    return (
        <div className="Box1">
            <div className="BoxInfoTop">เกณฑ์ความคล้ายโรคหลอดเลือดสมอง</div>
            <div className="Explain_container">
                <div className="Explain">🟢 ความคล้ายต่ำ <span className="NumPer"> 0-25</span></div>
                <div className="Explain">🟡 ความคล้ายปานกลาง <span className="NumPer"> 25-50</span></div>
                <div className="Explain">🟠 ความคล้ายปานกลาง <span className="NumPer"> 50-75</span></div>
                <div className="Explain">🔴 ความคล้ายสูง <span className="NumPer"> 75-100</span></div>
                <div className="BoxClassi">เกณฑ์ความคล้ายโรคหลอดเลือดสมองจากแบบประเมิน</div>
                
                <div className="ClassiResult">{riskResult.text}</div>
                <div className="dat">-------------------------------</div>

                <div className="Explain">ชื่อ : <span className="NumPer">ปัณณวัฒน์ เลิศมัลลิกาพร</span></div>
                <div className="Explain">อายุ <span className="NumPer">75</span></div>
            </div>
        </div>
    );
}
