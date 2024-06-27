# Aplicaciones de estudio de REACT

### Uso de contexto para pasar parámetros entre componentes anidados

![image](https://github.com/wlopera/react-study-reducer-context/assets/7141537/5ae3e5c8-5a65-4f4f-8ad6-511eeb7a4d2e)
![image](https://github.com/wlopera/react-study-reducer-context/assets/7141537/71ad7725-70a4-4d8e-984b-53481b42c341)

![image](https://github.com/wlopera/react-study-reducer-context/assets/7141537/a575b4d1-9afe-4412-ae45-7fd9246a7076)
![image](https://github.com/wlopera/react-study-reducer-context/assets/7141537/a9bfb761-a41d-468c-8b86-37c41d34be09)

### Uso de contexto y reducer para pasar parámetros y manejo de funciones de procesar tareas entre componentes

![image](https://github.com/wlopera/react-study-reducer-context/assets/7141537/cdb85ba5-af41-4e0a-b0dc-b6f31ff6cc8e)
![image](https://github.com/wlopera/react-study-reducer-context/assets/7141537/914b5891-b38f-40e2-85ad-74d3bbb61cf7)

#### ContextReducer.js
```
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
```
![image](https://github.com/wlopera/react-study-reducer-context/assets/7141537/1a539544-2d41-4b27-ae06-e8b9b8100a66)

### Agregar Reducer (useReducer)

Un reducer ayuda a mantener los controladores de eventos cortos y concisos. Sin embargo, a medida que tu aplicación crece, puedes encontrarte con otra dificultad. Actualmente, el estado tasks y la función dispatch sólo están disponibles en el componente de nivel superior TaskApp. Para permitir que otros componentes lean la lista de tareas o la modifiquen, tienes que pasar explícitamente el estado actual y los controladores de eventos que lo cambian como props.

#### TaskReducer.js
```
export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added":
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];

    case "changed":
      return tasks.map((item) => {
        if (item.id === action.id) {
          return {
            id: action.id,
            text: action.text,
            done: action.done,
          };
        }
        return item;
      });

    case "delete":
      return tasks.filter((task) => task.id !== action.id);

    default:
      break;
  }
}
```
#### ContextReducer.js
```
import React, { useState, useReducer } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import tasksReducer from "./TasksReducer";

import styles from "./ContextReducer.module.css";

const initialTasks = [
  { id: 0, text: "El Camino del Filósofo", done: true },
  { id: 1, text: "Visitar el Templo", done: false },
  { id: 2, text: "Don Quijote de la Mancha", done: false },
];

let nextId = 3;

const ContextReducer = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  const handleAddTask = (text) => {
    if (text.trim().length === 0) {
      return;
    }
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  };

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
```
![image](https://github.com/wlopera/react-study-reducer-context/assets/7141537/b69d2083-5a80-4dbe-8839-34937b8c58fa)

