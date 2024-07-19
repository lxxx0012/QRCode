import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Components/css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate to obtain navigation function

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary credentials for testing
    const tempUsername = 'Tester';
    const tempPassword = 'Tester1';

    if (username === tempUsername && password === tempPassword) {
      // Redirect to Dashboard upon successful login
      navigate('/dashboard');
    } else {
      // Handle login failure
      alert('Login failed. Please check your credentials.');
    }
  };

  const returnHome = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <div className="login-container">
      {/* Button to return home */}
      <button className="return-home" onClick={returnHome}>Return to Home</button>

      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Username:
          <input
            type="text"
            placeholder="Tester"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            placeholder="Tester1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
