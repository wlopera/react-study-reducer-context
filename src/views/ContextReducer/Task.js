import React, { useContext, useState } from "react";

import styles from "./ContextReducer.module.css";
import { TaskDispatchContext } from "./Context";

const Task = ({ task }) => {
  const [isEditabled, setIsEditabled] = useState(false);

  const dispatch = useContext(TaskDispatchContext);

  const handleModifyTask = (task) => {
    dispatch({
      type: "changed",
      ...task,
    });
  };

  const handleDeleteTask = (id) => {
    dispatch({
      type: "delete",
      id,
    });
  };

  const taskContext = isEditabled ? (
    <>
      <input
        value={task.text}
        className={styles.taskInput}
        onChange={(e) =>
          handleModifyTask({
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
          handleModifyTask({
            ...task,
            done: e.target.checked,
          })
        }
        style={{ marginRight: "10px" }}
      />
      {taskContext}
      <button
        onClick={() => handleDeleteTask(task.id)}
        className={styles.buttonDelete}
      >
        Borrar
      </button>
    </div>
  );
};

export default Task;
