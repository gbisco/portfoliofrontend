import Button from '../ui/Button'
import '../../styles/components/projects/project-entry.css'

function ProjectEntry({ project, reverse = false }) {
  const {
    title,
    tag,
    description,
    technologies = [],
    image,
    imageFit = 'cover',
    link,
  } = project

  const className = [
    'project-entry',
    reverse ? 'project-entry--reverse' : '',
    !image ? 'project-entry--no-image' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article id={project.id} className={className}>
      <div className="project-entry__content">
        {tag && (
          <p className="project-entry__tag">
            {tag}
          </p>
        )}

        <h2 className="project-entry__title">
          {title}
        </h2>

        <p className="project-entry__description">
          {description}
        </p>

        {technologies.length > 0 && (
          <div className="project-entry__technologies">
            {technologies.map((technology) => (
              <span
                className="project-entry__technology"
                key={technology}
              >
                {technology}
              </span>
            ))}
          </div>
        )}

        {link && (
          <div className="project-entry__actions">
            <Button
              tone="primary"
              surface="solid"
              href={link}
            >
              View Project ↗
            </Button>
          </div>
        )}
      </div>

      {image && (
        <div className="project-entry__image">
          <img
            src={image}
            alt={`${title} project preview`}
            style={{ objectFit: imageFit }}
            loading="lazy"
          />
        </div>
      )}
    </article>
  )
}

export default ProjectEntry