import { useState } from 'react';
import './TodoList.css';

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  // Edit handlers
  const handleDoubleClick = () => setIsEditing(true);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editedText.trim()) {
      onUpdate(todo.id, editedText);
      setIsEditing(false);
    }
  };

  // Due date calculator
  const getDueDateStatus = () => {
    if (!todo.dueDate) return '';
    const dueDate = new Date(todo.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dueDate < today && !todo.completed) {
      const diffDays = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
      return `Overdue by ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    } else if (dueDate >= today) {
      const diffDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
      return `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    }
    return '';
  };

  return (
    <li className={`todo-item ${todo.priority} ${todo.completed ? 'completed' : ''} ${
      !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date() ? 'overdue' : ''
    }`}>
      {/* Todo content */}
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="edit-input"
              autoFocus
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <span onDoubleClick={handleDoubleClick}>
            {todo.text}
          </span>
        )}
      </div>
      
      {/* Meta info */}
      <div className="todo-meta">
        <span>{todo.category}</span>
        {todo.dueDate && <span>{getDueDateStatus()}</span>}
      </div>
      
      <button onClick={() => onDelete(todo.id)}>×</button>
    </li>
  );
}

function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default TodoList;