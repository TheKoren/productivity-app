import React, { useState } from "react";

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
    <li>
      {isEditMode ? (
        <>
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          ></textarea>
          <input
            type="date"
            name="deadline"
            value={editedTask.deadline}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          {task.deadline && <p>Deadline: {task.deadline}</p>}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={onRemove}>Remove</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;