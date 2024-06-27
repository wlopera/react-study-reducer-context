import React, { useContext } from "react";
import Task from "./Task";
import { TaskContext } from "./Context";

const TaskList = () => {
  const tasks = useContext(TaskContext);

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
