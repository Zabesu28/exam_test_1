import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

// La page n'a pas de style cohérent
// => ajouter un fichier CSS pour gérer les styles de la page
// => importer le fichier CSS dans le composant App
import "./App.css";
import Tasks from "./pages/Tasks";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Comment pourrait-on gérer les routes protégées qui nécessitent d'être connecté ?
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => setIsAuthenticated(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout successfull")
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
          <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Routes accessibles UNIQUEMENT si NON connecté */}
            <Route
              path="/login"
              element={
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <Login onLogin={handleLogin} />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <Register />
                </PublicRoute>
              }
            />

            {/* Route PROTÉGÉE */}
            <Route
              path="/tasks"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Tasks />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
