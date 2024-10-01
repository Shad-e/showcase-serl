import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const truncateDescription = (description: string) => {
    return description.length > 100 ? `${description.slice(0, 100)}...` : description;
  };

  return (
    <li className='flex items-start rounded-lg border p-4 shadow-md'>
      <div className='project-screenshot-wrapper mr-4'>
        <Image
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          className='project-screenshot'
          width={200}
          height={150}
        />
      </div>
      <div className='flex-grow'>
        <Link href={`/${project.id}`}>
          <h2 className='mb-2 text-xl font-semibold hover:underline'>{project.title}</h2>
        </Link>
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
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block rounded bg-blue-600 px-2 py-1 text-white font-semibold text-xs transition duration-300 ease-in-out hover:bg-blue-700'
        >
          Project Link
        </a>
      </div>
    </li>
  );
}
