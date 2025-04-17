import React from "react";
import Plus from "./Plus.png"
import {Timer} from "../asset/Timer/Timer";
import { useState } from "react";
import OTP from "../asset/Otp/Otp";
import RiskPage from "../asset/RiskBar/RiskPage";
import RiskForm from "../asset/RiskForm/Ver66"
import LeftInfoBox from "../asset/LeftInfo/LeftInfo";
import HoverPopup from "../asset/RiskExplainIcon/RiskExplainIcon";
import "./LoginRegister.css";

export function ClassificationSystem() {
    return(
        <div>
            <div className="StrokeAwareTopLeft">
                Stroke Aware
                <img src={Plus} style={{height:"40px", width: "auto"}}></img>
            </div>
            <div className="Top-2">
                ผลการตรวจ
            </div>
            <LeftInfoBox/>
            <RiskPage/>
        </div>
    )
}

