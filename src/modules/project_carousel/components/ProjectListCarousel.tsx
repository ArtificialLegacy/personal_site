import { useState, useCallback, MouseEventHandler, TouchEventHandler } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import { ProjectCard, type Project } from 'modules/project_card'
import projectGetNext from '../utility/project_get_next'
import projectGetPrev from '../utility/project_get_prev'

import '../styles/project_list_carousel.css'

/**
 * @property projects - List of projects to be displayed in the carousel
 */
type ProjectListCarouselProps = {
  projects: Project[]
}

function ProjectListCarousel(props: ProjectListCarouselProps) {
  const [currentProject, setCurrentProject] = useState(0)
  const [animState, setAnimState] = useState<'idle' | 'left' | 'right'>('idle')
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.currentTarget == null) return

      const target = e.currentTarget as HTMLDivElement
      const { clientWidth } = target

      const horizontal = e.clientX / clientWidth
      if (horizontal > 0.9) {
        setAnimState('left')
        setTimeout(() => {
          setAnimState('idle')
          setCurrentProject(projectGetNext(currentProject, props.projects))
        }, 500)
      } else if (horizontal < 0.1) {
        setAnimState('right')
        setTimeout(() => {
          setAnimState('idle')
          setCurrentProject(projectGetPrev(currentProject, props.projects))
        }, 500)
      }
    },
    [currentProject, props.projects],
  )

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget == null) return

    const target = e.currentTarget as HTMLDivElement
    const { clientWidth } = target

    setTouchStart(e.touches[0].clientX / clientWidth)
  }

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget == null || touchStart == null) return

    const target = e.currentTarget as HTMLDivElement
    const { clientWidth } = target

    const horizontal = e.changedTouches[0].clientX / clientWidth
    if (horizontal > touchStart + 0.1) {
      setAnimState('right')
      setTouchStart(null)
      setTimeout(() => {
        setAnimState('idle')
        setCurrentProject(projectGetPrev(currentProject, props.projects))
      }, 500)
    } else if (horizontal < touchStart - 0.1) {
      setAnimState('left')
      setTouchStart(null)
      setTimeout(() => {
        setAnimState('idle')
        setCurrentProject(projectGetNext(currentProject, props.projects))
      }, 500)
    }
  }

  return (
    <div className="project-carousel">
      <KeyboardArrowLeftIcon className="project-card-left-icon" />
      <KeyboardArrowRightIcon className="project-card-right-icon" />
      <div className="project-card-dummy" aria-hidden>
        <ProjectCard project={props.projects[0]} disabled />
      </div>
      <div className={`project-left-insert ${animState === 'right' ? 'project-left-insert-right' : ''}`}>
        <ProjectCard project={props.projects[projectGetPrev(currentProject, props.projects, 2)]} disabled />
      </div>

      <div
        className={`project-prev ${animState === 'left' ? 'project-prev-left' : ''} ${
          animState === 'right' ? 'project-prev-right' : ''
        }`}
      >
        <ProjectCard project={props.projects[projectGetPrev(currentProject, props.projects)]} disabled />
      </div>

      <div
        className={`project-current ${animState === 'left' ? 'project-current-left' : ''} ${
          animState === 'right' ? 'project-current-right' : ''
        }`}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <ProjectCard project={props.projects[currentProject]} disabled={animState !== 'idle'} />
      </div>

      <div
        className={`project-next ${animState === 'left' ? 'project-next-left' : ''} ${
          animState === 'right' ? 'project-next-right' : ''
        }`}
      >
        <ProjectCard project={props.projects[projectGetNext(currentProject, props.projects)]} disabled />
      </div>

      <div className={`project-right-insert ${animState === 'left' ? 'project-right-insert-left' : ''}`}>
        <ProjectCard project={props.projects[projectGetNext(currentProject, props.projects, 2)]} disabled />
      </div>
    </div>
  )
}

export default ProjectListCarousel
