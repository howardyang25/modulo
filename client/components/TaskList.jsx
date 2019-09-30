import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Task from './Task.jsx';

const Button = styled.button`
  font-family: sans-serif;
  font-size: 20px;
  background-color: #70587C;
  padding: 10px;
  margin: 10px;
  color: white;
`;

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
      <Button type="button" onClick={sortByAccepted}>Top</Button>
      <Button type="button" onClick={sortByRecent}>Recent</Button>
      {tasks.map((task) => {
        return <Task task={task} key={task.id} userId={userId} />;
      })}
    </div>
  );
};

export default TaskList;
