import { createContext, useContext, useReducer } from "react";

import tasksReducer from "./TasksReducer";

//  Lista actual de tareas.
export const TasksContext = createContext(null);

// Función que permite a los componentes enviar acciones.
export const TasksDispatchContext = createContext(null);

// Exportar funciones que utilicen el contexto
export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

const initialTasks = [
  { id: 0, text: "El Camino del Filósofo", done: true },
  { id: 1, text: "Visitar el Templo", done: false },
  { id: 2, text: "Don Quijote de la Mancha", done: false },
];

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
