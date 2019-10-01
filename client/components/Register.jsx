import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 30px;
  font-family: sans-serif;
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

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const regInfo = { username, password };
    axios.post('/register', regInfo)
      .then((res) => {
        alert('Account created!');
        window.location = '/login';
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
    <Container>
      <h1>Create an account</h1>
      <br />
      <Form>
        <label htmlFor="username">
          Username:
          <input type="text" name="username" onChange={handleUsernameChange} value={username} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" onChange={handlePasswordChange} value={password} />
        </label>
        <Button type="button" onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  );
};

export default Register;
