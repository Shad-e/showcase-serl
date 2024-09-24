'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Kiosk = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [projects]);

  if (projects.length === 0) {
    return <p>Loading projects...</p>;
  }

  const project = projects[currentIndex];

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">ShowcaseSERL Kiosk</h1>
      <div className="p-4 border rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold">{project.title}</h2>
        <p>{project.description}</p>
        <p className="mb-2">Tags: {project.tags.join(', ')}</p>
        <img
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          className="project-screenshot"
        />
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Project Link
        </a>
      </div>
    </div>
  );
};

export default Kiosk;
