import React, { useContext } from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { AuthContext } from "../../context/AuthContext";

export default function Nav({ userAuth, setUserAuth }) {
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    setUserAuth(false);
    dispatch({ type: "LOGOUT", payload: null });
    localStorage.clear();
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="nav-header-container">
          <Logo />
          <span className="nav-title">KFig21 Blog CMS</span>
        </div>
        {user && (
          <div className="nav-link-container">
            <Link to="./posts">
              <button>Home</button>
            </Link>
            <Link to="./newpost">
              <button>New Post</button>
            </Link>

            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
