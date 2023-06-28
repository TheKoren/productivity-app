import React, { useState } from "react";
import TaskItem from "./TaskItem";
import TaskPopup from "./TaskPopup";
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const updateTask = (task, editedTask) => {
    const updatedTasks = tasks.map((t) => {
      if (t === task) {
        return { ...t, ...editedTask };
      }
      return t;
    });
  
    setTasks(updatedTasks);
  };

  return (
    <>
      <button onClick={openPopup}>Add Task</button>

      {isPopupOpen && <TaskPopup onClose={closePopup} onSave={addTask} />}

      <ul className="task-list">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            onRemove={() => removeTask(index)}
            onUpdate={updateTask}
          />
        ))}
      </ul>
    </>
  );
}

export default TaskList;