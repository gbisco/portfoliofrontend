import Hero from '../components/home/Hero'
import FeaturedProjects from '../components/home/FeaturedProjects'
import ExperiencePreview from '../components/home/ExperiencePreview'
import ContactSection from '../components/home/ContactSection'

import '../styles/pages/home.css'

function Home() {
  return (
    <main className="home">
      <div className="home__background" />

      <div className="home__content">
        <Hero />
        <FeaturedProjects />
        <ExperiencePreview />
        <ContactSection />
      </div>
    </main>
  )
}

export default Home