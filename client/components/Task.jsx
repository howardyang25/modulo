import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  display: flex;
  background-color: #C8B8DB;
  margin: 20px;
  font-family: sans-serif;
  padding: 30px;
  width: 50vw;
`;

const AcceptBar = styled.div`
  background-color: #F9F4F5;
  width: 100px;
  height: 20px;
  margin: 10px;
`;

const CompleteBar = styled.div`
  background-color: #000000;
  height: 20px;
  width: ${props => props.width};
`;

const ToolTip = styled.div`
  display: ${props => props.showToolTip ? 'block' : 'none'};
`;

const Header = styled.div`
  display: flex;
`;

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px; 
  margin: 5px;
`;

const UsernameAndTime = styled.div`
  margin: 5px;
`;

const Description = styled.div`
  margin: 5px;
  margin-bottom: 10px;
  font-size: 30px;
`;

const AcceptTaskButton = styled.button`
  background-color: #F9F4F5;
  font-size: 20px;
  height: 50px;
  border-radius: 25px;
  margin-left: 120px;
  margin-top: 80px;
  padding: 10px;
`;

const Task = ({ task, userId }) => {
  const [showToolTip, setShowToolTip] = useState(true);

  const {id, description, username, accepted, completed, createdAt } = task;
  let percentComplete;
  if (accepted === 0) {
    percentComplete = 0;
  } else {
    percentComplete = 100 * (completed / accepted);
  }

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
    setShowToolTip(true);
  };
  
  return (
    <Container>
      <div>
        <Header>
          <ProfilePicture src={`https://howard-yang-modulo.s3-us-west-1.amazonaws.com/${username}.jpg?dummy=${Math.random()}`} />
          <UsernameAndTime>
            <div>Shared by: {username}</div>
            <div>{moment(createdAt).fromNow()}</div>
          </UsernameAndTime>
        </Header>
        <Description>{description}</Description>
        <p>  Global Progress: </p> 
        <AcceptBar onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><CompleteBar width={percentComplete + 'px'} /></AcceptBar>
        <ToolTip showToolTip={showToolTip}> {completed} out of {accepted} users have completed this task!</ToolTip>
      </div>
      {userId ? <AcceptTaskButton onClick={handleAcceptTask}>Accept This Task</AcceptTaskButton> : ''}
    </Container>
  );
};

export default Task;
