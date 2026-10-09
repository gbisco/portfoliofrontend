import Button from '../ui/Button'
import ExperienceTimeline from './ExperienceTimeline'
import '../../styles/components/home/experience-preview.css'

function ExperiencePreview() {
  return (
    <section className="experience-preview">
      <div className="experience-preview__background" />

      <div className="content-container experience-preview__inner">
        <div className="experience-preview__header">
          <div className="experience-preview__heading">
            <p className="experience-preview__eyebrow">
              Experience
            </p>

            <h2 className="experience-preview__title">
              Building systems that connect ideas to real-world impact.
            </h2>

            <p className="experience-preview__description">
              From engineering and automation to AI-powered software.
            </p>

            <div className="experience-preview__actions">
              <Button
                tone="primary"
                surface="glass"
                href="/experience"
              >
                View Full Experience
              </Button>
            </div>
          </div>
        </div>

        <div className="experience-preview__timeline">
          <ExperienceTimeline />
        </div>
      </div>
    </section>
  )
}

export default ExperiencePreview