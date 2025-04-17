import React from "react";
import '../../component/LoginRegister.css'
import { Link } from "react-router-dom";

import BALANCEcomponent from "./asset_pic/BALANCEcomponent.png"


export function BEFAST_MAIN_BALANCE () {
 return(
    <div>
        <div className="StrokeAwareCenter" style={{fontWeight:'bold', letterSpacing:"5px"}}>
            B E F A S T
        </div>
        <div className="d-flex justify-content-center gap-4 mt-4 BoxContainer">
        
        <div className="MiddleBoxTestRowBALANCE">
                    <div className="insideTitleBEFAST" style={{fontFamily:"Poppins"}}>
                    B A L A N C E
                    </div>
                    <div className="insideTitleTH" style={{fontFamily:"Prompt"}}>
                    การทรงตัว
                    </div> 
                        <div className="image-container">
                            <img src={BALANCEcomponent} className="centerpictureMAIN"></img>
                        </div>
                    <Link to="/BALANCE"className="insideStart">เริ่มทำ</Link>
                    <div>
                </div>
            </div>
        </div>
        <Link to="/BEFAST_MAIN_EYES" className='login'>next</Link>
    </div>
 )
}