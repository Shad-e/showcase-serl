import React from 'react'
import Link from 'next/link' // Ensure you import Link from Next.js
import SearchBar from './SearchBar' // Adjust the path if necessary

const Header = ({ onSearch }) => {
  return (
    <header className='flex items-center justify-between rounded-lg bg-gray-800 p-4 text-white'>
      <Link href="/">
        <h1 className='text-2xl font-bold cursor-pointer hover:text-gray-400'>
          ShowcaseSERL Projects
        </h1>
      </Link>
      <SearchBar onSearch={onSearch} />
    </header>
  )
}

export default Header
