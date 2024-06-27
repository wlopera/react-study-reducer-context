import React, { useState } from "react";
import { useTasksDispatch } from "./TaskContext";

import styles from "./ContextReducer.module.css";

let nextId = 3;

const AddTask = () => {
  const [text, setText] = useState("");
  const dispatch = useTasksDispatch();

  const handleAddTask = () => {
    if (text.trim().length === 0) {
      return;
    }
    setText("");
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  };

  return (
    <div className={styles.addTaskcontainer}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.addTaskInput}
      />
      <button className={styles.addTaskButton} onClick={handleAddTask}>
        Agregar
      </button>
    </div>
  );
};

export default AddTask;
