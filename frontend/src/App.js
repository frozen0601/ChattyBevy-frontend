import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
// for practicing purposes
// import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import ComposePage from "./pages/ComposePage";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Route component={HomePage} path="/" exact />
          <Route component={LoginPage} path="/login" />
          <Route component={ChatPage} path="/chat" />
          <Route component={ComposePage} path="/compose" />
          <Route component={RegisterPage} path="/register" />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
