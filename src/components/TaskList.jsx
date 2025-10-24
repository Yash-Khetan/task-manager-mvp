import TaskItem from "./TaskItem";

function TaskList({ tasks, removeTask, toggleComplete, editTask, darkmode,filter }) {
    const filteredtasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true; // for "all" or any other case
    });
  return (
    <ul className="w-full max-w-xl space-y-4">
      {filteredtasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          removeTask={removeTask}
          toggleComplete={toggleComplete}
          editTask={editTask}
          darkmode={darkmode}
          priority={task.priority}
        />
      ))}
    </ul>
  );
}

export default TaskList;
