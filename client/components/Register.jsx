import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const regInfo = { username, password };
    axios.post('/register', regInfo)
      .then((res) => {
        alert('Account created!');
        setUsername('');
        setPassword('');
      })
      .catch((err) => {
        const errorMessages = err.response.data;
        let errors = [];
        for (let i = 0; i < errorMessages.length; i++) {
          errors.push(errorMessages[i].msg);
        }
        alert(errors.join('\n'));
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

export default Register;
