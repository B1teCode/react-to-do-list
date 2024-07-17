import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, editTask, deleteTask }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <Task key={task.id} task={task} editTask={editTask} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default TaskList;
