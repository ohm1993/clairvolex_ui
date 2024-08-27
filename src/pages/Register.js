import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await authService.register(formData);
      if (response.status) { 
        alert('Registration successful!');
        navigate('/');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      alert(error.error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <h1 className="mb-4 text-center">Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter name"  value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" value={formData.email} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="d-flex justify-content-center mt-2">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
        <div className="mt-3 text-center">
          <p>Already have an account?</p>
          <a href="/login" className="btn btn-secondary">Login</a>
        </div>
      </div>
    </div>
  )
}
export default Register
