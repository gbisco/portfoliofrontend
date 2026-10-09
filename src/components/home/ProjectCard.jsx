import '../../styles/components/home/project-card.css'

function ProjectCard({ project }) {
  return (
    <article
      className="project-card"
      style={{
        '--project-background': `url(${project.background})`,
      }}
    >
      <div className="project-card__background" />

      <div className="project-card__overlay" />

      <div className="project-card__content">
        <div className="project-card__text">
          <p className="project-card__tag">
            {project.tag}
          </p>

          <h3 className="project-card__title">
            {project.title}
          </h3>
        </div>

        {project.thumbnail && (
          <div className="project-card__visual">
            <img
              src={project.thumbnail}
              alt={`${project.title} project`}
            />
          </div>
        )}
      </div>
    </article>
  )
}

export default ProjectCard