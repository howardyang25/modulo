import React from 'react';
import axios from 'axios';

const Task = ({ task, userId }) => {
  const {id, description, username, accepted, completed, createdAt } = task;
  const handleAcceptTask = () => {
    console.log('globalTaskId: ' + id);
    console.log('userId' + userId);
    const body = {
      userId,
      globalTaskId: id,
    };
    if (userId !== undefined) {
      axios.post('/api/user-tasks', body)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.err(err);
        });
    }
  };

  return (
    <div>
      <ul>
        <li>{username}</li>
        <li>{createdAt}</li>
        <li>{description}</li>
        <li>Accepted: {accepted}</li>
        <li>Completed: {completed}</li>
      </ul>
      <button onClick={handleAcceptTask}>Accept This Task</button>
    </div>
  );
};

export default Task;
