import React, { useState } from 'react';

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      alert('Title is required');
      return;
    }
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority,
      dueDate,
      tags: (tags || '')
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      createdAt: new Date().toISOString(),
    };
    addTask(newTask);
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <label>
        Priority:
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </label>
      <br />
      <label>
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <br />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
}
