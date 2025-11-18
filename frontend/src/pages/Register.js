import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // <-- ajout
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
      await api.post('/auth/register', { username, password });
      setError(""); // reset erreurs
      setSuccess("Create account successfull ! Redirection..."); // <-- message de succès

      // Petit délai pour laisser voir le message
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.error('Register failed', err);

      // Message d'erreur lisible
      const msg =
        err?.response?.data?.msg ||
        "Register failed";

      setError(msg);
      setSuccess(""); // reset success
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>

      {/* Affichage visible de l'erreur */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Affichage du succès */}
      {success && <p style={{ color: 'green' }}>{success}</p>}

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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;