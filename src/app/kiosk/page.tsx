'use client'

import { useState, useEffect } from 'react'
import QRCodeDisplay from '../components/QRCodeDisplay'

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
    }, 5000)

    return () => clearInterval(interval)
  }, [projects])

  if (projects.length === 0) {
    return <p className='text-center text-4xl'>Loading projects...</p>
  }

  const project = projects[currentIndex]

  const renderDescription = (description: string) => {
    return description.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ))
  }

  const qrCodeUrl = `${window.location.origin}/${project.id}`

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500'>
      <div
        className='relative flex w-full max-w-screen-2xl flex-col rounded-lg bg-white p-16 shadow-2xl md:p-20'
        style={{ height: '85vh' }}
      >
        <div className='mb-4 text-center'>
          <h2 className='mb-2 text-5xl font-bold md:text-6xl'>
            {project.title}
          </h2>
          <div className='flex justify-center'>
            {project.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className='mb-2 mr-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-sm text-white'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className='flex h-full flex-grow flex-col items-start justify-between gap-10 lg:flex-row'>
  <div className='flex h-full w-full items-center justify-center lg:w-1/2'>
    {project.screenshot.length > 0 && (
      <div className={`flex h-full items-start justify-center ${project.screenshot.length > 1 ? 'space-x-2' : 'space-x-4'}`}>
        {project.screenshot.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            srcSet={`${image} 1x, ${image}?raw=true 2x`}
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
          <div className='flex h-full w-full flex-col overflow-auto text-black lg:w-1/2'>
            <p className='mb-6 text-xl leading-relaxed md:text-2xl'>
              {renderDescription(project.description)}
            </p>
          </div>
        </div>

        <div className='absolute bottom-6 right-6'>
          <QRCodeDisplay url={qrCodeUrl} />
        </div>
      </div>
    </div>
  )
}

export default Kiosk
