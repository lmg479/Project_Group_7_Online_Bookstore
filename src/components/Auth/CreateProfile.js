import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateProfile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add profile creation logic here
    navigate('/profile');
  };

  return (
    <div>
      <form id="profileForm" className="profile-form" onSubmit={handleSubmit}>
        <h1>Create a New Profile</h1>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <button type="submit" className="create-button">Create Profile</button>
      </form>

      <div className="signup-option">
        <p>Already have an account? <Link to="/login" className="signup-link">Log in here.</Link></p>
      </div>
    </div>
  );
}

export default CreateProfile;