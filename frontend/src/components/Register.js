import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');  // Full Name
  const [email, setEmail] = useState('');        // Email
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        fullName,       // Include full name in the request
        email,          // Include email in the request
        username,
        password
      });
      if (response.status === 201) {
        alert('User registered successfully');
        navigate('/login'); // Redirect to login page after successful registration
      }
    } catch (err) {
      setError('Error registering user');
    }
  };

  return (
    <div className="container">
      <div className='screen '>
        <h2>Register</h2>
        <form className='form' onSubmit={handleRegister}>
          {/* Full Name field */}
          <label>

            <input className='input-welcome'
              type="text"
              placeholder='Full Name'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>
          <br />
          {/* Email field */}
          <label>

            <input className='input-welcome'
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          {/* Username field */}
          <label>

            <input className='input-welcome'
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          {/* Password field */}
          <label>
            <input className='input-welcome'
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button className='btn' type="submit">Register</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <p className='alternative'>
          Already have an account? <button className='btn-sm' onClick={() => navigate('/login')}>Login here</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
