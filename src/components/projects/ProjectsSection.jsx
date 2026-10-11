import { useState } from 'react'

import Dropdown from '../ui/Dropdown'
import ProjectEntry from './ProjectEntry'
import projects from '../../data/projects'
import '../../styles/components/projects/projects-section.css'

const projectFilters = [
  { value: 'all', label: 'All Projects' },
  { value: 'genai', label: 'Generative AI' },
  { value: 'ml', label: 'Machine Learning & Data Science' },
  { value: 'automation', label: 'Automation' },
  { value: 'software', label: 'Software Engineering' },
]

function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') {
      return true
    }

    return project.categories?.includes(activeFilter)
  })

  return (
    <section className="projects-section">
      <div className="projects-section__background" />

      <div className="content-container projects-section__inner">
        <header className="projects-section__header">
          <div className="projects-section__heading">
            <p className="projects-section__eyebrow">
              Selected Work
            </p>

            <h1 className="projects-section__title">
              Projects
            </h1>

            <p className="projects-section__description">
              Exploring artificial intelligence, automation, and software engineering through practical applications.
            </p>
          </div>

          <div className="projects-section__filters">
            <Dropdown
              label="Explore by Focus"
              options={projectFilters}
              value={activeFilter}
              onChange={setActiveFilter}
            />
          </div>
        </header>

        <div className="projects-section__list">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectEntry
                key={project.id}
                project={project}
                reverse={index % 2 !== 0}
              />
            ))
          ) : (
            <p className="projects-section__empty">
              No projects found in this category.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection