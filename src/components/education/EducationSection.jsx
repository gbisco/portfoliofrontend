import experience from '../../data/experience'
import EducationCard from './EducationCard'
import '../../styles/components/education/education-section.css'

function EducationSection() {
  const education = experience
    .filter((item) => item.type === 'education')
    .reverse()

  return (
    <section className="education-section">
      <div className="education-section__background" />

      <div className="content-container education-section__inner">
        <header className="education-section__header">
          <p className="education-section__eyebrow">
            Education
          </p>

          <h1 className="education-section__title">
            Building the foundation behind the systems I create.
          </h1>

          <p className="education-section__description">
            Academic experience spanning engineering, artificial intelligence,
            and applied technology.
          </p>
        </header>

        <div className="education-section__list">
          {education.map((item) => (
            <EducationCard
              key={item.id}
              education={item}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EducationSection