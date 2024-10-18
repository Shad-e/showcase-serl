import React from 'react'
import Link from 'next/link' // Ensure you import Link from Next.js
import SearchBar from './SearchBar' // Adjust the path if necessary

const Header = ({ onSearch }) => {
  return (
    <header className='flex items-center justify-between rounded-lg bg-gray-800 p-4 text-white'>
      <Link href='/'>
        <h1 className='cursor-pointer text-2xl font-bold hover:text-gray-400'>
          ShowcaseSERL Projects
        </h1>
      </Link>
      <div className='flex items-center space-x-4'>
        {' '}
        {/* Flex container for search bar and button */}
        <SearchBar onSearch={onSearch} />
        <Link href='/kiosk'>
          <button className='rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-500'>
            Kiosk Mode
          </button>
        </Link>
      </div>
    </header>
  )
}

export default Header
