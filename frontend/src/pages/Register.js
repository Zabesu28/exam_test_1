import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // <-- ajouté
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification champs vides
    if (!username || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await api.post('/auth/register', { username, password });
      setError(""); // reset erreurs
      navigate('/login');
    } catch (err) {
      console.error('Register failed', err);

      // Message d'erreur lisible
      const msg =
        err?.response?.data?.msg ||
        "Impossible de créer le compte. Veuillez réessayer.";

      setError(msg);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>

      {/* Affichage visible de l'erreur */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
