'use client'

import { useState, useEffect } from 'react'
import QRCodeDisplay from '../components/QRCodeDisplay'; // Import the QRCodeDisplay component

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
    }, 5000) // Change project every 5 seconds

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
    ))
  }

  // Construct dynamic QR code URL
  const qrCodeUrl = `${window.location.origin}/${project.id}`; // Dynamically construct the URL

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500'>
      {/* Full-screen container with centered content */}
      <div className='relative w-full max-w-screen-2xl p-16 md:p-20 bg-white rounded-lg shadow-2xl flex flex-col' style={{ height: '85vh' }}>
        
        {/* Combined Title and Tags Section */}
        <div className='text-center mb-4'>
          <h2 className='text-5xl md:text-6xl font-bold mb-2'>{project.title}</h2>
          <div className='flex justify-center'>
            {project.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className='mr-2 mb-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-white text-sm'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className='flex flex-col lg:flex-row items-start justify-between gap-10 h-full flex-grow'>
          {/* Image Section */}
          <div className='lg:w-1/2 w-full h-full flex items-center justify-center'>
            {project.screenshot.length > 0 && (
              <div className='flex space-x-4 items-start justify-center h-full'>
                {/* Flex container to keep images side by side */}
                {project.screenshot.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    srcSet={`${image} 1x, ${image}?raw=true 2x`} // Use srcSet for responsive images
                    alt={`Screenshot ${index + 1}`}
                    className='rounded-lg'
                    style={{
                      width: project.screenshot.length > 1 ? '400px' : '800px',
                      height: project.screenshot.length > 1 ? 'auto' : '400px',
                      maxHeight: '80%',
                      objectFit: 'contain',
                    }} 
                  />
                ))}
              </div>
            )}
          </div>
          {/* Project Info Section */}
          <div className='lg:w-1/2 w-full h-full text-black flex flex-col overflow-auto'>
            <p className='text-xl md:text-2xl leading-relaxed mb-6'>
              {renderDescription(project.description)}
            </p>
          </div>
        </div>

        {/* QR Code Section */}
        <div className='absolute bottom-6 right-6'>
          <QRCodeDisplay url={qrCodeUrl} /> {/* Use the dynamic QR code URL */}
        </div>
      </div>
    </div>
  )
}

export default Kiosk
