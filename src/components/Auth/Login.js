import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    navigate('/profile');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">Login</button>
      </form>

      <div className="signup-option">
        <p>Don't have an account? <Link to="/create-profile"><b>Sign up here.</b></Link></p>
      </div>
    </div>
  );
}

export default Login;
