import React, { useState } from "react";
import TaskItem from "./TaskItem";
import TaskPopup from "./TaskPopup";
import "./TaskList.css";

function TaskList() {
  const [boards, setBoards] = useState([]);
  const [activeBoardIndex, setActiveBoardIndex] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const addTask = (newTask) => {
    setBoards((prevBoards) => {
      const updatedBoards = [...prevBoards];
      updatedBoards[activeBoardIndex].tasks.push(newTask);
      return updatedBoards;
    });
  };

  const removeTask = (taskIndex) => {
    setBoards((prevBoards) => {
      const updatedBoards = [...prevBoards];
      updatedBoards[activeBoardIndex].tasks.splice(taskIndex, 1);
      return updatedBoards;
    });
  };

  const updateTask = (taskIndex, editedTask) => {
    setBoards((prevBoards) => {
      const updatedBoards = [...prevBoards];
      updatedBoards[activeBoardIndex].tasks[taskIndex] = {
        ...updatedBoards[activeBoardIndex].tasks[taskIndex],
        ...editedTask,
      };
      return updatedBoards;
    });
  };

  const createBoard = () => {
    if (newBoardName.trim() !== "") {
      const newBoard = {
        name: newBoardName,
        tasks: [],
      };
      setBoards([...boards, newBoard]);
      setActiveBoardIndex(boards.length);
      setNewBoardName("");
    }
  };

  const deleteBoard = () => {
    if (activeBoardIndex !== null) {
      setBoards((prevBoards) => {
        const updatedBoards = [...prevBoards];
        updatedBoards.splice(activeBoardIndex, 1);
        return updatedBoards;
      });
      setActiveBoardIndex(null);
    }
  };

  const editBoardName = (newName) => {
    if (activeBoardIndex !== null) {
      setBoards((prevBoards) => {
        const updatedBoards = [...prevBoards];
        updatedBoards[activeBoardIndex].name = newName;
        return updatedBoards;
      });
    }
  };

  return (
    <div className="task-list-container">
      <div className="side-menu">
        <h2 className="menu-heading">Boards</h2>
        <ul className="board-list">
          {boards.map((board, index) => (
            <li
              key={index}
              className={`board-item ${index === activeBoardIndex ? "active" : ""}`}
              onClick={() => setActiveBoardIndex(index)}
            >
              {board.name}
            </li>
          ))}
        </ul>
        <div className="board-actions">
        <input
            type="text"
            className="new-board-name"
            placeholder="Enter board name"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
          <button className="add-board-button" onClick={createBoard}>
            Add Board
          </button>
          <button className="delete-board-button" onClick={deleteBoard}>
            Delete Board
          </button>
          <input
            type="text"
            className="edit-board-name"
            placeholder="Edit Board Name"
            value={activeBoardIndex !== null ? boards[activeBoardIndex].name : ""}
            onChange={(e) => editBoardName(e.target.value)}
          />
        </div>
      </div>

      <div className="task-content">
        {activeBoardIndex !== null && (
          <>
            <button className="add-task-button" onClick={openPopup}>
              Add Task
            </button>

            {isPopupOpen && <TaskPopup onClose={closePopup} onSave={addTask} />}

            <ul className="task-list">
              {boards[activeBoardIndex].tasks.map((task, index) => (
                <TaskItem
                  key={index}
                  task={task}
                  onRemove={() => removeTask(index)}
                  onUpdate={(editedTask) => updateTask(index, editedTask)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskList;