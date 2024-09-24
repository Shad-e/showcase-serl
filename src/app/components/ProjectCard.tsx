// Handles the display of each project, including title, description, type, tags, screenshot and link.

export default function ProjectCard({ project }) {
    return (
      <li className="p-4 border rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
        <div className="project-screenshot-wrapper mb-2">
          <img
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            className="project-screenshot"
          />
        </div>
        <p className="mb-2">{project.description}</p>
        <p className="mb-2">
          Type: <strong>{project.type}</strong>
        </p>
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
    );
  }
  