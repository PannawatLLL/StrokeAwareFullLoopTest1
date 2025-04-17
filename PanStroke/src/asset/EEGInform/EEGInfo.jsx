import "../../component/LoginRegister.css";
import React from "react"
import Plus from "./Plus.png";
import {Timer} from '../Timer/Timer.jsx'

import Head1 from "./Assembly_3.png"

export function EEGInfo() {
  return (
    <div>
      <div className="Top-2">
        ข้อควรปฏิบัติในการใช้งาน
      </div>
      
      {/* Bootstrap Flexbox Layout */}
      <div className="d-flex justify-content-center gap-4 mt-4 BoxContainer">
        <div className="LeftBox">
          <div className="InsideText">
            <span style={{ textDecoration: "underline" }}>
              ข้อควรปฏิบัติขณะใช้งาน
            </span>{" "}
            อุปกรณ์การตรวจ EEG
          </div>
          <div className="Explain1">1. ห้ามขยับขณะทำการตรวจ</div>
          <div className="Explain1">2. หลับตาขณะทำการตรวจ</div>
          
          <div
            className="InsideText_CountDown"
            style={{ paddingTop: "30px", fontSize: "35px" }}
          >
            นับถอยหลัง
          </div>
          
          <Timer />
        </div>
        
        <div className="MiddleBox">
          <div className="InsideText">
            <span style={{ textDecoration: "underline" }}>
              วิธีการใช้งาน
            </span>{" "}
            อุปกรณ์การตรวจ EEG
          </div>
          <div className="Explain1">1. สวมอุปกรณ์คาดศรีษะ</div>
          <div className="Explain1">2. เปิดเครื่อง</div>
          <div className="Explain1">3. กดปุ่มสีเขียวเพื่อเริ่มต้นการตรวจ</div>
          <div className="Explain1">4. เมื่อการตรวจเสร็จรอ OTP จากอุปกรณ์</div>
          <div className="Explain1">5. กรอก OTP ลงเว็บไซต์</div>
          <div className="Explain1">6. กรอกแบบสอบถาม</div>
          <div className="Explain1">7. รอรับผลการตรวจ</div>
          
          <div className="InsideText">
            รูปแบบการสวม
          </div>
          <div className="Head_container">
            <img src={Head1} className="Head1_img" alt="EEG Headset Diagram" />
          </div>
        </div>
      </div>
    </div>
  )
}
