// src/app/components/Header.tsx

import React from 'react';
import SearchBar from './SearchBar'; // Adjust the path if necessary

const Header = ({ onSearch }) => {
  return (
    <header className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-lg"> {/* Add rounded-lg for rounded corners */}
      <h1 className="text-2xl font-bold">ShowcaseSERL Projects</h1>
      <SearchBar onSearch={onSearch} />
    </header>
  );
};

export default Header;
