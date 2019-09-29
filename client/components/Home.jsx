import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList.jsx';

const Home = () => {
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);

  const getGlobalTasks = (sortQuery) => {
    axios.get(`/api/global-tasks?sort=${sortQuery}`)
      .then((res) => {
        setTasks(res.data);
      });
  };

  useEffect(() => {
    getGlobalTasks('accepted');
  }, []);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    axios.post('/api/global-tasks', { description })
      .then(() => {
        getGlobalTasks('createdAt');
        setDescription('');
      })
      .catch(() => {
        window.location = '/login';
      });
  };

  const sortByAccepted = () => {
    getGlobalTasks('accepted');
  };

  const sortByRecent = () => {
    getGlobalTasks('createdAt');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <form>
        <textarea name="description" cols="40" rows="5" onChange={handleDescriptionChange} value={description} />
        <button type="button" onClick={handleSubmit}>Share</button>
      </form>
      <TaskList tasks={tasks} sortByAccepted={sortByAccepted} sortByRecent={sortByRecent} />
    </div>
  );
};

export default Home;
