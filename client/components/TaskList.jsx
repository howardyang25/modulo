import React, { useState, useEffect } from 'react';
import Task from './Task.jsx';
import axios from 'axios';

const TaskList = ({ tasks, sortByAccepted, sortByRecent }) => {
  const [userId, setUserId] = useState('');
  const getLoggedInUser = () => {
    axios.get('/api/session')
      .then((res) => {
        setUserId(res.data.id);
      });
  };

  useEffect(() => {
    console.log('using effect');
    getLoggedInUser();
  });

  return (
    <div>
      <button type="button" onClick={sortByAccepted}>Top</button>
      <button type="button" onClick={sortByRecent}>Recent</button>
      {tasks.map((task) => {
        return <Task task={task} key={task.id} userId={userId} />;
      })}
    </div>
  );
};

export default TaskList;
