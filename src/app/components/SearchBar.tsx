"use client"; // Ensure this is the first line

// src/app/components/SearchBar.tsx

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call the onSearch function to filter projects
  };

  return (
    <input
      type="text"
      placeholder="Search projects..."
      value={query}
      onChange={handleInputChange}
      className="p-2 rounded-lg border border-gray-300 bg-gray-200 text-gray-800" // Adjust the text color
    />
  );
};

export default SearchBar;

