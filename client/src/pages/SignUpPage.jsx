import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api';
import '../styles/styles.css';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUser({ username, password, isAdmin: 0 }); // Default to regular user
      alert('Account created! Please sign in.');
      navigate('/signin');
    } catch (err) {
      console.error('Sign-up error:', err);
      setError('Failed to create account. Try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
