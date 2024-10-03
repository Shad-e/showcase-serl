// pages/project/[id].tsx
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Project } from '../types';
import QRCodeDisplay from '../components/QRCodeDisplay'; // Import the QRCodeDisplay component
import ImageCycler from '../components/ImageCycle'; // Import the ImageCycler component

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
    <div className='min-h-screen flex justify-center items-center p-8 bg-gray-100'>
      <div className='w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden'>
        <header className='bg-gray-800 text-white p-6'>
          <div className='flex justify-between items-center'>
            <h1 className='text-4xl font-bold'>
              <Link href="/" className='hover:text-gray-400'>
                {project.title}
              </Link>
            </h1>
            <div className='flex flex-wrap ml-4'>
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className='mr-2 mb-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-white text-sm'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className='p-6'>
          <div className='flex flex-col md:flex-row'>
            <div className='flex items-start p-4'>
              <div className='project-screenshot-wrapper mr-4 rounded-lg overflow-hidden' style={{ width: '400px', height: 'auto' }}>
                <ImageCycler images={project.screenshot} /> {/* Use ImageCycler component here */}
              </div>
            </div>

            <div className='p-4 flex flex-col justify-start flex-grow'>
              <p className='text-base md:text-lg mb-2'>
                {renderDescription(project.description)} {/* Render the description here */}
              </p>
            </div>
          </div>

          <div className='flex items-end justify-between mt-6'>
            <QRCodeDisplay url={project.url} />

            <div className='flex justify-end space-x-4'>
              <Link href="/" className='inline-block rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-600'>
                Back to Home
              </Link>
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
      </div>
    </div>
  );
};

export default ProjectPage;
