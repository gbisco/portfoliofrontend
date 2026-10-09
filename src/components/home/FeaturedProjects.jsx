import { useState } from 'react'

import Button from '../ui/Button'
import ProjectCard from './ProjectCard'
import ProjectDetails from './ProjectDetails'
import projects from '../../data/projects'
import '../../styles/components/home/featured-projects.css'

const CAROUSEL_ANIMATION_DURATION = 800
const CAROUSEL_OFFSETS = [-2, -1, 0, 1, 2]

function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured)

  const [activeIndex, setActiveIndex] = useState(0)
  const [carouselPosition, setCarouselPosition] = useState(0)
  const [animationDirection, setAnimationDirection] = useState(null)

  const projectCount = featuredProjects.length
  const activeProject = featuredProjects[activeIndex]

  const getWrappedIndex = (index) => {
    return (index + projectCount) % projectCount
  }

  const getProjectAtOffset = (offset) => {
    const projectIndex = getWrappedIndex(activeIndex + offset)

    return {
      project: featuredProjects[projectIndex],
      projectIndex,
      offset,
      virtualPosition: carouselPosition + offset,
    }
  }

  const carouselProjects = projectCount
    ? CAROUSEL_OFFSETS.map(getProjectAtOffset)
    : []

  const moveCarousel = (direction) => {
    if (animationDirection || projectCount <= 1) {
      return
    }

    setAnimationDirection(direction)

    window.setTimeout(() => {
      const change = direction === 'next' ? 1 : -1

      setActiveIndex((currentIndex) =>
        getWrappedIndex(currentIndex + change)
      )

      setCarouselPosition((currentPosition) =>
        currentPosition + change
      )

      setAnimationDirection(null)
    }, CAROUSEL_ANIMATION_DURATION)
  }

  const showPreviousProject = () => {
    moveCarousel('previous')
  }

  const showNextProject = () => {
    moveCarousel('next')
  }

  const showProject = (index) => {
    if (
      index === activeIndex ||
      animationDirection ||
      projectCount <= 1
    ) {
      return
    }

    const forwardDistance =
      (index - activeIndex + projectCount) % projectCount

    const backwardDistance =
      (activeIndex - index + projectCount) % projectCount

    moveCarousel(
      forwardDistance <= backwardDistance
        ? 'next'
        : 'previous'
    )
  }

  const carouselClassName = [
    'featured-projects__carousel',
    animationDirection
      ? `featured-projects__carousel--moving-${animationDirection}`
      : '',
  ]
    .filter(Boolean)
    .join(' ')

  const interactionDisabled =
    projectCount <= 1 ||
    animationDirection !== null

  return (
    <section className="featured-projects" data-navbar-theme="light">
      <div className="featured-projects__background" />

      <div className="featured-projects__frost">
        <div className="content-container featured-projects__inner">
          <div className="featured-projects__header">
            <div className="featured-projects__heading">
              <p className="featured-projects__eyebrow">
                Selected Work
              </p>

              <h2 className="featured-projects__title">
                Featured Projects
              </h2>

              <p className="featured-projects__description">
                A selection of projects across AI, automation, and software engineering.
              </p>
            </div>

            <Button
              tone="secondary"
              surface="glass"
              href="/projects"
            >
              View All Projects
            </Button>
          </div>

          {activeProject && (
            <>
              <div className={carouselClassName}>
                <button
                  className="featured-projects__arrow featured-projects__arrow--left"
                  type="button"
                  aria-label="Previous project"
                  onClick={showPreviousProject}
                  disabled={interactionDisabled}
                >
                  <img
                    src="/icons/left-arrowhead-icon.svg"
                    alt=""
                  />
                </button>

                <div className="featured-projects__viewport">
                  <div className="featured-projects__track">
                    {carouselProjects.map(
                      ({
                        project,
                        offset,
                        virtualPosition,
                      }) => {
                        const isActive = offset === 0
                        const isClickableNeighbor =
                          offset === -1 || offset === 1

                        const slideClassName = [
                          'featured-projects__track-slide',
                          `featured-projects__track-slide--${
                            offset < 0
                              ? 'negative'
                              : 'positive'
                          }-${Math.abs(offset)}`,
                          isActive
                            ? 'featured-projects__track-slide--active'
                            : '',
                        ]
                          .filter(Boolean)
                          .join(' ')

                        const handleSlideClick = () => {
                          if (
                            interactionDisabled ||
                            !isClickableNeighbor
                          ) {
                            return
                          }

                          if (offset < 0) {
                            showPreviousProject()
                          } else {
                            showNextProject()
                          }
                        }

                        const handleSlideKeyDown = (event) => {
                          if (
                            !isClickableNeighbor ||
                            interactionDisabled
                          ) {
                            return
                          }

                          if (
                            event.key === 'Enter' ||
                            event.key === ' '
                          ) {
                            event.preventDefault()
                            handleSlideClick()
                          }
                        }

                        return (
                          <div
                            className={slideClassName}
                            role={
                              isClickableNeighbor
                                ? 'button'
                                : undefined
                            }
                            aria-label={
                              isClickableNeighbor
                                ? `Show ${project.title}`
                                : undefined
                            }
                            aria-hidden={
                              !isActive &&
                              !isClickableNeighbor
                                ? 'true'
                                : undefined
                            }
                            tabIndex={
                              isClickableNeighbor &&
                              !interactionDisabled
                                ? 0
                                : -1
                            }
                            onClick={handleSlideClick}
                            onKeyDown={handleSlideKeyDown}
                            key={virtualPosition}
                          >
                            <ProjectCard project={project} />
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>

                <button
                  className="featured-projects__arrow featured-projects__arrow--right"
                  type="button"
                  aria-label="Next project"
                  onClick={showNextProject}
                  disabled={interactionDisabled}
                >
                  <img
                    src="/icons/right-arrowhead-icon.svg"
                    alt=""
                  />
                </button>
              </div>

              <div className="featured-projects__stage featured-projects__project-info">
                <div
                  className="featured-projects__indicators"
                  aria-label="Project carousel position"
                >
                  {featuredProjects.map((project, index) => (
                    <button
                      key={project.id}
                      className={`featured-projects__indicator ${
                        index === activeIndex
                          ? 'featured-projects__indicator--active'
                          : ''
                      }`}
                      type="button"
                      aria-label={`Show ${project.title}`}
                      aria-current={
                        index === activeIndex
                          ? 'true'
                          : undefined
                      }
                      onClick={() => showProject(index)}
                      disabled={interactionDisabled}
                    />
                  ))}
                </div>

                <ProjectDetails project={activeProject} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects