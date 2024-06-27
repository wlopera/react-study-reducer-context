import React, { useContext } from "react";
import Task from "./Task";
import { useTasks } from "./TaskContext";

const TaskList = () => {
  const tasks = useTasks();

  return (
    <>
      <ul style={{ listStyleType: "none" }}>
        {tasks &&
          tasks.map((task) => (
            <li key={task.id}>
              <Task task={task} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default TaskList;
