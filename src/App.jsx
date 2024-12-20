import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import "./App.css";
import config from "./config";

function App() {
  const [secondsLeft, setSecondsLeft] = useState(config.WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("work");
  const [tasks, setTasks] = useState(config.tasks);
  const [shortBreakTrack, setShortBreakTrack] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => {
          if (prevSeconds === 0) {
            switchSession();
          } else {
            updateTaskProgress(prevSeconds - 1);
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
    if (sessionType === "work" && tasks.length > 0 && config.WORK_TIME > 0) {
      const progressIncrement =
        timeLeft === 0
          ? 100
          : ((config.WORK_TIME - timeLeft) / config.WORK_TIME) * 100;

      if (timeLeft === 0) {
        setTasks((prevTasks) =>
          prevTasks.map((task, index) => ({
            ...task,
            progress: index === 0 ? 100 : task.progress,
          }))
        );
        setTimeout(() => {
          setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            const completedTask = updatedTasks.shift();
            updatedTasks.push(completedTask);
            return updatedTasks.map((task, index) => ({
              ...task,
              progress: index === 0 ? 0 : task.progress,
            }));
          });
        }, 500);
      } else {
        setTasks((prevTasks) =>
          prevTasks.map((task, index) => ({
            ...task,
            progress: index === 0 ? progressIncrement : task.progress,
          }))
        );
      }
    } else if (sessionType !== "work") {
      setTasks((prevTasks) =>
        prevTasks.map((task) => ({ ...task, progress: 0 }))
      );
    }
  };

  const switchSession = () => {
    if (sessionType === "work" && shortBreakTrack) {
      setSessionType("short-break");
      setSecondsLeft(config.SHORT_BREAK);
      setShortBreakTrack(false);
    } else if (sessionType === "short-break") {
      setSessionType("work");
      setSecondsLeft(config.WORK_TIME);
    } else if (sessionType === "long-break") {
      setSessionType("work");
      setSecondsLeft(config.WORK_TIME);
    } else {
      setSessionType("long-break");
      setSecondsLeft(config.LONG_BREAK);
      setShortBreakTrack(true);
    }
  };
  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  const handleManualSwitch = (type) => {
    setSessionType(type);
    if (type === "work") {
      setSecondsLeft(config.WORK_TIME);
    } else if (type === "short-break") {
      setSecondsLeft(config.SHORT_BREAK);
    } else {
      setSecondsLeft(LONG_BREAK);
    }
    setIsRunning(false);
  };

  const addTask = (task) => {
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
