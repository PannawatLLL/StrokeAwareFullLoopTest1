import React from "react";
import '../../component/LoginRegister.css'
import { Link } from "react-router-dom";

import ARMcomponent from "./asset_pic/ARMcomponent.png"

export function BEFAST_MAIN_ARM () {
 return(
    <div>
        <div clas></div>
        <div className="StrokeAwareCenter" style={{fontWeight:'bold', letterSpacing:"5px"}}>
            B E F A S T
        </div>
        <div className="d-flex justify-content-center gap-4 mt-4 BoxContainer">
        
        <div className="MiddleBoxTestRowARM">
                    <div className="insideTitleBEFAST" style={{fontFamily:"Poppins"}}>
                    A R M s
                    </div>
                    <div className="insideTitleTH" style={{fontFamily:"Prompt"}}>
                    การตอบสนองของแขน
                    </div>
                    <div className="image-container">
                        <img src={ARMcomponent} className="centerpictureMAIN3"></img>
                    </div>
                    <Link to="/ArmStrengthTest"className="insideStart">เริ่มทำ</Link>
            </div>
        </div>
        <Link to="/BEFAST_MAIN_SPEECH" className='login'>next</Link>
    </div>
 )
}