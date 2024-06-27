import React, { useState } from "react";

import styles from "./ContextReducer.module.css";

const AddTask = ({ onAddTask }) => {
  const [text, setText] = useState("");
  return (
    <div className={styles.addTaskcontainer}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.addTaskInput}
      />
      <button
        className={styles.addTaskButton}
        onClick={() => {
          setText("");
          onAddTask(text);
        }}
      >
        Agregar
      </button>
    </div>
  );
};

export default AddTask;
