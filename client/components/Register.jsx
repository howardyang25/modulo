import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const state = { username, password };
    console.log(state);
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
        <input type="text" name="password" onChange={handlePasswordChange} />
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default Register;
