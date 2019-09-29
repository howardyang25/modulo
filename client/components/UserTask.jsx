import React from 'react';

const Task = ({ task }) => {
  console.log(task);
  const { id, description, checkedOff, createdAt, updatedAt, accepted, completed } = task;
  // const handleAcceptTask = () => {
  //   console.log('globalTaskId: ' + id);
  //   console.log('userId' + userId);
  //   const body = {
  //     userId,
  //     globalTaskId: id,
  //   };
  //   if (userId !== undefined) {
  //     axios.post('/api/user-tasks', body)
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((err) => {
  //         console.err(err);
  //       });
  //   }
  // };

  return (
    <div>
      <ul>
        <li>{description}</li>
        <li>{checkedOff ? '( X )' : '( )'} <button>Mark Complete</button></li>
        <li>{createdAt}</li>
        <li>Accepted: {accepted}</li>
        <li>Completed: {completed}</li>
      </ul>
      {/* <button onClick={handleAcceptTask}>Accept This Task</button> */}
    </div>
  );
};

export default Task;
