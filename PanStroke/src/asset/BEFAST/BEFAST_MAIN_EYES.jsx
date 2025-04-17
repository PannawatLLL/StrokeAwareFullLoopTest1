import React from "react";
import '../../component/LoginRegister.css'
import { Link } from "react-router-dom";

import EYEcomponent from "./asset_pic/EYEcomponent.png"

export function BEFAST_MAIN_EYES () {
 return(
    <div>
        <div className="StrokeAwareCenter" style={{fontWeight:'bold', letterSpacing:"5px"}}>
            B E F A S T
        </div>
        <div className="d-flex justify-content-center gap-4 mt-4 BoxContainer">
        
        <div className="MiddleBoxTestRowEYE">
                    <div className="insideTitleBEFAST" style={{fontFamily:"Poppins"}}>
                    E Y E S 
                    </div>
                    <div className="insideTitleTH" style={{fontFamily:"Prompt", fontSize:"20px"}}>
                    การมองเห็น การตอบสนองของตา
                    </div>
                    <div className="image-container">
                        <img src={EYEcomponent} className="centerpictureMAIN1"></img>
                    </div>
                    
                    <Link to="/EYE"className="insideStart">เริ่มทำ</Link>
            </div>
        </div>
        <Link to="/BEFAST_MAIN_FACE" className='login'>next</Link>
    </div>
 )
}