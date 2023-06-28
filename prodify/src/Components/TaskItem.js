import React, { useState } from "react";
import "./TaskItem.css";

function TaskItem({ task, onRemove, onUpdate }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    if (
      editedTask.name.trim() === "" ||
      editedTask.description.trim() === ""
    ) {
      alert("Task name and description cannot be empty");
      return;
    }

    onUpdate(task, editedTask);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <li className={isEditMode ? "edit-mode" : ""}>
      {isEditMode ? (
        <>
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleChange}
            className="edit-input"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="edit-textarea"
          ></textarea>
          <input
            type="date"
            name="deadline"
            value={editedTask.deadline}
            onChange={handleChange}
          />
         <div className="edit-buttons">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          {task.deadline && <p>Deadline: {task.deadline}</p>}
          <div className="view-buttons">
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button className="remove-button" onClick={onRemove}>
              Remove
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;