import Image from 'next/image'
import { Project } from '../types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <li className='rounded-lg border p-4 shadow-md'>
      <h2 className='mb-2 text-xl font-semibold'>{project.title}</h2>
      <div className='project-screenshot-wrapper mb-2'>
        <Image
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          className='project-screenshot'
          width={500}
          height={300}
        />
      </div>
      <p className='mb-2'>{project.description}</p>
      <p className='mb-2'>Type: {project.type}</p>
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
  )
}
