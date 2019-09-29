import React, { useState, useEffect } from 'react';
import Task from './Task.jsx';

const TaskList = ({ tasks, sortByAccepted, sortByRecent }) => {
  return (
    <div>
      <button type="button" onClick={sortByAccepted}>Sort by Upvotes</button>
      <button type="button" onClick={sortByRecent}>Sort by Recent</button>
      {tasks.map((task) => {
        return <Task task={task} key={task.id} />;
      })}
    </div>
  );
};

export default TaskList;
