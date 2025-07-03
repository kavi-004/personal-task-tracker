import React from 'react';

export default function TaskFilter({ filter, setFilter, tasks }) {
  const allCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={() => setFilter('all')}
        className={filter === 'all' ? 'active-filter' : ''}
      >
        All ({allCount})
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={filter === 'completed' ? 'active-filter' : ''}
      >
        Completed ({completedCount})
      </button>
      <button
        onClick={() => setFilter('pending')}
        className={filter === 'pending' ? 'active-filter' : ''}
      >
        Pending ({pendingCount})
      </button>
    </div>
  );
}
