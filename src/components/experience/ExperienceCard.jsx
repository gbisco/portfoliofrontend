import '../../styles/components/experience/experience-card.css'

function ExperienceCard({ experience }) {
  const {
    period,
    title,
    organization,
    logo,
    image,
    headline,
    description,
  } = experience

  return (
    <article
      className={`experience-card ${
        image ? 'experience-card--with-image' : 'experience-card--no-image'
      }`}
    >
      <div className="experience-card__content">
        {logo && (
          <div className="experience-card__logo">
            <img src={logo} alt={`${organization} logo`} />
          </div>
        )}

        <div className="experience-card__details">
          <p className="experience-card__period">{period}</p>

          <div className="experience-card__heading">
            <h3 className="experience-card__title">{title}</h3>
            <p className="experience-card__organization">{organization}</p>
          </div>

          <p className="experience-card__headline">{headline}</p>

          <p className="experience-card__description">{description}</p>
        </div>
      </div>

      {image && (
        <div className="experience-card__image">
          <img src={image} alt="" />
        </div>
      )}
    </article>
  )
}

export default ExperienceCard