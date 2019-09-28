import React, { useState } from 'react';

import axios from 'axios';

const Login = ({ updateUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = () => {
    const regInfo = { username, password };
    axios.post('/login', regInfo)
      .then((res) => {
        const user = res.data;
        if (user) {
          alert(`You are logged in as: ${user.username}`);
          updateUser(user.username);
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
  );
};


export default Login;
