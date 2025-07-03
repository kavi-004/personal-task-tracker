import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({
  tasks,
  filter,
  searchTerm,
  toggleComplete,
  deleteTask,
  editTask,
}) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'pending' && task.completed) return false;

    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const inTitle = task.title.toLowerCase().includes(term);
      const inDesc = task.description?.toLowerCase().includes(term);
      return inTitle || inDesc;
    }
    return true;
  });

  if (filteredTasks.length === 0) return <p>No tasks to show.</p>;

  return (
    <ul style={{ padding: 0 }}>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}
