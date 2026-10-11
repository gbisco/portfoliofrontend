import experience from '../../data/experience'
import CertificationCard from './CertificationCard'
import '../../styles/components/education/certifications-section.css'

function CertificationsSection() {
  const certifications = experience
    .filter((item) => item.type === 'certification')
    .reverse()

  return (
    <section className="certifications-section" data-navbar-theme="light">
      <div className="content-container certifications-section__inner">
        <header className="certifications-section__header">
          <p className="certifications-section__eyebrow">
            Certifications
          </p>

          <h2 className="certifications-section__title">
            Certifications & Credentials
          </h2>

          <p className="certifications-section__description">
            Specialized training and professional qualifications.
          </p>
        </header>

        <div className="certifications-section__grid">
          {certifications.map((item) => (
            <CertificationCard
              key={item.id}
              certification={item}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CertificationsSection