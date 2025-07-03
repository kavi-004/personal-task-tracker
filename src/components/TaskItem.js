import React, { useState } from 'react';

export default function TaskItem({ task, toggleComplete, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title || '');
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [editedPriority, setEditedPriority] = useState(task.priority || 'Medium');
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || '');
  const [editedTags, setEditedTags] = useState((task.tags || []).join(', '));

  const handleSave = () => {
    if (editedTitle.trim() === '') {
      alert('Title cannot be empty');
      return;
    }
    editTask(task.id, {
      title: editedTitle.trim(),
      description: editedDescription.trim(),
      priority: editedPriority,
      dueDate: editedDueDate,
      tags: editedTags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const formattedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleString()
    : 'Unknown';

  return (
    <li
      style={{
        marginBottom: '1rem',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        listStyle: 'none',
        backgroundColor: task.completed ? '#d1e7dd' : '#f8d7da',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          style={{ marginRight: '10px' }}
        />

        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <div>
              <label>
                Priority:
                <select
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value)}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Due Date:
                <input
                  type="date"
                  value={editedDueDate}
                  onChange={(e) => setEditedDueDate(e.target.value)}
                />
              </label>
            </div>
            <input
              type="text"
              value={editedTags}
              onChange={(e) => setEditedTags(e.target.value)}
              placeholder="Tags (comma separated)"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <strong
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                display: 'block',
              }}
            >
              {task.title}
            </strong>
            <p style={{ margin: '5px 0' }}>{task.description}</p>
            <small style={{ color: '#555' }}>Created: {formattedDate}</small>
            <br />
            <small style={{ color: '#555' }}>Priority: {task.priority || 'Medium'}</small>
            <br />
            {task.dueDate && <small>Due: {task.dueDate}</small>}
            <br />
            {task.tags && task.tags.length > 0 && (
              <small>Tags: {task.tags.join(', ')}</small>
            )}
            <div style={{ marginTop: '5px' }}>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete} style={{ marginLeft: '5px' }}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
