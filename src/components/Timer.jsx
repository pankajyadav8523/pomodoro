import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Timer({ secondsLeft, isRunning, handlePause, sessionType }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Card className="my-4 p-4 text-center text-white">
      <h2>
        {sessionType === "work"
          ? "Work Time"
          : sessionType === "short-break"
          ? "Short Break"
          : "Long Break"}
      </h2>
      <div className="display-3">{formatTime(secondsLeft)}</div>
      <Button
        variant={isRunning ? "success" : "primary"}
        className="mt-3"
        onClick={handlePause}
      >
        {isRunning ? "Pause" : "Start"}
      </Button>
    </Card>
  );
}

export default Timer;
