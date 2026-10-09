import Button from '../ui/Button'
import '../../styles/components/home/hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="content-container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">
            AI & Automation Engineer
          </p>

          <h1 className="hero__title">
            Gabriel Bisco Reinato
          </h1>

          <p className="hero__description">
            I build practical AI, automation, and software systems.
          </p>

          <div className="hero__actions">
            <Button tone="primary" surface="solid">
              View My Work
            </Button>

            <Button tone="secondary" surface="glass">
              Get in Touch
            </Button>
          </div>
        </div>

        <div className="hero__image-frame">
          <img
            className="hero__image"
            src="/images/me-portrait.jpg"
            alt="Gabriel Bisco Reinato"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero