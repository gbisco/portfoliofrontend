import ExperienceCard from './ExperienceCard'
import experience from '../../data/experience'
import '../../styles/components/experience/work-experience.css'

function WorkExperience() {
  const workExperience = experience.filter((item) => item.type === 'work')

  return (
    <section className="work-experience">
      <div className="work-experience__background" />

      <div className="content-container work-experience__inner">
        <header className="work-experience__header">
          <p className="work-experience__eyebrow">Experience</p>

          <h1 className="work-experience__title">
            Building systems that connect ideas to real-world impact.
          </h1>

          <p className="work-experience__description">
            Professional experience across engineering, automation, and
            AI-powered software.
          </p>
        </header>

        <div className="work-experience__grid">
          {workExperience.map((item) => (
            <ExperienceCard
              key={item.id}
              experience={item}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkExperience