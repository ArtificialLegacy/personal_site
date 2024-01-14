import { useState, useCallback, MouseEventHandler, TouchEventHandler } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import { ProjectCard, type Project } from 'modules/project_card'
import projectGetNext from '../utility/project_get_next'
import projectGetPrev from '../utility/project_get_prev'

import '../styles/project_carousel.css'

/**
 * @property projects - List of projects to be displayed in the carousel
 */
type ProjectCarouselProps = {
  projects: Project[]
}

const MIN_SCROLL_MARGIN = 80
const PERCENT_SCROLL_MARGIN = 0.1
const SCROLL_OFFSET = 0.1
const SCROLL_TIME = 500

function ProjectCarousel(props: ProjectCarouselProps) {
  const [currentProject, setCurrentProject] = useState(0)
  const [animState, setAnimState] = useState<'idle' | 'left' | 'right'>('idle')
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const updateAnimState = useCallback((anim: 'left' | 'right' | 'idle', nextProject: number) => {
    setAnimState(anim)
    setTimeout(() => {
      setCurrentProject(nextProject)
      setAnimState('idle')
    }, SCROLL_TIME)
  }, [])

  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.currentTarget == null) return
      if (animState !== 'idle') return

      const target = e.currentTarget as HTMLDivElement
      const { clientWidth } = target

      const horizontalMin = Math.max(clientWidth * PERCENT_SCROLL_MARGIN, MIN_SCROLL_MARGIN)
      const horizontalMax = Math.min(clientWidth * (1 - PERCENT_SCROLL_MARGIN), clientWidth - MIN_SCROLL_MARGIN)
      const withinLeft = e.clientX > horizontalMax
      const withinRight = e.clientX < horizontalMin

      let anim: 'left' | 'right' | 'idle' = 'idle'
      let nextProject = currentProject

      if (withinLeft) {
        anim = 'left'
        nextProject = projectGetNext(currentProject, props.projects)
      } else if (withinRight) {
        anim = 'right'
        nextProject = projectGetPrev(currentProject, props.projects)
      }

      if (withinLeft || withinRight) {
        updateAnimState(anim, nextProject)
      }
    },
    [currentProject, props.projects, animState, updateAnimState],
  )

  const handleClickLeft: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (animState !== 'idle') return

    const nextProject = projectGetPrev(currentProject, props.projects)
    updateAnimState('right', nextProject)
  }, [currentProject, props.projects, animState, updateAnimState])

  const handleClickRight: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (animState !== 'idle') return

    const nextProject = projectGetNext(currentProject, props.projects)
    updateAnimState('left', nextProject)
  }, [currentProject, props.projects, animState, updateAnimState])

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget == null) return

    const target = e.currentTarget as HTMLDivElement
    const { clientWidth } = target

    setTouchStart(e.touches[0].clientX / clientWidth)
  }

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.currentTarget == null || touchStart == null) return
      if (animState !== 'idle') return

      const target = e.currentTarget as HTMLDivElement
      const { clientWidth } = target

      const horizontal = e.changedTouches[0].clientX / clientWidth

      let anim: 'left' | 'right' | 'idle' = 'idle'
      let nextProject = currentProject

      const rightScroll = horizontal > touchStart + SCROLL_OFFSET
      const leftScroll = horizontal < touchStart - SCROLL_OFFSET

      if (rightScroll) {
        anim = 'right'
        nextProject = projectGetPrev(currentProject, props.projects)
      } else if (leftScroll) {
        anim = 'left'
        nextProject = projectGetNext(currentProject, props.projects)
      }

      if (rightScroll || leftScroll) {
        updateAnimState(anim, nextProject)
      }
    },
    [currentProject, props.projects, touchStart, animState, updateAnimState],
  )

  return (
    <div className="projects">
      <header>
        <h1>My Projects</h1>
      </header>
      <div className="project-carousel">
        <button
          title="carousel left"
          type="button"
          onClick={handleClickLeft}
          className={`project-carousel-left-icon ${animState !== 'idle' && 'project-carousel-icon-disabled'}`}
        >
          <KeyboardArrowLeftIcon />
        </button>
        <button
          title="carousel right"
          type="button"
          onClick={handleClickRight}
          className={`project-carousel-right-icon ${animState !== 'idle' && 'project-carousel-icon-disabled'}`}
        >
          <KeyboardArrowRightIcon />
        </button>
        <div className="project-card-dummy" aria-hidden>
          <ProjectCard project={props.projects[0]} disabled />
        </div>
        <div className={`project-left-insert ${animState === 'right' && 'project-left-insert-right'}`}>
          <ProjectCard project={props.projects[projectGetPrev(currentProject, props.projects, 2)]} disabled />
        </div>

        <div
          className={`project-prev ${animState === 'left' && 'project-prev-left'} ${
            animState === 'right' && 'project-prev-right'
          }`}
        >
          <ProjectCard project={props.projects[projectGetPrev(currentProject, props.projects)]} disabled />
        </div>

        <div
          className={`project-current ${animState === 'left' && 'project-current-left'} ${
            animState === 'right' && 'project-current-right'
          }`}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <ProjectCard project={props.projects[currentProject]} disabled={animState !== 'idle'} />
        </div>

        <div
          className={`project-next ${animState === 'left' && 'project-next-left'} ${
            animState === 'right' && 'project-next-right'
          }`}
        >
          <ProjectCard project={props.projects[projectGetNext(currentProject, props.projects)]} disabled />
        </div>

        <div className={`project-right-insert ${animState === 'left' && 'project-right-insert-left'}`}>
          <ProjectCard project={props.projects[projectGetNext(currentProject, props.projects, 2)]} disabled />
        </div>
      </div>
    </div>
  )
}

export default ProjectCarousel
