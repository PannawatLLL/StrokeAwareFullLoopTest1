import React from "react";
import '../../component/LoginRegister.css'
import { Link } from "react-router-dom";

import SPEECHcomponent from "./asset_pic/SPEECHcomponent.png"

export function BEFAST_MAIN_SPEECH () {
 return(
    <div>
        <div className="StrokeAwareCenter" style={{fontWeight:'bold', letterSpacing:"5px"}}>
            B E F A S T
        </div>
        <div className="d-flex justify-content-center gap-4 mt-4 BoxContainer">
        
        <div className="MiddleBoxTestRowSPEECH">
                    <div className="insideTitleBEFAST" style={{fontFamily:"Poppins"}}>
                    S P E E C H
                    </div>
                    <div className="insideTitleTH" style={{fontFamily:"Prompt"}}>
                    การพูด
                    </div>
                    <div className="image-container">
                        <img src={SPEECHcomponent} className="centerpictureMAIN4"></img>
                    </div>
                    <Link to="/Speech"className="insideStart">เริ่มทำ</Link>
            </div>
        </div>
        <Link to="/BEFAST_MAIN_TIME" className='login'>next</Link>
    </div>
 )
}