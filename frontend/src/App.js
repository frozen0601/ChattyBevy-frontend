import React, { useEffect, useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <PrivateRoute component={HomePage} path="/" exact />
          <Route component={LoginPage} path="/login" />
          <Route component={ChatPage} path="/chat" />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
