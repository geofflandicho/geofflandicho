import './FilterControls.css';

function FilterControls({ filter, setFilter, categories }) {
  return (
    <div className="filter-controls">
      <input
        type="text"
        value={filter.searchText}
        onChange={(e) => setFilter({...filter, searchText: e.target.value})}
        placeholder="Search todos..."
        className="search-input"
      />
      
      <select
        value={filter.category}
        onChange={(e) => setFilter({...filter, category: e.target.value})}
        className="category-filter"
      >
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      
      <select
        value={filter.status}
        onChange={(e) => setFilter({...filter, status: e.target.value})}
        className="status-filter"
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="overdue">Overdue</option>
      </select>
    </div>
  ); 
}

export default FilterControls;