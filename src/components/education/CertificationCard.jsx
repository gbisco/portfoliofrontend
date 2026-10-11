import '../../styles/components/education/certification-card.css'

function CertificationCard({ certification }) {
  const {
    period,
    title,
    organization,
    website,
    document,
    logo,
    headline,
  } = certification

  return (
    <article className="certification-card">
      {logo && (
        <div className="certification-card__logo">
          <img src={logo} alt={`${organization} logo`} />
        </div>
      )}

      <div className="certification-card__content">
        <p className="certification-card__period">{period}</p>

        <div className="certification-card__heading">
          <h3 className="certification-card__title">{title}</h3>
          <p className="certification-card__organization">{organization}</p>
        </div>

        {headline && (
          <p className="certification-card__headline">{headline}</p>
        )}

        {(website || document) && (
          <div className="certification-card__actions">
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
    </article>
  )
}

export default CertificationCard