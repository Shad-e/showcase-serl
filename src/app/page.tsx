'use client' // Ensure this is the first line

import { useEffect, useState } from 'react'
import Image from 'next/image' // Import Image from next/image
import SearchBar from './components/SearchBar' // Adjust the path if necessary
import { Project } from './types' // Import the Project type

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch('http://localhost:3000/projects.json')
  if (!res.ok) {
    throw new Error('Failed to fetch projects')
  }
  return res.json()
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true)
      const data = await fetchProjects()
      setProjects(data)
      setFilteredProjects(data)
      setLoading(false)
    }

    getProjects()

    const interval = setInterval(getProjects, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const results = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        project.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredProjects(results)
  }, [searchQuery, projects])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className='min-h-screen p-8'>
      <header className='mb-4 flex items-center justify-between rounded-lg bg-gray-800 p-4 text-white'>
        <h1 className='text-2xl font-bold'>ShowcaseSERL Projects</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {loading ? (
        <div className='flex h-64 items-center justify-center'>
          <div className='loader mb-4 h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear'></div>
          <p className='ml-2'>Loading projects...</p>
        </div>
      ) : (
        <>
          <p className='mb-4 mt-2 text-center text-lg'>
            {filteredProjects.length} project
            {filteredProjects.length !== 1 ? 's' : ''}
          </p>

          {filteredProjects.length === 0 ? (
            <p>No projects available.</p>
          ) : (
            <ul className='space-y-4'>
              {filteredProjects.map((project, index) => (
                <li key={index} className='rounded-lg border p-4 shadow-md'>
                  <h2 className='mb-2 text-xl font-semibold'>
                    {project.title}
                  </h2>
                  <div className='project-screenshot-wrapper mb-2'>
                    <Image
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      className='project-screenshot'
                      width={500} // Specify the width of the image
                      height={300} // Specify the height of the image
                    />
                  </div>
                  <p className='mb-2'>{project.description}</p>
                  <p className='mb-2'>
                    Type: {project.type}
                  </p>
                  <p className='mb-2'>Tags: {project.tags.join(', ')}</p>
                  <a
                    href={project.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 underline'
                  >
                    Project Link
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
