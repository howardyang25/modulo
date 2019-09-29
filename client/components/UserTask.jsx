import React from 'react';

const Task = ({ task }) => {
  console.log(task);
  const { id, description, checkedOff, createdAt, updatedAt, accepted, completed } = task;
  
  const completeTask = () => {

  };

  return (
    <div>
      <ul>
        <li>{description}</li>
        <li>{checkedOff ? '( X )' : '( )'} <button onClick={completeTask}>Mark Complete</button></li>
        <li>{createdAt}</li>
        <li>Accepted: {accepted}</li>
        <li>Completed: {completed}</li>
      </ul>
    </div>
  );
};

export default Task;
