import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from './pages/PrivateRoute'
import AddBook from './pages/AddBook'
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';

import './App.css';

function App() {
  return (
    <Router>
        <AuthProvider>
          <Navbar />
          <ToastContainer />
          <Routes>
              <Route exact path="/"  element={<Login/>} />
              <Route path="/register"  element={<Register/>} />
              <Route path="/dashboard"  element={<PrivateRoute><Dashboard /></PrivateRoute>}  />
              <Route path="/add-book" element={<PrivateRoute><AddBook /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
