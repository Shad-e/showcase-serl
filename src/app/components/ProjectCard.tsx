import Image from 'next/image'
import { Project } from '../types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Function to truncate the description to a maximum of 100 characters
  const truncateDescription = (description: string) => {
    return description.length > 100 ? `${description.slice(0, 105)}...` : description;
  };

  return (
    <li className='flex items-start rounded-lg border p-4 shadow-md'>
      <div className='project-screenshot-wrapper mr-4'>
        <Image
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          className='project-screenshot'
          width={200}  // Adjust width as needed
          height={150} // Adjust height as needed
        />
      </div>
      <div className='flex-grow'>
        <h2 className='mb-2 text-xl font-semibold'>{project.title}</h2>
        <p className='mb-2'>{truncateDescription(project.description)}</p> {/* Truncated description */}
        <p className='mb-2'>Type: {project.type}</p>
        <div className='mb-2'>
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className='mr-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-white text-sm'
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'
        >
          Project Link
        </a>
      </div>
    </li>
  )
}
