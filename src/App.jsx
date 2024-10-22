import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import "./App.css";

const WORK_TIME = 10; // For testing, 10 seconds
const SHORT_BREAK = 10; // For testing, 10 seconds
const LONG_BREAK = 10; // For testing, 10 seconds

function App() {
  const [secondsLeft, setSecondsLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("work");
  const [tasks, setTasks] = useState([]);
  const [shortBreakTrack, setShortBreakTrack] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => {
          if (prevSeconds === 0) {
            switchSession();
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    } else if (!isRunning && secondsLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, sessionType]);

  // Session switch logic
  const switchSession = () => {
    if (sessionType === "work" && shortBreakTrack) {
      setSessionType("short-break");
      setSecondsLeft(SHORT_BREAK);
      setShortBreakTrack(false);
    } else if (sessionType === "short-break") {
      setSessionType("work");
      setSecondsLeft(WORK_TIME);
    } else if (sessionType === "long-break") {
      setSessionType("work");
      setSecondsLeft(WORK_TIME);
    } else {
      setSessionType("long-break");
      setSecondsLeft(LONG_BREAK);
      setShortBreakTrack(true);
    }
  };

  // Pause/resume functionality
  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  // Manual session switch
  const handleManualSwitch = (type) => {
    setSessionType(type);
    if (type === "work") {
      setSecondsLeft(WORK_TIME);
    } else if (type === "short-break") {
      setSecondsLeft(SHORT_BREAK);
    } else {
      setSecondsLeft(LONG_BREAK);
    }
  };

  // Adding tasks to the task list
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, { task, progress: 0 }]);
  };

  return (
    <div className="container-sm text-center p-3">
      <h1>Pomodoro Timer</h1>
      <ButtonGroup className="my-3 text-white">
        <Button
          variant={sessionType === "work" ? "dark" : "outline-dark"}
          onClick={() => handleManualSwitch("work")}
        >
          Pomodoro
        </Button>
        <Button
          variant={sessionType === "short-break" ? "dark" : "outline-dark"}
          onClick={() => handleManualSwitch("short-break")}
        >
          Short Break
        </Button>
        <Button
          variant={sessionType === "long-break" ? "dark" : "outline-dark"}
          onClick={() => handleManualSwitch("long-break")}
        >
          Long Break
        </Button>
      </ButtonGroup>
      <Timer
        secondsLeft={secondsLeft}
        isRunning={isRunning}
        handlePause={handlePause}
        sessionType={sessionType}
      />
      <TaskList tasks={tasks} addTask={addTask} />
    </div>
  );
}

export default App;
