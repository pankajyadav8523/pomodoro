import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import "./App.css";

const WORK_TIME = 15; // 10 seconds for testing
const SHORT_BREAK = 5; // 10 seconds for testing
const LONG_BREAK = 10; // 10 seconds for testing

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
            updateTaskProgress(prevSeconds - 1); // Pass the updated time left
            return prevSeconds - 1;
          }
        });
      }, 1000);
    } else if (!isRunning && secondsLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, sessionType]);

  const updateTaskProgress = (timeLeft) => {
    // Ensure timeLeft and WORK_TIME are valid
    if (
      sessionType === "work" &&
      tasks.length > 0 &&
      WORK_TIME > 0 &&
      timeLeft >= 0
    ) {
      const progressIncrement =
        timeLeft === 0 ? 100 : ((WORK_TIME - timeLeft) / WORK_TIME) * 100;
      setTasks((prevTasks) =>
        prevTasks.map((task) => ({
          ...task,
          progress: progressIncrement,
        }))
      );
    } else if (sessionType !== "work") {
      // Reset progress during break
      setTasks((prevTasks) =>
        prevTasks.map((task) => ({ ...task, progress: 0 }))
      );
    }
  };

  // Switching session logic
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
  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  const handleManualSwitch = (type) => {
    // Handle manual switch and set correct session time
    setSessionType(type);
    if (type === "work") {
      setSecondsLeft(WORK_TIME);
    } else if (type === "short-break") {
      setSecondsLeft(SHORT_BREAK);
    } else {
      setSecondsLeft(LONG_BREAK);
    }
    setIsRunning(false); // Pause when switching manually
  };

  const addTask = (task) => {
    // Reset progress for new task
    setTasks((prevTasks) => [...prevTasks, { task, progress: 0 }]);
  };

  const deleteTask = (taskIndex) => {
    setTasks((prevTasks) =>
      prevTasks.filter((_, index) => index !== taskIndex)
    );
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
      <TaskList tasks={tasks} addTask={addTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
