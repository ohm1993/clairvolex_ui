import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(formData);
      console.log("login response is ",response);
      if (response.status) { 
        localStorage.setItem('token', response.token);
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('An error occurred. Please try again.');
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" value={formData.email} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password"  value={formData.password}  onChange={handleChange} />
        </div>
        <div className='d-flex justify-content-center mt-2'>
          <button type="submit" className="btn btn-primary text-center">Login</button>
        </div>
      </form>
      <div className="mt-3 text-center">
        <p>Don't have an account?</p>
        <a href="/register" className="btn btn-secondary">Create an account</a>
      </div>
    </div>
    </div>
  )
}
export default Login
