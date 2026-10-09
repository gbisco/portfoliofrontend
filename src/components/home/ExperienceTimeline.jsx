import experience from '../../data/experience'
import '../../styles/components/home/experience-timeline.css'

function ExperienceTimeline() {
  return (
    <div className="experience-timeline">
      <div className="experience-timeline__line" />

      <div className="experience-timeline__items">
        {experience.map((item, index) => (
          <article
            className={`experience-timeline__item ${
              index % 2 === 0
                ? 'experience-timeline__item--above'
                : 'experience-timeline__item--below'
            }`}
            key={item.id}
          >
            <div className="experience-timeline__content">
              <p className="experience-timeline__period">
                {item.period}
              </p>

              <div className="experience-timeline__heading">
                <h3 className="experience-timeline__title">
                  {item.title}
                </h3>

                <p className="experience-timeline__organization">
                  {item.organization}
                </p>
              </div>

              <p className="experience-timeline__headline">
                {item.headline}
              </p>
            </div>

            <div className="experience-timeline__point" />
          </article>
        ))}
      </div>
    </div>
  )
}

export default ExperienceTimeline