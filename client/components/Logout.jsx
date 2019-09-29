import React, { useEffect } from 'react';
import axios from 'axios';

const Logout = () => {
  useEffect(() => {
    axios.get('/api/logout')
      .then((() => {
        window.location = '/login';
      }));
  });

  return (
    <h1>
      Logging out...
    </h1>
  );
};

export default Logout;
