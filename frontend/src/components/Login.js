import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Welcome.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      // console.log('JWT Token:', token);
      localStorage.setItem('user', JSON.stringify(response.data.user));  // Store user details after login
      localStorage.setItem('authToken', response.data.token);
      // console.log(localStorage.setItem('authToken', response.data.token));

      navigate('/dashboard');
    } catch (error) {
      alert('Invalid login details');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to registration page
  };

  return (
    <div className='container'>

      <div className='screen '>
        <h2>Login</h2>
        <form className='form' onSubmit={handleLogin}>
          <label>
            {/* Username: */}
            <input className='input-welcome'
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label >
            {/* Password: */}
            <input className='input-welcome'
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button className='btn' type="submit">Login</button>
        </form>
        <p className='alternative'>
          Don't have an account? <button className='btn-sm' onClick={handleRegisterRedirect}>Register Here</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
