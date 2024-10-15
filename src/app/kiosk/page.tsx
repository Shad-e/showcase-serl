'use client'

import { useState, useEffect } from 'react'
import ImageCycler from '../components/ImageCycle' // Import the ImageCycler component

const Kiosk = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/projects.json')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }, 10000) // Change project every 10 seconds

    return () => clearInterval(interval)
  }, [projects])

  if (projects.length === 0) {
    return <p className='text-4xl text-center'>Loading projects...</p> // Loading message
  }

  const project = projects[currentIndex]

  // Function to render description with line breaks
  const renderDescription = (description: string) => {
    return description.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500'>
      {/* Main container with gradient background and centered content */}
      <div className='w-full max-w-7xl p-10 bg-white rounded-lg shadow-lg'>
        {/* Container for project details with white background, rounded corners, and shadow */}
        <h2 className='text-4xl font-bold mb-4 text-center'>{project.title}</h2>
        {/* Title of the project with larger font size, bold, and centered */}
        <div className='flex flex-col lg:flex-row items-center justify-center gap-10'>
          {/* Flex container to arrange image and info side by side on larger screens */}
          {/* Image Section */}
          <div className='lg:w-1/2 w-full'>
            {project.screenshot.length > 0 && (
              <div className='project-screenshot-wrapper rounded-lg overflow-hidden' style={{ width: '400px', height: 'auto' }}>
                <ImageCycler images={project.screenshot} /> {/* Use ImageCycler component here */}
              </div>
            )}
          </div>
          {/* Project Info Section */}
          <div className='lg:w-1/2 w-full text-black'> {/* Change text color to black for better contrast */}
            <p className='text-xl leading-relaxed mb-6'>{renderDescription(project.description)}</p>
            {/* Description with larger font size and relaxed line height */}
            <p className='text-lg mb-4'>
              <strong>Tags:</strong> {project.tags.join(', ')}
              {/* Display project tags in a larger font size */}
            </p>
            <a
              href={project.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 underline text-2xl'
            >
              Visit Project
              {/* Link to project with blue color, underlined, and larger font size */}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Kiosk
