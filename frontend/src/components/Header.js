import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/tasks" className="nav-link">
              My Tasks
            </Link>
          </li>

          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
              <button
                onClick={onLogout}
                className="nav-link logout-button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "inherit",
                  font: "inherit",
                }}
              >
                Logout
              </button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
