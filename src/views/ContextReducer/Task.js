import React, { useState } from "react";

import styles from "./ContextReducer.module.css";

const Task = ({ task, onChangeTask, onDeleteTask }) => {
  const [isEditabled, setIsEditabled] = useState(false);

  const taskContext = isEditabled ? (
    <>
      <input
        value={task.text}
        className={styles.taskInput}
        onChange={(e) =>
          onChangeTask({
            ...task,
            text: e.target.value,
          })
        }
      />
      <button
        onClick={() => setIsEditabled(false)}
        className={styles.buttonSave}
      >
        Guardar
      </button>
    </>
  ) : (
    <>
      <label className={styles.taskLabel}>{task.text}</label>
      <button
        onClick={() => setIsEditabled(true)}
        className={styles.buttonEdit}
      >
        Editar
      </button>
    </>
  );

  return (
    <div className={styles.taskContainer}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) =>
          onChangeTask({
            ...task,
            done: e.target.checked,
          })
        }
        style={{ marginRight: "10px" }}
      />
      {taskContext}
      <button
        onClick={() => onDeleteTask(task.id)}
        className={styles.buttonDelete}
      >
        Borrar
      </button>
    </div>
  );
};

export default Task;
