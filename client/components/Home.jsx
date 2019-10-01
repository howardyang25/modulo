import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import TaskList from './TaskList.jsx';

const ShareButton = styled.button`
  font-size: 20px;
  border-radius: 10px;
  margin: 5px;
  background-color: #85BDBF;
  color: white;
  padding: 10px;
`;

const Heading = styled.h2`
  font-family: sans-serif;
  margin-bottom: 5px;
`;

const TextArea = styled.textarea`
  font-size: 20px;
`;

const Container = styled.div`
  display: flex;
  padding: 30px;
  margin-top: 50px;
`;

const ShareContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 100px;
`;

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
    <Container>
      <TaskList tasks={tasks} sortByAccepted={sortByAccepted} sortByRecent={sortByRecent} />
      <ShareContainer>
        <Heading>Share Task</Heading>
        <form>
          <TextArea name="description" cols="30" rows="3" onChange={handleDescriptionChange} value={description} />
          <ShareButton type="button" onClick={handleSubmit}>Share</ShareButton>
        </form>
      </ShareContainer>
    </Container>
  );
};

export default Home;
