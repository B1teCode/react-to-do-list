import React from 'react';

const Filter = ({ setFilter, setSort }) => {
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="filter">
      <div>
        <label>Filter: </label>
        <select onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div>
        <label>Sort by: </label>
        <select onChange={handleSortChange}>
          <option value="date">Date</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
