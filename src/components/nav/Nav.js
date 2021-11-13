import React from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Nav({ userAuth, setUserAuth }) {
  const logout = () => {
    setUserAuth(false);
    localStorage.clear();
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="nav-header-container">
          <Logo />
          <span className="nav-title">KFig21 Blog CMS</span>
        </div>
        <div className="nav-link-container">
          <Link to="./posts">
            <button>Home</button>
          </Link>
          <Link to="./newpost">
            <button>New Post</button>
          </Link>

          {userAuth && (
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
