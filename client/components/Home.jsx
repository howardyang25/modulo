import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import TaskList from './TaskList.jsx';

const ShareButton = styled.button`
  font-size: 20px;
  border-radius: 10px;
  margin: 5px;
  background-color: #F9F4F5;
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
  padding: 30px;
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
      <Heading>Share Task</Heading>
      <form>
        <TextArea name="description" cols="30" rows="3" onChange={handleDescriptionChange} value={description} />
        <ShareButton type="button" onClick={handleSubmit}>Share</ShareButton>
      </form>
      <TaskList tasks={tasks} sortByAccepted={sortByAccepted} sortByRecent={sortByRecent} />
    </Container>
  );
};

export default Home;
