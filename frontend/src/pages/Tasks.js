import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import TaskForm from "../components/TaskForm";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(""); // <-- added
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks", {
          headers: { "x-auth-token": token },
        });
        setTasks(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load tasks. Please try again.");
      }
    };

    fetchTasks();
  }, [navigate]);

  const addTask = (task) => {
    // FIX: mise à jour immédiate de la liste
    setTasks((prev) => [task, ...prev]);
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/tasks/${id}`, {
        headers: { "x-auth-token": token },
      });

      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete task.");
    }
  };

  return (
    <div className="container">
      <h1>My Tasks</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <TaskForm addTask={addTask} />

      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`task-item ${task.isCompleted ? "completed" : ""}`}
          >
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
