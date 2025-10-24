import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import { user, tasks, stats } from "./mockData";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setTaskData(data))
      .catch(() => setTaskData(tasks));
  }, []);

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"}>
      <Header user={user} />
      <div className="container">
        <Sidebar />
        <main className="main">
          <div className="switch-wrapper">
            <input
              type="checkbox"
              id="themeSwitch"
              className="l"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <label htmlFor="themeSwitch" style={{ marginLeft: "10px" }}>
              {darkMode ? "Dark Mode" : "Light Mode"}
            </label>
          </div>

          <Dashboard stats={stats} />

          {taskData.length ? (
            <TaskList tasks={taskData} />
          ) : (
            <p className="no-tasks">No tasks available.</p>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
