// This maps through the list of filtered projects and displays each using the ProjectCard component.

import ProjectCard from './ProjectCard';

export default function ProjectList({ projects }) {
  return (
    <ul className="space-y-4">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </ul>
  );
}
