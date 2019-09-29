import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = () => {
    const regInfo = { username, password };
    axios.post('/login', regInfo)
      .then((res) => {
        const user = res.data;
        if (user) {
          window.location = '/';
        }

        setUsername('');
        setPassword('');
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="username">
          Username:
          <input type="text" name="username" onChange={handleUsernameChange} value={username} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" onChange={handlePasswordChange} value={password} />
        </label>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};


export default Login;
