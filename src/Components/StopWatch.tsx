import React from 'react'
import { useState } from 'react';
import './StopWatch.css';
import Button from "@mui/material/Button"; 
import TimerIcon from '@mui/icons-material/Timer';
const StopWatch = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [time, setTime] = useState<number>(0);
    const [activeButton, setActiveButton] = useState<string>("");
    const [pauseResumeButton, setPauseResume] = useState<string>("none");
    const [resetButton, setResetButton] = useState<string>("none");
    React.useEffect(() => {
        let interval;
        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
        setActiveButton('none');
        setPauseResume('');
        setResetButton('');
    };
 
    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };
 
    const handleReset = () => {
        setIsActive(false);
        setTime(0);
        setActiveButton('');
        setPauseResume('none');
        setResetButton('none');
    };
    return (
    <div>
    <TimerIcon className="clock-size" style={{fontSize: 50 }}/>
    <br/>
    <span className="digits">
      {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
    </span>
    <span className="digits">
      {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
    </span>
    <span className="digits mili-sec">
      {("0" + ((time / 10) % 100)).slice(-2)}
    </span>
    <br />
      <Button variant="contained" onClick={handleStart} style={{display:activeButton}}>
        Start
      </Button>      
      <Button variant="outlined" color="secondary" onClick={handlePauseResume} style={{display:pauseResumeButton}}>
         {isPaused ? "Resume" : "Pause"}
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button variant="outlined" color="error" onClick={handleReset} style={{display:resetButton}}>
        Reset
      </Button>
    </div>
  )
}
export default StopWatch
