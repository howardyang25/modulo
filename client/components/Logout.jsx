import React, { useEffect } from 'react';
import axios from 'axios';

const Logout = () => {
  useEffect(() => {
    axios.get('/api/logout')
      .then((() => {
        alert('You have been logged out');
        window.location = '/login';
      }));
  });

  return (
    <div>
      Logout Page
    </div>
  );
};

export default Logout;
