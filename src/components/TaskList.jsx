import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

function TaskList({ tasks, addTask }) {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task, index) => (
        <div key={index} className="mb-3">
          <span>{task.task}</span>
          <ProgressBar now={task.progress} />
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
