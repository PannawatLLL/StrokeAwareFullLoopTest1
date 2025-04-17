import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./LoginRegister.css";
import Plus from "./Plus.png";
import { Link } from 'react-router-dom';
import {Timer} from '../asset/Timer/Timer.jsx';
import HoverPopup from "../asset/RiskExplainIcon/RiskExplainIcon.jsx";
import { EEGInfo } from "../asset/EEGInform/EEGInfo.jsx";

import BEFASTcomponent from "./BEFASTcomponent.png"
import BrainComponentVer66 from "./Braincom.png"
import AtaxiaComponent from "./Ataxia.png"
import WeaknessComponent from "./MotorWeakness.png"
import NIHSSComponent from "./NIHSS.png"

export function Inform() {
    return (
        <div>
            <div className="StrokeAwareCenter">
                    Stroke Aware
                    <img src={Plus} alt="Plus Icon" className="PlusIconCenter" />
                  </div>
                  
            {/* <EEGInfo/> */}
            <div className="d-flex justify-content-center gap-4 mt-4 BoxContainer">
                <div className="Top-2" style={{margin:'11px'}}>
                        แบบประเมินความเสี่ยงโรคหลอดเลือดสมอง
                </div>
                <div className="MiddleBoxRow1">
                    <div className="insideTitle" style={{fontFamily:"poppins" }}>
                    B E F A S T
                    </div>
                    <img src={BEFASTcomponent} className="imagecomponentright4"></img>
                    <div className="insideDetail">
                        BEFAST เป็นเทคนิคที่ช่วยให้จดจำอาการและอาการแสดงของโรคหลอดเลือดสมองได้ง่ายและครบถ้วน การรู้จักอาการและนำผู้ป่วยส่งโรงพยาบาลได้อย่างรวดเร็วจะช่วยเพิ่มโอกาสในการฟื้นตัวลดความเสี่ยงจากภาวะแทรกซ้อนได้
                    </div>
                        <Link to="/BEFAST_MAIN_BALANCE"className="insideStart" >เริ่มทำ</Link>
                    
                </div>
                {/* <div className="MiddleBoxLast">
                    <div className="InsideText">
                        ข้อเกี่ยวกับการใช้งาน
                    </div>
                    <Link to="/VoiceTrigger"className="insideStart" >Test</Link>
                </div> */}
            </div>
        </div>
    );  
}

                {/* </div>
                <div className="RightBox">
                    <div className="InsideText">
                        ไปยังหน้า OTP
                    </div>
                    <Link to="/Otp" className="submit" >OTP</Link>
                     */}
                    