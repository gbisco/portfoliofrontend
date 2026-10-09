import '../../styles/components/home/contact-section.css'

function ContactSection() {
  const contactLinks = [
    {
      id: 'linkedin',
      title: 'LinkedIn',
      label: 'Connect with me',
      icon: '/brands/linkedin.svg',
      href: 'https://www.linkedin.com/in/gabriel-bisco',
    },
    {
      id: 'github',
      title: 'GitHub',
      label: 'View my work',
      icon: '/brands/github.svg',
      href: 'https://github.com/gbisco',
    },
    {
      id: 'meeting',
      title: "Let's Talk",
      label: 'Schedule a meeting',
      icon: '/brands/google.svg',
      href: 'https://calendar.app.google/h6Px8PSSAM51n6aH6',
    },
  ]

  return (
    <section className="contact-section" id="contact" data-navbar-theme="light">
      <div className="contact-section__background" />

      <div className="contact-section__frost">
        <div className="content-container contact-section__inner">
          <header className="contact-section__header">
            <p className="contact-section__eyebrow">
              Let's Connect
            </p>

            <h2 className="contact-section__title">
              Have something in mind? Let's talk.
            </h2>
          </header>

          <div className="contact-section__links">
            {contactLinks.map((contact) => (
              <a
                className="contact-section__link"
                href={contact.href}
                key={contact.id}
                target="_blank"
                rel="noreferrer"
              >
                <h3 className="contact-section__link-title">
                  {contact.title}
                </h3>

                <div className="contact-section__icon">
                  <img
                    src={contact.icon}
                    alt=""
                  />
                </div>

                <p className="contact-section__label">
                  {contact.label}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection