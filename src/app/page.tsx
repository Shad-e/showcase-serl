"use client"; // Ensure this is the first line

import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar'; // Adjust the path if necessary
import LoadingSpinner from './components/LoadingSpinner';
import ProjectList from './components/ProjectList';

async function fetchProjects() {
  const res = await fetch('/projects.json'); // Relative path to the public folder
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return res.json();
}

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true); // Start loading
      const data = await fetchProjects();
      setProjects(data);
      setFilteredProjects(data); // Initialize filtered projects
      setLoading(false); // Stop loading
    };

    getProjects();

    // Reload projects every 5 minutes
    const interval = setInterval(getProjects, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const results = projects.filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.type.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by type
    );
    setFilteredProjects(results); // Update filtered projects
  }, [searchQuery, projects]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header Section */}
      <header className="bg-gray-800 text-white rounded-lg p-4 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ShowcaseSERL Projects</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {/* Display loading spinner */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Display the number of projects */}
          <p className="mt-2 mb-4 text-lg text-center">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>

          {filteredProjects.length === 0 ? (
            <p>No projects available.</p>
          ) : (
            <ProjectList projects={filteredProjects} />
          )}
        </>
      )}
    </div>
  );
}
