// src/app/components/ProjectList.tsx

import React from 'react' // Import React
import Image from 'next/image' // Import Image from next/image
import { Project } from '../types' // Import the Project type

interface ProjectListProps {
  projects: Project[]
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <ul className='space-y-4'>
      {projects.map((project, index) => (
        <li key={index} className='rounded-lg border p-4 shadow-md'>
          <h2 className='mb-2 text-xl font-semibold'>{project.title}</h2>
          <div className='project-screenshot-wrapper mb-2'>
            <Image
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              className='project-screenshot'
              width={500} // Set appropriate width
              height={300} // Set appropriate height
            />
          </div>
          <p className='mb-2'>{project.description}</p>
          <p className='mb-2'>
            Type: <strong>{project.type}</strong>
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
  )
}

export default ProjectList
