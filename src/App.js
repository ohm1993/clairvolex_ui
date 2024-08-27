import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from './pages/PrivateRoute'; 

import './App.css';

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/"  element={<Login/>} />
            <Route path="/register"  element={<Register/>} />
            <Route path="/dashboard"  element={<PrivateRoute><Dashboard /></PrivateRoute>}  />
        </Routes>
    </Router>
  );
}

export default App;
