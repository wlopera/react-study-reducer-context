import { createContext } from "react";

//  Lista actual de tareas.
export const TaskContext = createContext(null);

// Función que permite a los componentes enviar acciones.
export const TaskDispatchContext = createContext(null);
