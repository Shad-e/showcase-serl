import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Project } from '../types';

export const generateStaticParams = async () => {
  const filePath = path.join(process.cwd(), 'public', 'projects.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const projects: Project[] = JSON.parse(jsonData);

  return projects.map((project: Project) => ({
    id: project.id.toString(),
  }));
};

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const filePath = path.join(process.cwd(), 'public', 'projects.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const projects: Project[] = JSON.parse(jsonData);
  
  const project = projects.find((proj: Project) => proj.id.toString() === params.id);

  if (!project) {
    return <div className='min-h-screen p-8'>Project not found.</div>;
  }

  return (
    <div className='min-h-screen flex justify-center items-center p-8 bg-gray-100'>
      <div className='w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden'>
        <header className='bg-gray-800 text-white p-6'>
          <h1 className='text-3xl font-bold'>
            <Link href="/" className='hover:text-gray-400'>
              {project.title}
            </Link>
          </h1>
        </header>

        <div className='p-6'>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/2 flex justify-start items-start p-4'>
              <img
                src={project.screenshot}
                alt={project.title}
                className='max-w-s rounded-lg shadow-lg object-cover'
              />
            </div>

            <div className='md:w-1/2 p-4 flex flex-col justify-start'>
              <p className='text-lg mb-4'>{project.description}</p>

    
              <div className='flex flex-wrap mb-4'>
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='mr-2 mb-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-white text-sm'
                  >
                    {tag}
                  </span>
                ))}
              </div>


              <div className='flex justify-start'>
                <a
                  href={project.url}
                  className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 whitespace-nowrap'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View Project
                </a>
              </div>
            </div>
          </div>

          <div className='text-left mt-6'>
            <Link href="/" className='inline-block rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500'>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
