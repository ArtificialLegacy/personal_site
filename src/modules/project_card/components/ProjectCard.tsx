import { useEffect, useRef } from 'react'

import '../styles/ProjectCard.css'

import projectTechIcon from '../utility/project_tech_icon'
import type { Project } from '../types/project'

const CARD_HOVER_THRESHOLD = 2

type ProjectCardProps = {
  project: Project
  disabled?: boolean
}

function ProjectCard(props: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (props.disabled) return
    if (cardRef.current == null) return

    const ref = cardRef.current

    const handleHover = (e: MouseEvent) => {
      if (cardRef.current == null) return

      const { clientX, clientY, currentTarget } = e
      if (currentTarget == null) return
      const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget as HTMLDivElement

      const horizontal = (clientX - offsetLeft) / clientWidth
      const vertical = (clientY - offsetTop) / clientHeight
      const rotateX = (CARD_HOVER_THRESHOLD / 2 - horizontal * CARD_HOVER_THRESHOLD).toFixed(2)
      const rotateY = (vertical * CARD_HOVER_THRESHOLD - CARD_HOVER_THRESHOLD / 2).toFixed(2)

      cardRef.current.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`
    }

    const handleLeave = (e: MouseEvent) => {
      if (cardRef.current == null) return
      if (e.currentTarget == null) return

      const target = e.currentTarget as HTMLDivElement

      cardRef.current.style.transform = `perspective(${target.clientWidth}px) rotateX(0deg) rotateY(0deg)`
    }

    const motionMatchMedia = window.matchMedia('(prefers-reduced-motion)')
    if (!motionMatchMedia.matches) {
      cardRef.current.addEventListener('mousemove', handleHover)
      cardRef.current.addEventListener('mouseleave', handleLeave)
    }

    return () => {
      if (ref == null) return

      ref.removeEventListener('mousemove', handleHover)
      ref.removeEventListener('mouseleave', handleLeave)
    }
  }, [cardRef, props.disabled])

  if (props.project == null) return <div></div>

  return (
    <div className={`project-card ${props.disabled ? '' : 'project-card-hover'}`} ref={cardRef}>
      <img src={props.project.thumbnail} alt={props.project.thumbnailAlt} className="project-card-thumbnail" />

      <div className="project-card-bottom">
        <header className="project-card-banner">
          <h3 className="project-card-name">{props.project.name}</h3>
        </header>

        <article className="project-card-details">
          <p className="project-card-description">{props.project.description}</p>
          <div className="project-card-badges">
            <div className="project-card-links">
              {!props.disabled &&
                props.project.links.map((link, index) => {
                  if (link.from === 'github') {
                    return (
                      <a href={link.url} target="_blank" rel="noopener" className="project-card-github" key={index}>
                        <img
                          className="project-card-icon"
                          src="github-mark-white.svg"
                          alt="github repo"
                          title={link.title}
                        ></img>
                      </a>
                    )
                  }
                  return null
                })}
            </div>
            <div className="project-card-tech">
              {props.project.technologies.map((tech, index) => {
                return (
                  <img
                    src={projectTechIcon(tech)}
                    alt={`Logo for ${tech}.`}
                    className="project-card-tech-icon"
                    key={index}
                    title={tech}
                  />
                )
              })}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default ProjectCard
