import React, { useRef, useState } from "react";
import "./TaskList.css"; // Import CSS file for TaskList component

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [deadline, setDeadline] = useState("");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setTaskName("");
    setDescription("");
    setEditIndex(-1);
    setDeadline("");
  };

  const saveTask = () => {
    if (taskName.trim() === "" || description.trim() === "") {
      alert("Please enter task name and description");
      return;
    }

    if (editIndex !== -1) {
      // Editing an existing task
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks[editIndex] = {
          name: taskName,
          description: description,
        };
        return updatedTasks;
      });
    } else {
      // Adding a new task
      const newTask = {
        name: taskName,
        description: description,
        deadline: deadline,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    closePopup();
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTaskName(taskToEdit.name);
    setDescription(taskToEdit.description);
    setEditIndex(index);
    openPopup();
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <button onClick={openPopup}>Add Task</button>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>{editIndex !== -1 ? "Edit Task" : "Add Task"}</h2>
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
              <button onClick={closePopup}>Cancel</button>
              <button onClick={saveTask}>
                {editIndex !== -1 ? "Save Changes" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            {task.deadline && <p>Deadline: {task.deadline}</p>}
            <div className="task-actions">
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => removeTask(index)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskList;