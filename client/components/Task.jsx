import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #C8B8DB;
  margin: 10px;
`;

const AcceptBar = styled.div`
  background-color: #F9F4F5;
  width: 100px;
  height: 20px;
`;

const CompleteBar = styled.div`
  background-color: #000000;
  height: 20px;
  width: ${props => props.width};
`;

const ToolTip = styled.div`
  display: ${props => props.showToolTip ? 'block' : 'none'};
`;

const Task = ({ task, userId }) => {
  const [showToolTip, setShowToolTip] = useState(false);

  const {id, description, username, accepted, completed, createdAt } = task;
  const percentComplete = 100 * (completed / accepted);
  const handleAcceptTask = () => {
    const body = {
      userId,
      globalTaskId: id,
    };

    if (userId !== undefined) {
      axios.post('/api/user-tasks', body)
        .catch((err) => {
          console.err(err);
        });
    }
  };

  const handleMouseEnter = () => {
    setShowToolTip(true);
  };

  const handleMouseLeave = () => {
    setShowToolTip(false);
  };

  return (
    <Container>
      <div>Shared by: {username}</div>
      <div>{createdAt}</div>
      <div>{description}</div>
      Global Progress: 
      <AcceptBar onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><CompleteBar width={percentComplete + 'px'} /></AcceptBar>
      {userId ? <button onClick={handleAcceptTask}>Accept This Task</button> : ''}
      <ToolTip showToolTip={showToolTip}> {completed} out of {accepted} users have completed this task!</ToolTip>
    </Container>
  );
};

export default Task;
