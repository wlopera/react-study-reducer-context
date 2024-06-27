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

En un ejemplo pequeño como éste, funciona bien, pero si tienes decenas o cientos de componentes en el medio, ¡pasar todo el estado y las funciones puede ser bastante frustrante!

Por eso, como alternativa a pasarlas por props, podrías poner tanto el estado tasks como la función dispatch en el contexto. De esta manera, cualquier componente por debajo de TaskApp en el árbol puede leer las tareas y enviar acciones sin la «perforación de props» (o «prop drilling»).

A continuación se explica cómo se puede combinar un reducer con el contexto:

Crea el contexto.
Pon el estado y la función dispatch en el contexto.
Usa el contexto en cualquier parte del árbol.

## Crear Context y usar useReducer para manejo de tareas

### Context.js
```
import { createContext } from "react";

//  Lista actual de tareas.
export const TaskContext = createContext(null);

// Función que permite a los componentes enviar acciones.
export const TaskDispatchContext = createContext(null);
```

### ContextReducer.js
```
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
```
### AddTask.js
```
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
```

### Task.js
```
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
```
![image](https://github.com/wlopera/react-study-reducer-context/assets/7141537/8cff758d-2425-4c49-a543-b629362b384e)

