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
            Experienced in building AI-enabled applications and automation systems.
            I implement end-to-end solutions that integrate AI, backend services,
            cloud platforms, and existing operational systems, with hands-on
            experience in access control, networking, deployment, and troubleshooting.
          </p>

          <div className="hero__actions">
            <Button
              tone="primary"
              surface="glass"
              href="/#contact"
            >
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