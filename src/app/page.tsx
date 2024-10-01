'use client'

import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import { Project } from './types'
import ProjectCard from './components/ProjectCard' // Import the ProjectCard

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
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
