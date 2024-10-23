import Image from 'next/image'
import Link from 'next/link'
import { Project } from '../types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const truncateDescription = (description: string) => {
    return description.length > 100
      ? `${description.slice(0, 250)}...`
      : description
  }

  return (
    <Link href={`/${project.id}`} passHref>
      <li className='h-100 flex cursor-pointer items-start rounded-lg border p-4 shadow-md transition-shadow duration-200 hover:shadow-lg'>
        <div className='project-screenshot-wrapper mr-4 flex flex-col'>
          {/* Display only the first image in the screenshots array */}
          {project.screenshot.length > 0 && (
            <Image
              src={project.screenshot[0]} // Get the first image
              alt={`${project.title} screenshot`}
              className='project-screenshot mb-2'
              width={200}
              height={300} // Adjusted height to match the width ratio (200px)
              style={{ objectFit: 'cover' }} // Ensures the image covers without stretching
            />
          )}
        </div>
        <div className='flex-grow'>
          <h2 className='mb-2 text-xl font-semibold'>{project.title}</h2>
          <p className='mb-2'>{truncateDescription(project.description)}</p>
          <p className='mb-2'>
            <span className='ml-1 inline-block rounded-full bg-gray-800 px-2 py-1 text-sm text-white'>
              {project.type}
            </span>
          </p>
          <div className='mb-2'>
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className='mr-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-sm text-white'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </li>
    </Link>
  )
}
