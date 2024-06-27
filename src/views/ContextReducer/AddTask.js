import React, { useContext, useState } from "react";
import { TaskDispatchContext } from "./Context";

import styles from "./ContextReducer.module.css";

let nextId = 3;

const AddTask = () => {
  const [text, setText] = useState("");
  const dispatch = useContext(TaskDispatchContext);

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
