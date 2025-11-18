import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // <-- ajout
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification champs vides
    if (!username || !password) {
      setError("Please fill in all fields.");
      setSuccess(""); // reset success
      return;
    }

    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);

      setError(""); // reset erreur
      setSuccess("Login successfull ! Redirection..."); // <-- message de succès

      if (onLogin) onLogin();
      
      // Petit délai pour laisser voir le message
      setTimeout(() => {
        navigate("/tasks");
      }, 800);
    } catch (err) {
      console.error("Login failed", err);
      setError("Incorrect credentials.");
      setSuccess(""); // reset success
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      {/* Affichage de l'erreur */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* Affichage du succès */}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;