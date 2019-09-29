import React from 'react';

const Task = ({ task }) => {
  const { description, username, accepted, completed } = task;
  return (
    <div>
      <ul>
        <li>{username}</li>
        <li>{description}</li>
        <li>Accepted: {accepted}</li>
        <li>Completed: {completed}</li>
      </ul>
      <button>Accept This Task</button>
    </div>
  );
};

export default Task;
