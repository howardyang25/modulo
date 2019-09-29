import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task = ({ task }) => {
  const { id, globalTaskId, description, checkedOff, createdAt, updatedAt, accepted, completed } = task;
  const [isTaskComplete, setIsTaskComplete] = useState(!!checkedOff);
  
  const completeTask = () => {
    if (isTaskComplete === false) {
      axios.put(`/api/user-tasks/${id}`, { globalTaskId })
        .then(() => {
          setIsTaskComplete(true);
        });
    }
  };

  return (
    <div>
      <ul>
        <li>{description}</li>
        <li>{isTaskComplete ? '( X )' : '( )'} <button onClick={completeTask}>Mark Complete</button></li>
        <li>{createdAt}</li>
        <li>Accepted: {accepted}</li>
        <li>Completed: {completed}</li>
      </ul>
    </div>
  );
};

export default Task;
