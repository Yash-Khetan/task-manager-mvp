import { useState } from "react";

function TaskForm({ addTask, clearTasks, darkmode }) {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(input,priority);
    setInput("");
    setPriority("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-xl"
    >
       
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className={`flex-1 px-4 py-3 rounded-lg shadow-md border focus:outline-none focus:ring-2 ${
          darkmode
            ? "bg-gray-800 border-gray-700 text-gray-200 focus:ring-purple-400"
            : "bg-white border-gray-200 text-gray-800 focus:ring-purple-400"
        }`}
      />
        <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="..."
            >
            <option value="" disabled>Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        
      <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-600 transition"
      >
        Add Task
      </button>
      <button
        type="button"
        onClick={clearTasks}
        className={`px-6 py-3 font-semibold rounded-lg shadow-lg transition ${
          darkmode ? "bg-red-600 text-gray-200 hover:bg-red-700" : "bg-red-500 text-white hover:bg-red-600"
        }`}
      >
        Clear All
      </button>
    </form>
  );
}

export default TaskForm;
