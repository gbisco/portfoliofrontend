import '../../styles/components/education/education-card.css'

function EducationCard({ education }) {
  const {
    period,
    title,
    organization,
    website,
    document,
    logo,
    image,
    headline,
    highlights,
    gpa,
    coursework,
  } = education

  return (
    <article
      className={`education-card ${
        image ? 'education-card--with-image' : 'education-card--no-image'
      }`}
    >
      <div className="education-card__content">
        {logo && (
          <div className="education-card__logo">
            <img src={logo} alt={`${organization} logo`} />
          </div>
        )}

        <div className="education-card__details">
          <p className="education-card__period">{period}</p>

          <div className="education-card__heading">
            <h3 className="education-card__title">{title}</h3>

            <p className="education-card__organization">
              {organization}
            </p>

            {gpa != null && (
              <p className="education-card__gpa">
                GPA: {gpa.toFixed(1)}
              </p>
            )}
          </div>

          {headline && (
            <p className="education-card__headline">{headline}</p>
          )}

          {highlights?.length > 0 && (
            <ul className="education-card__highlights">
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}

          {coursework?.length > 0 && (
            <div className="education-card__coursework">
              <p className="education-card__label">
                Relevant Coursework
              </p>

              <div className="education-card__courses">
                {coursework.map((course) => (
                  <span className="education-card__course" key={course}>
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(website || document) && (
            <div className="education-card__actions">
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer">
                  View Website ↗
                </a>
              )}

              {document && (
                <a href={document} target="_blank" rel="noopener noreferrer">
                  View Credential ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {image && (
        <div className="education-card__image">
          <img src={image} alt="" />
        </div>
      )}
    </article>
  )
}

export default EducationCard