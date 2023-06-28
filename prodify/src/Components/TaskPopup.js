import React, { useState } from "react";

function TaskPopup({ onClose, onSave }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSave = () => {
    if (taskName.trim() === "" || description.trim() === "") {
      alert("Please enter task name and description");
      return;
    }

    onSave({
      name: taskName,
      description: description,
      deadline: deadline,
    });

    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <div className="popup-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default TaskPopup;