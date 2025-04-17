import Register from './component/Register';
import Login from './component/Login';
import Ver66 from './asset/RiskForm/Ver66';
import Otp from './asset/Otp/Otp'
import { ClassificationSystem } from './component/ClassificationSystem';
import { Inform } from './component/Inform';
import HandRaiseDetection from './asset/MotorWeakHandRaise/HandRaiseDetection'
import {BEFAST_MAIN_BALANCE} from './asset/BEFAST/BEFAST_MAIN_BALANCE'
import {BEFAST_MAIN_EYES} from './asset/BEFAST/BEFAST_MAIN_EYES'
import {BEFAST_MAIN_FACE} from './asset/BEFAST/BEFAST_MAIN_FACE'
import {BEFAST_MAIN_ARM} from './asset/BEFAST/BEFAST_MAIN_ARM'
import {BEFAST_MAIN_SPEECH} from './asset/BEFAST/BEFAST_MAIN_SPEECH'
import {BEFAST_MAIN_TIME} from './asset/BEFAST/BEFAST_MAIN_TIME'
import ArmStrengthTest from './asset/BEFAST/Assesment/ARM_ass'
import Speech from './asset/BEFAST/Assesment/Speech';
import BALANCE from './asset/BEFAST/Assesment/BALANCE'
import FACE from './asset/BEFAST/Assesment/FACE'
import EYE from './asset/BEFAST/Assesment/EYE'
import TimeMap from './asset/BEFAST/Assesment/TimeMap.js'
import {TestAsset} from './component/TestAsset.js'
import {VoiceTrigger} from './component/TestVoiceSpeech.js'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route
                        exact
                        path="/"
                        element={<Login />}
                    />
        <Route          path="/Register"
                        element={<Register/>}
                    />
        <Route
                        path="/ClassificationSystem"
                        element={<ClassificationSystem/>}
                    />
        <Route
                        path="/Inform"
                        element={<Inform/>}
                    />
        <Route
                        path="/Ver66"
                        element={<Ver66/>}
                    />
         <Route
                        path="/Otp"
                        element={<Otp/>}
                    />
        <Route
                        path="/HandRaiseDetection"
                        element={<HandRaiseDetection/>}
                    />
        <Route
                        path="/BEFAST_MAIN_BALANCE"
                        element={<BEFAST_MAIN_BALANCE/>}
                    />
        <Route
                        path="/BEFAST_MAIN_EYES"
                        element={<BEFAST_MAIN_EYES/>}
                    />
        <Route
                        path="/BEFAST_MAIN_FACE"
                        element={<BEFAST_MAIN_FACE/>}
                    />
        <Route
                        path="/BEFAST_MAIN_ARM"
                        element={<BEFAST_MAIN_ARM/>}
                    />
        <Route
                        path="/BEFAST_MAIN_SPEECH"
                        element={<BEFAST_MAIN_SPEECH/>}
                    />
        <Route
                        path="/BEFAST_MAIN_TIME"
                        element={<BEFAST_MAIN_TIME/>}
                    />         
        <Route
                        path="/ArmStrengthTest"
                        element={<ArmStrengthTest/>}
                    />      
        <Route
                        path="/Speech"
                        element={<Speech/>}
                    />
        <Route
                        path="/BALANCE"
                        element={<BALANCE/>}
                    />
        <Route
                        path="/FACE"
                        element={<FACE/>}
                    />
        <Route
                        path="/EYE"
                        element={<EYE/>}
                    />  
        <Route
                        path="/TimeMap"
                        element={<TimeMap/>}
                    />
        <Route
                        path="/TestAsset"
                        element={<TestAsset/>}
                    />
        <Route
                        path="/VoiceTrigger"
                        element={<VoiceTrigger/>}
                    />     
      </Routes>
    </Router>
  );
}

export default App;

