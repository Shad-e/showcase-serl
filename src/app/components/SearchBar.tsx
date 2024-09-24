'use client' // Ensure this is the first line

// src/app/components/SearchBar.tsx
import React, { useState } from 'react' // Import useState

// Define props type for SearchBar
interface SearchBarProps {
  onSearch: (query: string) => void // onSearch is a function that takes a string argument
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('') // Define state type as string

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Define the event type
    setQuery(e.target.value)
    onSearch(e.target.value) // Call the onSearch function to filter projects
  }

  return (
    <input
      type='text'
      placeholder='Search projects...'
      value={query}
      onChange={handleInputChange}
      className='rounded-lg border border-gray-300 bg-gray-200 p-2 text-gray-800' // Adjust the text color
    />
  )
}

export default SearchBar
