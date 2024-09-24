import { use } from 'react';

async function fetchProjects() {
  const res = await fetch('http://localhost:3000/projects.json');
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return res.json();
}

export default function Home() {
  const projects = use(fetchProjects());

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">ShowcaseSERL Projects</h1>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project, index) => (
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
              <p className="mb-2">Tag: {project.tag}</p>
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
