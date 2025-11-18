import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import TaskForm from "../components/TaskForm";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // <-- ajout
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
    
    // Message de succès
    setSuccess("Add task successfull !");
    setError("");
    
    // Efface le message après 3 secondes
    setTimeout(() => setSuccess(""), 3000);
  };

  const updateTask = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.put(
        `/tasks/${id}`,
        { isCompleted: !currentStatus },
        { headers: { "x-auth-token": token } }
      );

      // Mise à jour immédiate de la liste
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
      
      setError("");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to update task.");
      setSuccess("");
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/tasks/${id}`, {
        headers: { "x-auth-token": token },
      });

      setTasks((prev) => prev.filter((task) => task._id !== id));
      
      // Message de succès
      setSuccess("task delete successfull !");
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to delete task.");
      setSuccess("");
    }
  };

  return (
    <div className="container">
      <h1>My Tasks</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <TaskForm addTask={addTask} />

      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`task-item ${task.isCompleted ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => updateTask(task._id, task.isCompleted)}
            />
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;