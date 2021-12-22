import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <AuthContextProvider>
    <HashRouter basename="/">
      <App />
    </HashRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
