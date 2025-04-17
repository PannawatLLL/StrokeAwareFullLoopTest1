import React, { useState } from "react";
import '../../component/LoginRegister.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import TIMEcomponent from "./asset_pic/TIMEcomponent.png";
import { Link } from "react-router-dom";

export function BEFAST_MAIN_TIME() {
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (isNaN(hours) || isNaN(minutes) || hours === "" || minutes === "") {
            Swal.fire({
                icon: 'error',
                title: 'กรอกข้อมูลไม่ถูกต้อง',
                text: 'กรุณากรอกตัวเลขเท่านั้น',
                customClass: {
                    text: 'swal-text'
                }
            });
            return;
        }

        const h = parseFloat(hours);
        const m = parseFloat(minutes);
        const totalHours = h + m / 60;

        setIsSubmitting(true); // Disable page

        setTimeout(() => {
            if (totalHours > 4.5) {
                Swal.fire({
                    icon: 'warning',
                    title: 'อาการนานเกิน 4.5 ชั่วโมง',
                    text: 'ควรไปโรงพยาบาลทันที!',
                    customClass: {
                        text: 'swal-text'
                    }
                }).then(() => {
                    navigate(`/TimeMap?hours=${hours}&minutes=${minutes}`);
                });
            } else if (totalHours > 1) {
                Swal.fire({
                    icon: 'info',
                    title: 'อาการนานเกิน 1 ชั่วโมง',
                    text: 'แนะนำให้ไปโรงพยาบาล',
                    customClass: {
                        text: 'swal-text'
                    }
                }).then(() => {
                    navigate(`/TimeMap?hours=${hours}&minutes=${minutes}`);
                });
            } else {
                navigate(`/TimeMap?hours=${hours}&minutes=${minutes}`);
            }
        }, 500);
    };

    return (
        <div style={{ pointerEvents: isSubmitting ? "none" : "auto", opacity: isSubmitting ? 0.5 : 1 }}>
            <div className="StrokeAwareCenter" style={{ fontWeight: 'bold', letterSpacing: "5px" }}>
                B E F A S T
            </div>
            <div className="d-flex justify-content-center gap-4 mt-4 BoxContainer">
                <div className="MiddleBoxTestRowTIME">
                    <div className="insideTitleBEFAST" style={{ fontFamily: "Poppins" }}>
                        T I M E
                    </div>
                    <div className="image-container">
                        <img src={TIMEcomponent} className="centerpictureMAIN5"></img>
                    </div>
                    <div className="insideTitleTHTIME" style={{ fontFamily: "Prompt" }}>
                        คุณมีอาการมาข้างต้นมานานแค่ไหนแล้ว
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '45px', marginLeft: "-15px", fontFamily: 'Prompt', fontWeight: "600", fontSize: "25px" }}>
                            <div>ชั่วโมง</div>
                            <div>นาที</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                            <input
                                type="number"
                                min="0"
                                max="23"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    fontSize: '24px',
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    border: '1px solid gray',
                                    fontFamily:"Prompt"
                                }}
                            />
                            <div style={{ fontSize: '24px' }}>:</div>
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={minutes}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "") {
                                        setMinutes("");
                                    } else if (!isNaN(value) && parseInt(value) <= 59) {
                                        setMinutes(value);
                                    } else {
                                        setMinutes("59"); // cap at 59
                                    }
                                }}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    fontSize: '24px',
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    border: '1px solid gray',
                                    fontFamily:"Prompt"
                                }}
                            />

                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="insideStart"
                        disabled={isSubmitting}
                        style={{ marginTop: '20px', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                    >
                        ยืนยัน
                    </button>
                </div>
            </div>
            <Link to="/next" className='login'>next</Link>
        </div>
    );
}
