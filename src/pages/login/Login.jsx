import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import chair from '../../assets/cha.png'

const Login = () => {
  const [username, setUsername] = useState('john32');
  const [password, setPassword] = useState('87654321');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'john32' && password === '87654321') {
      const fakeToken = 'fake-jwt-token';
      dispatch(login(fakeToken));
      localStorage.setItem('token', fakeToken);
      navigate('/admin');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container container">
      <div className="login-image">
        <img src={chair} alt="Chair" />
      </div>
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
