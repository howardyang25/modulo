import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  display: flex;
  background-color: #C8B8DB;
  margin: 20px;
  font-family: sans-serif;
  padding: 5px;
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

const ProgressPic = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 200px;
  margin: 10px;
  margin-left: 100px;
`;

const Description = styled.div`
  margin: 5px;
  margin-bottom: 10px;
  font-size: 30px;
`;

const MarkCompleteButton = styled.button`
  background-color: #F9F4F5;
  font-size: 20px;
  padding: 10px;
  margin: 10px;
  border-radius: 25px;
`;

const Task = ({ task }) => {
  const { id, globalTaskId, description, checkedOff, createdAt, updatedAt, accepted, completed } = task;
  const [isTaskComplete, setIsTaskComplete] = useState(!!checkedOff);
  const [showToolTip, setShowToolTip] = useState(false);
  
  let percentComplete;
  if (accepted === 0) {
    percentComplete = 0;
  } else {
    percentComplete = 100 * (completed / accepted);
  }

  const completeTask = () => {
    if (isTaskComplete === false) {
      axios.put(`/api/user-tasks/${id}`, { globalTaskId })
        .then(() => {
          setIsTaskComplete(true);
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
      <div>
        <div>Accepted: {moment(createdAt).fromNow()}</div>
        <Description>{description}</Description>
        <MarkCompleteButton onClick={completeTask}>Click when completed!</MarkCompleteButton>
        <p>  Global Progress: </p> 
        <AcceptBar onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><CompleteBar width={percentComplete + 'px'} /></AcceptBar>
        <ToolTip showToolTip={showToolTip}> {completed} out of {accepted} users have completed this task!</ToolTip>
      </div>
      <ProgressPic src={isTaskComplete ? 'https://howard-yang-modulo.s3-us-west-1.amazonaws.com/tree.jpg' : 'https://howard-yang-modulo.s3-us-west-1.amazonaws.com/sprout.jpg'} />
    </Container>
  );
};

export default Task;
