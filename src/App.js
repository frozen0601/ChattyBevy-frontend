import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import ComposePage from "./pages/ComposePage";
import Header from "./components/Header";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <Router>
          <AuthProvider>
            <Header />
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <Route component={HomePage} path="/" exact />
            <Route component={LoginPage} path="/login" />
            <Route component={ChatPage} path="/chat" />
            <Route component={ComposePage} path="/compose" />
            <Route component={RegisterPage} path="/register" />
          </AuthProvider>
        </Router>
      </div>
    </React.Fragment>
  );
}

export default App;
