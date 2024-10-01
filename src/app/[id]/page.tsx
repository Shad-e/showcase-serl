// src/app/[id]/page.tsx

import fs from 'fs';
import path from 'path';
import Link from 'next/link'; // Import Link from next/link

export const generateStaticParams = async () => {
  const filePath = path.join(process.cwd(), 'public', 'projects.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const projects = JSON.parse(jsonData);

  return projects.map(project => ({
    id: project.id.toString(), // Ensure id is a string for dynamic routing
  }));
};

// The ProjectPage component does not use "use client"
const ProjectPage = ({ params }: { params: { id: string } }) => {
  const filePath = path.join(process.cwd(), 'public', 'projects.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const projects = JSON.parse(jsonData);
  
  const project = projects.find(proj => proj.id.toString() === params.id);

  if (!project) {
    return <div className='min-h-screen p-8'>Project not found.</div>;
  }

  return (
    <div className='min-h-screen p-8'>
      <header className='mb-4 rounded-lg bg-gray-800 p-4 text-white'>
        <h1 className='text-2xl font-bold'>{project.title}</h1>
      </header>

      <div className='flex flex-col items-center'>
        <img 
          src={project.screenshot} 
          alt={project.title} 
          className='rounded-lg shadow-lg' 
        />
        <p className='mt-4 text-lg'>{project.description}</p>
        <a 
          href={project.url} 
          className='mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500'
          target='_blank' 
          rel='noopener noreferrer'
        >
          View Project
        </a>
        {}
        <Link href="/" className='mt-4 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500'>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ProjectPage;
