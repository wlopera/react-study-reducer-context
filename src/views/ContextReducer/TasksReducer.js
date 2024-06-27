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
