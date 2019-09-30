import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task.jsx';

const TaskList = ({ tasks, sortByAccepted, sortByRecent }) => {
  const [userId, setUserId] = useState('');
  const getLoggedInUser = () => {
    axios.get('/api/session')
      .then((res) => {
        setUserId(res.data.id);
      });
  };

  useEffect(() => {
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
