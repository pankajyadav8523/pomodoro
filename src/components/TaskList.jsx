import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./TaskList.css";

function TaskList({ tasks, addTask, deleteTask }) {
  const [newTask, setNewTask] = React.useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
    }
  };

  const getProgressVariant = (progress) => {
    if (progress < 50) return "success"; // Green
    if (progress < 80) return "warning"; // Orange
    return "danger"; // Red
  };

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task, index) => (
        <div
          key={index}
          className="task-item d-flex align-items-center justify-content-between mb-3"
        >
          <div className="task-content flex-grow-1">
            <span className="task-name">{task.task}</span>
            <ProgressBar
              now={task.progress}
              className="task-progress-bar"
              variant={getProgressVariant(task.progress)}
            />
          </div>
          <Button
            variant="danger"
            className="delete-task-btn ms-3"
            onClick={() => deleteTask(index)}
          >
            ✕
          </Button>
        </div>
      ))}
      <Form.Control
        type="text"
        placeholder="Add a task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="mb-2"
      />
      <Button variant="success" onClick={handleAddTask}>
        + Add Task
      </Button>
    </div>
  );
}

export default TaskList;
