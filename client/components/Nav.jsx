import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 10vh;
  background: blue;
  color: white;
`;

const List = styled.ul`
  display: flex;
  width: 40%;
  justify-content: space-around;
  align-items: center;
  list-style: none;
`;

const NavBar = () => {
  const [user, setUser] = useState('');
  const navStyle = {
    color: 'white',
  };
  
  const getLoggedInUser = () => {
    axios.get('/api/session')
      .then((res) => {
        setUser(res.data.username);
      });
  };

  useEffect(() => {
    getLoggedInUser();
  });


  return (
    <Nav>
      <h3>Modulo</h3>
      <List>
        <Link style={navStyle} to="/">
          <li>Home</li>
        </Link>
        <Link style={navStyle} to={user ? `/users/${user}` : '/login'}>
          <li>My tasks</li>
        </Link>
        <Link style={navStyle} to="/login">
          <li>Login</li>
        </Link>
        <Link style={navStyle} to="/register">
          <li>Register</li>
        </Link>
        <Link style={navStyle} to="/logout">
          <li>Logout</li>
        </Link>
        { user ? <li>Logged in as: {user}</li> : '' }
      </List>
    </Nav>
  );
};

export default NavBar;
