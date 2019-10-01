import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UserTask from './UserTask.jsx';

const Heading = styled.h2`
  font-family: sans-serif;
`;

const Container = styled.div`
  padding: 30px;
  margin-top: 50px;
`;

const AuthFailedMessage = styled.div`
  margin-top: 50px;
  font-family: sans-serif;
  font-size: 30px;
  padding: 30px;
`;

const UserTaskList = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    const path = window.location.pathname.slice(7).replace(/\/$/g, '');
    axios.get('/api/session')
      .then((res) => {
        if (res.data.username === path) {
          setIsValidated(true);
          axios.get(`/api/${res.data.id}/user-tasks`)
            .then((tasks) => {
              setUserTasks(tasks.data);
            });
        } else {
          setIsValidated(false);
        }
      });
  }, []);

  if (!isValidated) {
    return (
      <AuthFailedMessage>Authentication failed. Logged in user does not match.</AuthFailedMessage>
    );
  }

  return (
    <Container>
      <Heading>My Tasks</Heading>
      {userTasks.map((task) => {
        return <UserTask task={task} key={task.id} />;
      })}
    </Container>
  );
};

export default UserTaskList;
