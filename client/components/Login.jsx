import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 30px;
  font-family: sans-serif;
  margin-top: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const Button = styled.button`
  font-family: sans-serif;
  font-size: 20px;
  background-color: #70587C;
  padding: 10px;
  margin: 10px;
  margin-left: 0px;
  color: white;
  width: 100px;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
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
    <Container>
      <h1>Login</h1>
      <Form>
        <label htmlFor="username">
          <br />
          Username:
          <input type="text" name="username" onChange={handleUsernameChange} value={username} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" onChange={handlePasswordChange} value={password} />
        </label>
        <Button type="B" onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  );
};


export default Login;
