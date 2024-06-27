import React, { useState, useReducer } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

import styles from "./ContextReducer.module.css";
import { TaskProvider } from "./TaskContext";

const ContextReducer = () => {
  return (
    <TaskProvider>
      <div className={styles.container}>
        <h2>Libros de Colección</h2>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default ContextReducer;
