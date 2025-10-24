function TaskItem({ task, removeTask, toggleComplete, editTask, darkmode, priority}) {
  return (
    <li
      className={`flex items-center justify-between p-4 rounded-xl shadow-md transition duration-300 ${
        darkmode
          ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
          : "bg-white hover:shadow-xl text-gray-800"
      } ${task.completed ? "opacity-60 line-through" : ""}`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="h-5 w-5 accent-purple-500"
        />
        <span>{task.text}</span>
        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${
        task.priority === "high" ? "bg-red-500 text-white" :
        task.priority === "medium" ? "bg-yellow-400 text-white" :
        "bg-green-400 text-white"
        }`}>
        {task.priority}
        </span>

      </div>
      <div className="flex gap-3">
        <button
          onClick={() => editTask(task.id)}
          className={`font-semibold transition ${
            darkmode ? "text-yellow-400 hover:text-yellow-300" : "text-yellow-500 hover:text-yellow-600"
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => removeTask(task.id)}
          className={`font-semibold transition ${
            darkmode ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-600"
          }`}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
