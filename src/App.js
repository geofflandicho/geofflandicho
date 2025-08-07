import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import FilterControls from './FilterControls';
import './App.css';

function App() {
  // Todos state
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Categories state
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : ['Work', 'Personal', 'Shopping'];
  });

  // Filter state
  const [filter, setFilter] = useState({
    searchText: '',
    category: 'all',
    status: 'all'
  });

  // Save data
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [todos, categories]);

  // Add todo
  const addTodo = (text, priority, category, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text,
      priority,
      category,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
  };

  // Toggle completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  //Delete Button
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  //Update Button
  const updateTodo = (id, updatedText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: updatedText } : todo
    ));
  };

  // Add category
  const addCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(filter.searchText.toLowerCase());
    const matchesCategory = filter.category === 'all' || todo.category === filter.category;
    
    let matchesStatus = true;
    if (filter.status === 'active') matchesStatus = !todo.completed;
    if (filter.status === 'completed') matchesStatus = todo.completed;
    if (filter.status === 'overdue') {
      matchesStatus = !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date();
    }
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sorting of todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoForm 
        onAdd={addTodo} 
        categories={categories} 
        onAddCategory={addCategory} 
      />
      <FilterControls 
        filter={filter}
        setFilter={setFilter}
        categories={categories}
      />
      <TodoList 
        todos={sortedTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />
    </div>
  );
}

export default App;