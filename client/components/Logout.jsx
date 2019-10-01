import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Heading = styled.h1`
  font-family: sans-serif;
  margin: 30px;
`;

const Logout = () => {
  useEffect(() => {
    axios.get('/api/logout')
      .then((() => {
        window.location = '/login';
      }));
  });

  return (
    <Heading>
      Logging out...
    </Heading>
  );
};

export default Logout;
