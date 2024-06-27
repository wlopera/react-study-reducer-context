import React, { useState, useReducer } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import tasksReducer from "./TasksReducer";
import { TaskContext, TaskDispatchContext } from "./Context";

import styles from "./ContextReducer.module.css";

const initialTasks = [
  { id: 0, text: "El Camino del Filósofo", done: true },
  { id: 1, text: "Visitar el Templo", done: false },
  { id: 2, text: "Don Quijote de la Mancha", done: false },
];

const ContextReducer = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        <div className={styles.container}>
          <h2>Libros de Colección</h2>
          <AddTask />
          <TaskList />
        </div>
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
};

export default ContextReducer;
