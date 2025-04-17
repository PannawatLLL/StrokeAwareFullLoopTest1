import React from "react";
import '../../component/LoginRegister.css'
import { Link } from "react-router-dom";

import FACEcomponent from "./asset_pic/FACEcomponent.png"

export function BEFAST_MAIN_FACE () {
 return(
    <div>
        <div className="StrokeAwareCenter" style={{fontWeight:'bold', letterSpacing:"5px"}}>
            B E F A S T
        </div>
        <div className="d-flex justify-content-center gap-4 mt-4 BoxContainer">
        
        <div className="MiddleBoxTestRowFACE">
                    <div className="insideTitleBEFAST" style={{fontFamily:"Poppins"}}>
                    F A C E
                    </div>
                    <div className="insideTitleTH" style={{fontFamily:"Prompt"}}>
                    การตอบสนองของใบหน้า
                    </div>
                    <div className="image-container">
                        <img src={FACEcomponent} className="centerpictureMAIN2"></img>
                    </div>
                    <Link to="/FACE"className="insideStart">เริ่มทำ</Link>
            </div>
        </div>
        <Link to="/BEFAST_MAIN_ARM" className='login'>next</Link>
    </div>
 )
}