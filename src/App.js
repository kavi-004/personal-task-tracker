import React, { useState, useEffect } from 'react';
import './styles/App.css';

import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';

import { saveTasks, loadTasks } from './utils/localStorage';

// Sample tasks fallback
const sampleTasks = [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Build a task tracker application",
    completed: false,
    createdAt: "2024-01-15T10:00:00Z",
    priority: "Medium",
    dueDate: "",
    tags: [],
  },
  {
    id: 2,
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features",
    completed: true,
    createdAt: "2024-01-14T15:30:00Z",
    priority: "High",
    dueDate: "",
    tags: [],
  },
];

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Load username on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Load tasks on mount, fallback to sampleTasks if none found
  useEffect(() => {
    const savedTasks = loadTasks();
    if (savedTasks.length === 0) {
      setTasks(sampleTasks);
    } else {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Save dark mode preference and toggle body class
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, updatedFields) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <div
      className="App"
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h1>Task Tracker</h1>

      <button
        onClick={() => setDarkMode((prev) => !prev)}
        style={{ marginBottom: '10px' }}
      >
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <>
          <div style={{ marginBottom: '10px' }}>
            <p>Welcome, {user}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <TaskForm addTask={addTask} />

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />

          <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />

          <TaskList
            tasks={tasks}
            filter={filter}
            searchTerm={searchTerm}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            editTask={editTask}
          />
        </>
      )}
    </div>
  );
}

export default App;
