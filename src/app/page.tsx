"use client"; // Ensure this is the first line

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar'; // Adjust the path if necessary

async function fetchProjects() {
  const res = await fetch('/projects.json'); // Adjust the URL if necessary
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return res.json();
}

export default function Home() {
  const [projects, setProjects] = useState([]); // State to hold projects
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query from SearchBar
  };

  // Fetch projects on initial mount and set up interval
  useEffect(() => {
    const loadProjects = async () => {
      const projectsData = await fetchProjects();
      setProjects(projectsData);
    };

    loadProjects(); // Initial fetch

    const intervalId = setInterval(loadProjects, 300000); // Reload every 30 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []); // Empty dependency array means this runs once on mount

  // Filter projects based on the search query
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (Array.isArray(project.tags) && project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">ShowcaseSERL Projects</h1>
      <SearchBar onSearch={handleSearch} /> {/* Include the SearchBar component */}
      {filteredProjects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <ul className="space-y-4">
          {filteredProjects.map((project, index) => (
            <li key={index} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <div className="project-screenshot-wrapper">
                <img
                  src={project.screenshot}
                  alt={`${project.title} screenshot`}
                  className="project-screenshot"
                />
              </div>
              <p className="mb-2">{project.description}</p>
              <p className="mb-2">Tags: {project.tags.join(', ')}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Project Link
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
