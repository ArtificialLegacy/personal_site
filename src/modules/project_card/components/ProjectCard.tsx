import { useCallback, useEffect, useRef, useState } from 'react'

import '../styles/project_card.css'

import projectTechIcon from '../utility/project_tech_icon'
import type { Project } from '../types/project'

const CARD_ROTATE_FACTOR = 6

type ProjectCardProps = {
    project: Project
    disabled?: boolean
}

function ProjectCard(props: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [descActive, setDescActive] = useState(false)

    useEffect(() => {
        if (props.disabled) return
        if (cardRef.current == null) return

        const ref = cardRef.current

        const handleHover = (e: MouseEvent) => {
            if (cardRef.current == null) return

            const { clientX, clientY, currentTarget } = e
            if (currentTarget == null) return
            const { clientWidth, clientHeight } = currentTarget as HTMLDivElement
            const { x, y } = (currentTarget as HTMLElement).getBoundingClientRect()

            const horizontal = (clientX - x) / clientWidth
            const vertical = (clientY - y) / clientHeight

            const rotateX = (CARD_ROTATE_FACTOR / 2 - horizontal * CARD_ROTATE_FACTOR).toFixed(2)
            const rotateY = (vertical * CARD_ROTATE_FACTOR - CARD_ROTATE_FACTOR / 2).toFixed(2)

            cardRef.current.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`
        }

        const handleLeave = () => {
            if (cardRef.current == null) return

            cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`
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

    const handleTouch = useCallback(() => {
        setDescActive(!descActive)
    }, [descActive])

    useEffect(() => {
        setDescActive(false)
    }, [props.project])

    if (props.project == null) return <div />

    return (
        <div
            className={`project-card ${!props.disabled && 'project-card-hover'} ${
                !props.disabled && descActive && 'project-card-desc-active'
            }`}
            ref={cardRef}
            onClick={handleTouch}
        >
            <img src={props.project.thumbnail} alt={props.project.thumbnailAlt} className="project-card-thumbnail" />

            <article className="project-card-bottom">
                <header className="project-card-banner">
                    <h3 className="project-card-name">{props.project.name}</h3>
                </header>

                <section className="project-card-details">
                    <p className="project-card-description">{props.project.description}</p>
                    <ul className="project-card-features">
                        {props.project.featureList.map((feature, index) => {
                            return <li key={index}>{feature}</li>
                        })}
                    </ul>
                    <div className="project-card-badges">
                        <div className="project-card-links">
                            {!props.disabled &&
                                props.project.links.map((link, index) => {
                                    if (link.from === 'github') {
                                        return (
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener"
                                                className="project-card-github"
                                                key={index}
                                                tabIndex={-1}
                                            >
                                                <img
                                                    className="project-card-icon"
                                                    src="github-mark-white.svg"
                                                    alt="github repo"
                                                    title={link.title}
                                                />
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
                </section>
            </article>
        </div>
    )
}

export default ProjectCard
