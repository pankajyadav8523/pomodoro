import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Alert from "react-bootstrap/Alert"; // Import for pop-up notification
import "./TaskList.css";

function TaskList({ tasks, addTask, deleteTask }) {
  const [newTask, setNewTask] = React.useState("");
  const [showPopup, setShowPopup] = React.useState(false); // State to handle the pop-up

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
      setShowPopup(true); // Show the pop-up when task is added

      // Hide the pop-up after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  };

  // Function to handle "Enter" key press for adding task
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  // Function to determine the color of the progress bar
  const getProgressVariant = (progress) => {
    if (progress < 50) return "success"; // Green
    if (progress < 80) return "warning"; // Orange
    return "danger"; // Red
  };

  return (
    <div>
      <h2>Tasks</h2>
      <div className="scroll-container mb-2">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="task-item d-flex align-items-center justify-content-between mb-3"
          >
            <div className="task-content flex-grow-1">
              <span className="task-name">{task.task}</span>
              {/* ProgressBar with color only for the first task */}
              <ProgressBar
                now={task.progress}
                className="task-progress-bar"
                variant={
                  index === 0
                    ? getProgressVariant(task.progress)
                    : "transparent"
                }
              />
            </div>
            {/* Delete button */}
            <Button
              variant="danger"
              className="delete-task-btn ms-3"
              onClick={() => deleteTask(index)}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>

      {/* Pop-up for confirming task added */}
      {showPopup && (
        <Alert variant="success" className="task-added-popup">
          Task added! Check the bottom of the list.
        </Alert>
      )}

      {/* Input to add new tasks */}
      <Form.Control
        type="text"
        placeholder="Add a task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="mb-2"
        onKeyDown={handleKeyPress}
      />
      <Button variant="success" onClick={handleAddTask}>
        + Add Task
      </Button>
    </div>
  );
}

export default TaskList;
