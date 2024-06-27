import React, { useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

import styles from "./ContextReducer.module.css";

const initialTasks = [
  { id: 0, text: "El Camino del Filósofo", done: true },
  { id: 1, text: "Visitar el Templo", done: false },
  { id: 2, text: "Don Quijote d ela Mancha", done: false },
];

let nextId = 3;

const ContextReducer = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleAddTask = (text) => {
    if (text.trim().length === 0) {
      return;
    }
    setTasks((prev) => [
      ...prev,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  };

  const handleModifyTask = (task) => {
    setTasks(
      tasks.map((item) => {
        if (item.id === task.id) {
          return task;
        }
        return item;
      })
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2>Libros de Colección</h2>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleModifyTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default ContextReducer;
