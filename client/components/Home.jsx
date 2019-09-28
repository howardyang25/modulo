import React from 'react';
import axios from 'axios';

const Home = () => {
  const handleClick = () => {
    axios.get('/api/session')
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div>
      Home Page
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default Home;
