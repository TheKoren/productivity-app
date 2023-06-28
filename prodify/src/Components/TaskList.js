import React, { useRef, useState } from "react";

function TaskList() {
  const inputRef = useRef();
  const [tasks, setTasks] = useState([]);
  const [submit, setSubmit] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const taskValue = inputRef.current.value;
    if (taskValue.length > 0) {
      setSubmit(true);
      setTasks((prevTasks) => [...prevTasks, taskValue]);
      inputRef.current.value = "";
      setSubmit(false);
    } else {
        alert('Write something bro...')
    }
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };
  

  return (
    <>
      <input
        placeholder="Enter task name"
        ref={inputRef}
      />
      <button onClick={submitHandler}>
        {!submit ? "Submit" : "Submitting..."}
      </button>
      <ul>
        {tasks.map((value, index) => (
          <li key={index}>
            {value}
            <button onClick={() => removeTask(index)}>Ready</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskList;