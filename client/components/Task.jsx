import React from 'react';

const Task = ({ task }) => {
  console.log(task);
  const { description, createdBy, upvotes, accepted, completed } = task;
  return (
    <div>
      {description}
    </div>
  );
};

export default Task;
