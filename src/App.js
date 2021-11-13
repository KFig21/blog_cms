// imports
import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";
import "./App.css";
// components
import Nav from "./components/nav/Nav";
// pages
import LoginPage from "./pages/login/Login";
import PostPage from "./pages/editPost/EditPost";
import NewPost from "./pages/newPost/NewPost";
import Home from "./pages/home/Home";

function App() {
  const [userAuth, setUserAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userAuth");
    if (user) {
      setUserAuth(true);
    } else {
      setUserAuth(false);
    }
  }, []);

  return (
    <div className="app">
      <Nav userAuth={userAuth} setUserAuth={setUserAuth} />
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              !userAuth ? <LoginPage setUserAuth={setUserAuth} /> : <Home />
            }
          >
            <Navigate to="/posts" />
          </Route>
          <Route
            exact
            path="/posts"
            element={
              !userAuth ? <LoginPage setUserAuth={setUserAuth} /> : <Home />
            }
          ></Route>
          <Route
            exact
            path="/posts/:id"
            element={
              !userAuth ? <LoginPage setUserAuth={setUserAuth} /> : <PostPage />
            }
          ></Route>
          <Route
            path="/newpost"
            element={
              !userAuth ? <LoginPage setUserAuth={setUserAuth} /> : <NewPost />
            }
          ></Route>
          <Route path="/">
            <p>404</p>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
