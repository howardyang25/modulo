import React, { useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList.jsx';

const Home = () => {
  const [description, setDescription] = useState('');

  const handleClick = () => {
    axios.get('/api/session')
      .then((res) => {
        console.log(res.data);
      });
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    axios.post('/api/global-tasks', { description })
      .then(() => {
        console.log('submitting task: ' + description);
        setDescription('');
      });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <form>
        <textarea name="description" cols="40" rows="5" onChange={handleDescriptionChange} value={description} />
        <button type="button" onClick={handleSubmit}>Share</button>
      </form>
      <button type="button" onClick={handleClick}>Click Me To Confirm User</button>
      <TaskList />
    </div>
  );
};

export default Home;
