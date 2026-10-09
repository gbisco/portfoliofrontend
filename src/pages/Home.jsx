import Hero from '../components/home/Hero'
import FeaturedProjects from '../components/home/FeaturedProjects'
import ExperiencePreview from '../components/home/ExperiencePreview'
import ContactSection from '../components/home/ContactSection'


function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ExperiencePreview />
      <ContactSection />
    </>
  )
}

export default Home