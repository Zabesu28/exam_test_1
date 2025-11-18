import React, { useState } from "react";
import api from "../api";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(""); // <-- added

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Empty field validation
    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    try {
      const res = await api.post(
        "/tasks",
        { title },
        {
          headers: { "x-auth-token": token },
        }
      );

      addTask(res.data);
      setTitle("");
      setError(""); // reset error visible
    } catch (err) {
      console.error(err);
      setError("Failed to create task. Please try again."); // <-- visible error
    }
  };

  return (
    <div>
      {/* Display error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          placeholder="Add a task..."
          value={title}
          maxLength={60}
          onChange={(e) => {
            const value = e.target.value;
            value.length >= 60 ? setError("Maximum length (60 characters) reached.") : setError("");
            setTitle(value);
          }}
        />
        <button type="submit" className="btn" style={{ marginTop: "10px" }}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
