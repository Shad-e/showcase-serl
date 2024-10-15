import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const truncateDescription = (description: string) => {
    return description.length > 100 ? `${description.slice(0, 80)}...` : description;
  };

  return (
    <Link href={`/${project.id}`} passHref>
      <li className='flex items-start rounded-lg border p-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer'>
        <div className='project-screenshot-wrapper mr-4 flex flex-col'>
          {/* Display only the first image in the screenshots array */}
          {project.screenshot.length > 0 && (
            <Image
              src={project.screenshot[0]} // Get the first image
              alt={`${project.title} screenshot`}
              className='project-screenshot mb-2'
              width={200}
              height={150}
              style={{ objectFit: 'cover' }} // Maintain aspect ratio and cover
            />
          )}
        </div>
        <div className='flex-grow'>
          <h2 className='mb-2 text-xl font-semibold'>{project.title}</h2>
          <p className='mb-2'>{truncateDescription(project.description)}</p>
          <p className='mb-2'>
            <span className='ml-1 inline-block rounded-full bg-gray-800 px-2 py-1 text-white text-sm'>
              {project.type}
            </span>
          </p>
          <div className='mb-2'>
            {project.tags.map((tag, index) => (
              <span key={index} className='mr-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-white text-sm'>
                {tag}
              </span>
            ))}
          </div>
          <a 
            href={project.url} 
            className='mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500'
            target='_blank' 
            rel='noopener noreferrer'
          >
            View Project
          </a>
        </div>
      </li>
    </Link>
  );
}
