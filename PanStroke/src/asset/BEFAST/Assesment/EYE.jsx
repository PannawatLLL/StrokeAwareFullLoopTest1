import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../component/LoginRegister.css';

const EYE = () => {
  const [position, setPosition] = useState('center');
  const [movementStep, setMovementStep] = useState(0);
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState(2.0);
  const [isStarted, setIsStarted] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let timer;
  
    if (isStarted && countdown > 0 && !hasCompleted && !isButtonDisabled) {
      timer = setTimeout(() => {
        setCountdown(prev => parseFloat((prev - 0.1).toFixed(1)));
      }, 100); // every 0.1 second
    } else if (countdown <= 0 && !hasCompleted && !isButtonDisabled) {
      moveButton();
    }
  
    return () => clearTimeout(timer);
  }, [countdown, isStarted, hasCompleted, isButtonDisabled]);
  

  useEffect(() => {
    if (movementStep >= 3) {
      setHasCompleted(true);
    }
  }, [movementStep]);

  const moveButton = () => {
    setIsButtonDisabled(true);

    if (movementStep % 2 === 0) {
      setPosition('left');
    } else {
      setPosition('right');
    }

    setMovementStep(prev => prev + 1);
    setCountdown(2);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
  };

  const handleClick = () => {
    if (!isStarted) {
      setIsStarted(true);
    }

    if (movementStep > 0) {
      setScore(prev => prev + 1);
    }

    setCountdown(5);
    moveButton();

    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  const startTest = () => {
    setShowPopup(false);
  };

  return (
    <div style={styles.container}>
      {showPopup && (
        <div className="instruction-popup">
          <div className='EYEheader'>แบบประเมินสายตา</div>
          <div className="EYEpopup-content" style={{ fontFamily: "Prompt" }}>
            <div className='EYEheader1'>วิธีการประเมิน</div>
            <div className="instruction-steps" style={{ fontFamily: "Prompt" }}>
              <div className='EYEinstruc'>1. เมื่อเริ่มกดวงกลมสีแดงแบนหน้าจอ</div>
              <div className='EYEinstruc'>2. กดวงกลมสีแดงเมื่อหยุดคลื่อนที่</div>
              <div className='EYEinstruc'>3. ยกแขนค้างไว้ 15 วินาที</div>
            </div>
            
          </div>
          <button className="EYEstartbutton" onClick={startTest}>เริ่มทำ</button>
        </div>
      )}

      {!hasCompleted ? (
        <button
          onClick={handleClick}
          disabled={isButtonDisabled}
          className={clicked ? 'clicked-effect' : ''}
          style={{
            ...styles.button,
            left: position === 'left' ? '10%' : position === 'right' ? '90%' : '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div style={{ fontSize: "50px" }}>{countdown}</div>
        </button>
      ) : (
        <div style={styles.completeContainer}>
          <h2>คุณทำคะแนนได้ : {score}</h2>
          <h3>การทดสอบเสร็จสิ้น</h3>
          <Link to="/BEFAST_MAIN_FACE" className="EYENext" style={{ marginTop: "30px" }}>
            ถัดไป
          </Link>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  completeContainer: {
    fontFamily: "Prompt",
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  button: {
    position: 'absolute',
    width: '110px',
    height: '110px',
    borderRadius: '50%',
    backgroundColor: 'red',
    color: 'white',
    fontSize: '20px',
    fontFamily: 'Prompt',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    transition: 'left 2s ease, top 2s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
};

export default EYE;
