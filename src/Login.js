import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file for styling
import logo from './logo.svg'; // Import your logo image

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [redirectTo, setRedirectTo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if username and password match the static credentials
    if (username === 'username' && password === 'password') {
      // If matched, set static token in local storage
      localStorage.setItem('loggedIn', 'true');
      // Set redirection to another page
      setRedirectTo('/dashboard');
    } else {
      // If not matched, display error message
      setErrorMessage('Invalid username or password');
    }
  };

  // Redirect if redirectTo is set or if user is already logged in
  if (redirectTo || localStorage.getItem('loggedIn')) {
    navigate('/dashboard');
  }

  return (
    <div className="login-container1">
      <div className="logo-container1">
        <img src={logo} alt="Logo" className="logo1" />
        <h2>Gestion Vulnérabilité IOT</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group1">
          <label className='label1' htmlFor="username">Username:</label>
          <input
            className='input1'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group1">
          <label className='label1' htmlFor="password">Password:</label>
          <input
            className='input1'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='button1' type="submit">Login</button>
        {errorMessage && <p className="error-message1">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
