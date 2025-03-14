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

Para proporcionar estado y la función dispatch a los componentes de abajo:
  * Crea dos contextos (para el estado y para las funciones dispatch).
  * Proporciona ambos contextos y asociarlos al reducer.
  * Utiliza cualquiera de los dos contextos desde los componentes que necesiten leerlos.
  * Puedes refactorizar aún más los componentes moviendo todo la lógica a un solo archivo o en archivos separados.
  * Puedes exportar un componente como TasksProvider que proporciona el contexto.
  * También puedes exportar Hooks personalizados como useTasks y useTasksDispatch para leerlo.


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

## Modificar el código para hacerlo mas fácil y mejor de entender y actualizar

### Cambiar Context.js ==> TaskContext.js
```
import { createContext, useReducer } from "react";

import tasksReducer from "./TasksReducer";

//  Lista actual de tareas.
export const TaskContext = createContext(null);

// Función que permite a los componentes enviar acciones.
export const TaskDispatchContext = createContext(null);

const initialTasks = [
  { id: 0, text: "El Camino del Filósofo", done: true },
  { id: 1, text: "Visitar el Templo", done: false },
  { id: 2, text: "Don Quijote de la Mancha", done: false },
];

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
}

// Exportar funciones que utilicen el contexto
export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
```

### ContextReducer.js
```
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

```

#### Hooks personalizados (Custom Hooks)

Cuando un componente necesita leer el contexto, puede hacerlo a través de estas funciones:
  const tasks = useTasks();
  const dispatch = useTasksDispatch();
Actualizar otros componentes

Puedes pensar en TasksProvider como una parte de la pantalla que sabe cómo tratar con las tareas, useTasks como una forma de leerlas, y useTasksDispatch como una forma de actualizarlas desde cualquier componente de abajo en el árbol.

## Misma Salida...

![image](https://github.com/wlopera/react-study-reducer-context/assets/7141537/3bb481df-c749-4de8-b287-7725337798db)


## Hooks usarCallback
* useCallbackes un Hook de React que te permite almacenar la definición de una función entre renderizados subsecuentes.

Parámetros
* fn: La función que deseas guardar en caché. Puede recibir cualquier argumento y devolver cualquier valor. React devolverá (¡no llamará!) tu función durante el renderizado inicial. En los renderizados subsecuentes, React devolverá la misma función nuevamente si las dependencias no han cambiado desde el último renderizado. Si no es así, React devolverá la función que pasaste durante el renderizado actual, y la almacenará en caso de que se necesite reutilizar más adelante. React no llamará a la función. La función se devolverá para que puedas decidir si y cuándo llamarla.

* dependencias: La lista de todos los valores reactivos dentro de la función fn. Los valores reactivos incluyen props, estado y todas las variables y funciones declaradas directamente dentro del cuerpo de tu componente. Si tu linter está configurado para React, verificará que cada valor reactivo esté debidamente especificado como una dependencia. La lista de dependencias debe tener un número constante de elementos y estar escrita en línea, de la forma [dep1, dep2, dep3]. React comparará cada dependencia con su valor anterior usando el algoritmo de comparación Object.is.

#### useMemo / useCallback
La diferencia está en qué te permiten almacenar:

* useMemo almacena el resultado de tu función. En este ejemplo, se almacena el resultado de computeRequirements(product) para que no cambie a menos que product cambie. Esto permite enviar el objeto requirements sin rerenderizar ShippingForm innecesariamente. Cuando realmente sea necesario, React llamará a la función durante el renderizado para calcular su resultado.

* useCallback almacena la función en sí. A diferencia de useMemo, no llama a la función recibida. En su lugar, almacena la función que proporcionaste para que handleSubmit en sí no cambie a menos que productId o referrer cambien. Esto permite enviar la función handleSubmit sin rerenderizar ShippingForm innecesariamente. Tu código no se llamará hasta que el usuario envíe el formulario.

```
import { useMemo, useCallback } from 'react';

function ProductPage({ productId, referrer }) {
  const product = useData('/product/' + productId);

  const requirements = useMemo(() => { // Llama a la función y almacena su resultado
    return computeRequirements(product);
  }, [product]);

  const handleSubmit = useCallback((orderDetails) => { // Almacena la función como tal
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  return (
    <div className={theme}>
      <ShippingForm requirements={requirements} onSubmit={handleSubmit} />
    </div>
  );
}
```

#### Buena Practica:
```
// Implementación simplificada (dentro de React)
function useCallback(fn, dependencies) {
  return useMemo(() => fn, dependencies);
}
```

### Almacenar una función con useCallback solo es beneficioso en unos pocos casos:

* Al enviarla como prop al componente envuelto en memo. Querrás omitir el renderizado subsecuente si el valor no ha cambiado. La memoización permite que tu componente se renderice nuevamente solo cuando las dependencias no sean las mismas.
  
*  La función que estás enviando se usa más tarde como una dependencia de algún Hook. Por ejemplo, cuando otra función envuelta en useCallback depende de ella, o cuando dependes de dicha función desde useEffect.

