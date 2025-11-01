import { useState , useEffect} from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";


// Firebase imports
import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";



function App() {
  const [tasks, setTasks] = useState([]);
  const [darkmode, setDarkmode] = useState(false);
  const [filter,setfilter] = useState("");
  const [user,setUser] = useState(null);



// fetch tasks for specific user
const fetchTasksForUser = async (uid) => {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const userTasks = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(task => task.userId === uid);
  setTasks(userTasks);
};


// signing in with popup function
const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    setUser(result.user); // store logged-in user
    fetchTasksForUser(result.user.uid); // only load this user's tasks
  } catch (error) {
    console.error("Login failed:", error);
  }
};

const handleLogout = async () => {
  await signOut(auth);
  setUser(null);
  setTasks([]);
};

// firebase auth function
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    if (currentUser) {
      fetchTasksForUser(currentUser.uid);
    } else {
      setTasks([]);
    }
  });

  return () => unsubscribe();
}, []);


  // Add a new task
  const addTask = async (text, priority) => {
  if (!text.trim() || !user) return; // don't allow if not logged in
  const newTask = { text, completed: false, priority ,userId: user.uid };
  const docRef = await addDoc(collection(db, "tasks"), newTask);
  setTasks([...tasks, { ...newTask, id: docRef.id }]);
};


  // Remove a task
  const removeTask = async (id) => {
  await deleteDoc(doc(db, "tasks", id));
  setTasks(tasks.filter((task) => task.id !== id));
};


  // Toggle completed status
 const toggleComplete = async (id) => {
  const task = tasks.find((t) => t.id === id);
  const updated = { ...task, completed: !task.completed };
  await updateDoc(doc(db, "tasks", id), { completed: updated.completed });
  setTasks(tasks.map((t) => (t.id === id ? updated : t)));
};


  // Edit task
  const editTask = async (id) => {
  const newText = prompt("Enter new task text:");
  if (newText && newText.trim()) {
    await updateDoc(doc(db, "tasks", id), { text: newText });
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  }
};


  // Clear all tasks
  const clearTasks = () => setTasks([]);

  return (
    
    <div
      className={`min-h-screen min-w-screen flex flex-col items-center p-8 ${
        darkmode
          ? "bg-gray-900 text-gray-200"
          : "bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800"
      }`}
    >
      {user ? (
      <button
        onClick={handleLogout}
        className={`absolute top-4 left-4 px-4 py-2 rounded-lg font-semibold ${
          darkmode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"
        }`}
      >
        Logout
      </button>
    ) :  (
      <button
        onClick={handleLogin}
        className={`absolute top-4 left-20 px-4 py-2 rounded-lg font-semibold ${
          darkmode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-white"
        }`}
      >
        Login with Google
      </button>
    ) 
    }
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkmode(!darkmode)}
        className={`absolute top-4 right-4 px-4 py-2 rounded-lg font-semibold ${
          darkmode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"
        }`}
      >
        {darkmode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <h1 className="text-5xl font-extrabold mb-2">Task Manager</h1>
      <p className="mb-4">Total Tasks: {tasks.length}</p>
        {/* adding the filter options  */}
        <div>
        <label className="mr-4 font-semibold">Filter Tasks:</label>
        <select
          value={filter}
          onChange={(e) => setfilter(e.target.value)}
          className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        </div>
      {user &&<TaskForm addTask={addTask} clearTasks={clearTasks} darkmode={darkmode} />}
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        toggleComplete={toggleComplete}
        editTask={editTask}
        darkmode={darkmode}
        filter={filter}
      />
    </div>
  );
}

export default App;


