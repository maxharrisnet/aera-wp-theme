import React, { useState } from 'react';

const ThreeDropdownFilter = () => {
  // Sample data to filter
  const items = [
    { id: 1, category: 'Fruits', color: 'Red', size: 'Small' },
    { id: 2, category: 'Fruits', color: 'Green', size: 'Medium' },
    { id: 3, category: 'Vegetables', color: 'Green', size: 'Large' },
    { id: 4, category: 'Vegetables', color: 'Red', size: 'Small' },
    { id: 5, category: 'Fruits', color: 'Yellow', size: 'Large' },
    { id: 6, category: 'Vegetables', color: 'Yellow', size: 'Medium' },
  ];

  // State to manage selected filters
  const [filters, setFilters] = useState({
    category: '',
    color: '',
    size: '',
  });

  // Handle dropdown changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter the items based on selected filters
  const filteredItems = items.filter((item) => {
    return (
      (!filters.category || item.category === filters.category) &&
      (!filters.color || item.color === filters.color) &&
      (!filters.size || item.size === filters.size)
    );
  });

  return (
    <div>
      <h1>Three Dropdown Filters</h1>

      {/* Dropdown for Category */}
      <label>
        Category:
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
        </select>
      </label>

      {/* Dropdown for Color */}
      <label>
        Color:
        <select name="color" value={filters.color} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Red">Red</option>
          <option value="Green">Green</option>
          <option value="Yellow">Yellow</option>
        </select>
      </label>

      {/* Dropdown for Size */}
      <label>
        Size:
        <select name="size" value={filters.size} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </label>

      {/* Display Filtered Items */}
      <h2>Filtered Items:</h2>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            {item.category} - {item.color} - {item.size}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreeDropdownFilter;