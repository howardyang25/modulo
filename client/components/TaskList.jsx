import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task.jsx';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/global-tasks')
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      });
  }, []);

  return (
    <div>
      {tasks.map((task) => {
        return <Task task={task} key={task.id} />;
      })}
    </div>
  );
};

export default TaskList;
