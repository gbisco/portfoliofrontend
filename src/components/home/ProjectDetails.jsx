import '../../styles/components/home/project-details.css'

function ProjectDetails({ project }) {
  return (
    <div className="project-details">
      <div className="project-details__header">
        <h3 className="project-details__title">
          {project.title}
        </h3>

        <a
          className="project-details__link"
          href={project.links.project}
        >
          <span>View Project</span>

          <img
            src="/icons/arrow-up-right-icon.svg"
            alt=""
          />
        </a>
      </div>

      <p className="project-details__description">
        {project.description}
      </p>

      <div className="project-details__technologies">
        {project.technologies.map((technology) => (
          <span
            className="project-details__technology"
            key={technology}
          >
            {technology}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ProjectDetails