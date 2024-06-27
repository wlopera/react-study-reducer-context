import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, onChangeTask, onDeleteTask }) => {
  return (
    <>
      <ul style={{ listStyleType: "none" }}>
        {tasks &&
          tasks.map((task) => (
            <li key={task.id}>
              <Task
                task={task}
                onChangeTask={onChangeTask}
                onDeleteTask={onDeleteTask}
              />
            </li>
          ))}
      </ul>
    </>
  );
};

export default TaskList;
