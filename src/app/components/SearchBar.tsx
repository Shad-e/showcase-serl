"use client"; // Ensure this is the first line

import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void; // Function to handle search
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query); // Call the search function with the current query
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-4"> {/* Added margin for spacing */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search projects..."
        className="border rounded p-2"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
